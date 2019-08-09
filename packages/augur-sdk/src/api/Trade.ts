import { BigNumber } from "bignumber.js";
import { convertDisplayAmountToOnChainAmount, convertDisplayPriceToOnChainPrice, convertOnChainAmountToDisplayAmount, QUINTILLION, numTicksToTickSizeWithDisplayPrices } from '../utils';
import * as _ from "lodash";
import * as constants from '../constants';
import { Augur } from './../Augur';
import { Event } from '@augurproject/core/build/libraries/ContractInterfaces';
import { OrderEventLog, OrderEventUint256Value } from '../state/logs/types';

// @TODO: TEMP for better worse order ids
export function stringTo32ByteHex(stringToEncode: string): string {
  return `0x${Buffer.from(stringToEncode, 'utf8').toString('hex').padEnd(64, '0')}`;
}

export interface PlaceTradeParams {
  direction: 0 | 1;
  market: string;
  numTicks: BigNumber;
  numOutcomes: 3 | 4 | 5 | 6 | 7 | 8;
  outcome: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  tradeGroupId: string;
  ignoreShares: boolean;
  affiliateAddress: string;
  kycToken: string;
  doNotCreateOrders: boolean;
}

export interface PlaceTradeDisplayParams extends PlaceTradeParams {
  displayMinPrice: BigNumber;
  displayMaxPrice: BigNumber;
  displayAmount: BigNumber;
  displayPrice: BigNumber;
  displayShares: BigNumber;
}

export interface PlaceTradeChainParams extends PlaceTradeParams {
  amount: BigNumber;
  price: BigNumber;
  shares: BigNumber;
}

export interface TradeTransactionLimits {
  loopLimit: BigNumber;
  gasLimit: BigNumber;
}

export interface Order {
  amount: BigNumber;
  displayPrice: BigNumber;
  displaySharesEscrowed: BigNumber;
  owner: string;
}

export interface SingleOutcomeOrderBook {
  buyOrders: Order[];
  sellorders: Order[];
}

export interface ContractSimulateTradeData {
  _sharesFilled: BigNumber;
  _settlementFees: BigNumber;
  _sharesDepleted: BigNumber;
  _tokensDepleted: BigNumber;
  _numFills: BigNumber;
}

export interface SimulateTradeData {
  sharesFilled: BigNumber;
  settlementFees: BigNumber;
  sharesDepleted: BigNumber;
  tokensDepleted: BigNumber;
  numFills: BigNumber;
}

export class Trade {
  private readonly augur: Augur;

  constructor(augur: Augur) {
    this.augur = augur;
  }

  async placeTrade(params: PlaceTradeDisplayParams): Promise<void> {
    const onChainTradeParams = this.getOnChainTradeParams(params);
    return this.placeOnChainTrade(onChainTradeParams);
  }


  async simulateTradeGasLimit(params: PlaceTradeDisplayParams): Promise<BigNumber> {
    const onChainTradeParams = this.getOnChainTradeParams(params);
    const { gasLimit } = await this.getTradeTransactionLimits(onChainTradeParams);
    return gasLimit;
  }

  getOnChainTradeParams(params: PlaceTradeDisplayParams): PlaceTradeChainParams {
    const tickSize = numTicksToTickSizeWithDisplayPrices(params.numTicks, params.displayMinPrice, params.displayMaxPrice);
    const onChainAmount = convertDisplayAmountToOnChainAmount(params.displayAmount, tickSize);
    const onChainPrice = convertDisplayPriceToOnChainPrice(params.displayPrice, params.displayMinPrice, tickSize);
    const onChainShares = convertDisplayAmountToOnChainAmount(params.displayShares, tickSize);
    return Object.assign(params, {
      amount: onChainAmount,
      price: onChainPrice,
      shares: onChainShares,
    });
  }

  async placeOnChainTrade(params: PlaceTradeChainParams): Promise<void> {
    const invalidReason = await this.checkIfTradeValid(params);
    if (invalidReason) throw new Error(invalidReason);

    const { loopLimit, gasLimit } = this.getTradeTransactionLimits(params);

    let result: Event[] = [];

    // @TODO: Use the calculated gasLimit above instead of relying on an estimate once we can send an override gasLimit
    if (params.doNotCreateOrders) {
      result = await this.augur.contracts.trade.publicFillBestOrder(new BigNumber(params.direction), params.market, new BigNumber(params.outcome), params.amount, params.price, params.tradeGroupId, loopLimit, params.ignoreShares, params.affiliateAddress, params.kycToken);
    } else {
      // @TODO: Use the state provided better worse orders
      const nullOrderId = stringTo32ByteHex("");
      result = await this.augur.contracts.trade.publicTrade(new BigNumber(params.direction), params.market, new BigNumber(params.outcome), params.amount, params.price, nullOrderId, nullOrderId, params.tradeGroupId, loopLimit, params.ignoreShares, params.affiliateAddress, params.kycToken);
    }

    const amountRemaining = this.getTradeAmountRemaining(result);
    if (amountRemaining.gt(0)) {
      params.amount = amountRemaining;
      return this.placeOnChainTrade(params);
    }
  }

  async simulateTrade(params: PlaceTradeDisplayParams): Promise<SimulateTradeData> {
    const onChainTradeParams = this.getOnChainTradeParams(params);
    const tickSize = numTicksToTickSizeWithDisplayPrices(params.numTicks, params.displayMinPrice, params.displayMaxPrice);
    const simulationData: BigNumber[] = await this.augur.contracts.simulateTrade.simulateTrade_(new BigNumber(params.direction), params.market, new BigNumber(params.outcome), onChainTradeParams.amount, onChainTradeParams.price, params.ignoreShares, params.kycToken, params.doNotCreateOrders) as unknown as BigNumber[];
    const displaySharesFilled = convertOnChainAmountToDisplayAmount(simulationData[0], tickSize);
    const displaySharesDepleted = convertOnChainAmountToDisplayAmount(simulationData[2], tickSize);
    const displayTokensDepleted = simulationData[1].dividedBy(QUINTILLION);
    const displaySettlementFees = simulationData[3].dividedBy(QUINTILLION);
    const numFills = simulationData[4];
    return {
      sharesFilled: displaySharesFilled,
      tokensDepleted: displayTokensDepleted,
      sharesDepleted: displaySharesDepleted,
      settlementFees: displaySettlementFees,
      numFills
    };
  }

  async checkIfTradeValid(params: PlaceTradeChainParams): Promise<string | null> {
    if (params.outcome >= params.numOutcomes) return `Invalid outcome given for trade: ${params.outcome.toString()}. Must be between 0 and ${params.numOutcomes.toString()}`;
    if (params.price.lte(0) || params.price.gte(params.numTicks)) return `Invalid price given for trade: ${params.price.toString()}. Must be between 0 and ${params.numTicks.toString()}`;

    const amountNotCoveredByShares = params.amount.minus(params.shares);
    const cost = params.direction == 0 ? params.price.multipliedBy(amountNotCoveredByShares) : params.numTicks.minus(params.price).multipliedBy(amountNotCoveredByShares);

    if (cost.gt(0)) {
      const account = await this.augur.getAccount();
      if (!account) return null;
      const cashAllowance = await this.augur.contracts.cash.allowance_(account, this.augur.contracts.augur.address);
      if (cashAllowance.lt(cost)) return `Cash allowance: ${cashAllowance.toString()} will not cover trade cost: ${cost.toString()}`;

      const cashBalance = await this.augur.contracts.cash.balanceOf_(account);
      if (cashBalance.lt(cost)) return `Cash balance: ${cashBalance.toString()} will not cover trade cost: ${cost.toString()}`;
    }

    return null;
  }

  getTradeTransactionLimits(params: PlaceTradeChainParams): TradeTransactionLimits {
    let loopLimit = new BigNumber(1);
    const placeOrderGas = params.shares.gt(0) ? constants.PLACE_ORDER_WITH_SHARES[params.numOutcomes] : constants.PLACE_ORDER_NO_SHARES[params.numOutcomes];
    const orderCreationCost = params.doNotCreateOrders ? new BigNumber(0) : placeOrderGas;
    let gasLimit = orderCreationCost.plus(constants.WORST_CASE_FILL[params.numOutcomes]);
    while (gasLimit.plus(constants.WORST_CASE_FILL[params.numOutcomes]).lt(constants.MAX_GAS_LIMIT_FOR_TRADE) && loopLimit.lt(constants.MAX_FILLS_PER_TX)) {
      loopLimit = loopLimit.plus(1);
      gasLimit = gasLimit.plus(constants.WORST_CASE_FILL[params.numOutcomes]);
    }
    gasLimit = gasLimit.plus(constants.TRADE_GAS_BUFFER);
    return {
      loopLimit,
      gasLimit,
    };
  }

  private getTradeAmountRemaining(events: Event[]): BigNumber {
    let tradeOnChainAmountRemaining = new BigNumber(0);
    for (const event of events) {
      if (event.name === "OrderEvent") {
        const eventParams = event.parameters as OrderEventLog;
        if (eventParams.eventType === 0) { // Create
          return new BigNumber(0);
        } else if (eventParams.eventType === 3) {// Fill
          const onChainAmountFilled = eventParams.uint256Data[OrderEventUint256Value.amountFilled];
          tradeOnChainAmountRemaining = tradeOnChainAmountRemaining.minus(onChainAmountFilled);
        }
      }
    }
    return tradeOnChainAmountRemaining;
  }
}
