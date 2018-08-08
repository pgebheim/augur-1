/// <reference types="node" />

import { Block, Transaction } from "ethereumjs-blockstream";
import { EventEmitter } from "events";

export { Block, Transaction }

type AbiEncodedData = string;
type Address = string;
type Bytes32 = string;
type Int256 = string;

export enum SUBSCRIPTION_EVENT_NAMES {
  FEE_WINDOW_OPENED = "FeeWindowOpened",
  COMPLETE_SETS_PURCHASED = "CompleteSetsPurchased",
  COMPLETE_SETS_SOLD = "CompleteSetsSold",
  DISPUTE_CROWDSOURCER_COMPLETED = "DisputeCrowdsourcerCompleted",
  DISPUTE_CROWDSOURCER_CONTRIBUTION = "DisputeCrowdsourcerContribution",
  DISPUTE_CROWDSOURCER_CREATED = "DisputeCrowdsourcerCreated",
  DISPUTE_CROWDSOURCER_REDEEMED_LOG = "DisputeCrowdsourcerRedeemedLog",
  FEE_WINDOW_CLOSED = "FeeWindowClosed",
  FEE_WINDOW_CREATED = "FeeWindowCreated",
  FEE_WINDOW_REDEEMED = "FeeWindowRedeemed",
  INITIAL_REPORT_SUBMITTED = "InitialReportSubmitted",
  INITIAL_REPORT_REDEEMED = "InitialReporterRedeemed",
  INITIAL_REPORT_TRANSFERRED = "InitialReporterTransferred",
  MARKET_CREATED = "MarketCreated",
  MARKET_STATE = "MarketState",
  ORDER_CANCELLED = "OrderCanceled",
  ORDER_CREATED = "OrderCreated",
  ORDER_FILLED = "OrderFilled",
  REPORTING_PARTICIPANT_DISAVOWED = "ReportingParticipantDisavowed",
  SYNC_FINISHED = "SyncFinished",
  TOKENS_TRANSFERRED = "TokensTransferred",
  TRADING_PROCEEDS_CLAIMED = "TradingProceedsClaimed",
  UNIVERSE_CREATED = "UniverseCreated",
}

interface AugurJsOptions {
  debug: {
    [optionName: string]: boolean,
  };
}

// TODO replace ApiParams and ApiFunction with specific param names/types where possible (use jsdoc comments)

export interface ApiParams {
  [paramName: string]: any;
}

export type ApiCallback = (err?: Error|string|object|null, result?: any) => void;

export type ApiFunction = (p: ApiParams, callback?: ApiCallback) => any;

export interface AutogeneratedContractApi {
  [contractName: string]: {
    [functionName: string]: ApiFunction,
  };
}

export interface BlockDetail extends Block {
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  size: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  transactions: string[]|Transaction[];
  uncles: string[];
}

export interface FunctionAbi {
  constant: boolean;
  name: string;
  inputs: Array<string>;
  signature: Array<string>;
  returns?: string;
}

export interface EventAbiInput {
  indexed: boolean;
  type: string;
  name: string;
}

export interface FunctionsAbiMap {
  [contractName: string]: {
    [functionName: string]: FunctionAbi,
  };
}

export interface EventsAbiMap {
  [contractName: string]: {
    [eventName: string]: {
      contract?: string;
      inputs: Array<EventAbiInput>
    },
  };
}

export interface AbiMap {
  functions: FunctionsAbiMap;
  events: EventsAbiMap;
}

export interface ContractNameToAddressMap {
  [networkId: string]: {
    [contractName: string]: Address,
  };
}

export interface EventLog {
  address: Address;
  topics: Array<Int256>;
  data: AbiEncodedData;
  blockNumber: Int256;
  logIndex: Int256;
  transactionIndex: Int256;
  transactionHash: Bytes32;
  blockHash: Bytes32;
  removed: boolean;
}

export interface FormattedEventLog {
  address: Address;
  blockNumber: number;
  logIndex: number;
  transactionHash: Bytes32;
  transactionIndex: number;
  contractName: string;
  eventName: string;
  blockHash: Bytes32;
  removed: boolean;
  [inputName: string]: any;
}

type EventSubscriptionCallback = (eventLog: FormattedEventLog) => void;

interface EventSubscriptionCallbacks {
  [eventName: string]: EventSubscriptionCallback;
}

interface EventSubscriptionCallbacksKeyedByContract {
  [contractName: string]: EventSubscriptionCallbacks;
}

interface BlockSubscriptionCallbacks {
  onAdded?: (block: Block) => void;
  onRemoved?: (block: Block) => void;
}

export enum ORDER_STATE {
  ALL = "ALL",
  CANCELED = "CANCELED",
  CLOSED = "CLOSED",
  OPEN = "OPEN",
}

export interface Order {
  shareToken: string;
  transactionHash: string;
  logIndex: number;
  owner: string;
  creationTime: number;
  creationBlockNumber: number;
  orderState: ORDER_STATE;
  price: number;
  amount: number;
  fullPrecisionPrice: string;
  fullPrecisionAmount: number;
  tokensEscrowed: number;
  sharesEscrowed: number;
}

export interface SingleOutcomeOrderBookSide {
  [buyOrSell: string]: {
    [orderId: string]: Order;
  }
}

export interface CalculatedProfitLoss {
  realized: string;
  unrealized: string;
  position: string;
  meanOpenPrice: string;
  queued: string;
}

export interface SimulatedTrade {
  settlementFees: string;
  gasFees: string;
  sharesDepleted: string;
  otherSharesDepleted: string;
  tokensDepleted: string;
  shareBalances: Array<string>;
}

export interface RpcInterface {
  errors: any; // TODO define RPC errors object
  eth: {
    [jsonRpcMethodName: string]: (params?: any, callback?: (err: Error|null, response: any) => void) => string|number|null;
  };
  createRpcInterface(): RpcInterface;
  clear(): void;
  getBlockStream(): any; // TODO import blockstream type from ethereumjs-blockstream
  getCoinbase(): Address;
  getCurrentBlock(): any; // TODO define block type
  getGasPrice(): number;
  getNetworkID(): string;
  getLogs(filter: any, callback: (err: Error|null, logs: Array<EventLog>) => void): Array<string>|null; // TODO define log filter type
  getTransactionReceipt(transactionHash: Bytes32, callback?: (err: Error|null, transactionReceipt: any) => void): any; // TODO define transaction receipt type
  isUnlocked(account: Address, callback?: (err: Error|null, isUnlocked: boolean) => void): boolean|void;
  sendEther(to: Address, value: string|number, from: Address, onSent: (result: any) => void, onSuccess: (result: any) => void, onFailed: (err: any) => void): any;
  packageAndSubmitRawTransaction(payload: any, address: Address, privateKeyOrSigner: Buffer|null, callback: (err: Error|null, transactionHash: Bytes32|Error) => void): void; // TODO define payload type
  callContractFunction(payload: any, callback: (err: Error|null, returnValue: Bytes32|Error) => void): Bytes32|void;
  transact(payload: any, privateKeyOrSigner: Buffer|null, onSent: (result: any) => void, onSuccess: (result: any) => void, onFailed: (err: any) => void): void;
  excludeFromTransactionRelay(method: string): void;
  registerTransactionRelay(relayer: any): void; // TODO define relayer type
  setDebugOptions(debugOptions: {[debugOptionName: string]: boolean}): void;
}

export class Augur {
  public version: string;
  public options: AugurJsOptions;
  public accounts: {
    getAccountTransferHistory: ApiFunction;
    approveAugur: ApiFunction;
  };
  public api: AutogeneratedContractApi;
  public assets: {
    [functionName: string]: ApiFunction,
  };
  public constants: {
    [constantName: string]: any;
  };
  public contracts: {
    abi: AbiMap;
    addresses: ContractNameToAddressMap;
    uploadBlockNumbers: {
      [networkId: string]: number
    };
  };
  public createMarket: {
    [functionName: string]: ApiFunction,
  };
  public events: {
    getAllAugurLogs: (p: ApiParams, batchCallback: ApiCallback, finalCallback: (err: Error|null) => void) => any;
    startBlockListeners(blockCallbacks: BlockSubscriptionCallbacks): boolean;
    stopBlockListeners(): boolean;
    startBlockchainEventListeners(eventCallbacks: EventSubscriptionCallbacksKeyedByContract, startingBlockNumber: number, onSetupComplete?: (err: Error|null) => void): void;
    stopBlockchainEventListeners(): boolean;
    startAugurNodeEventListeners(eventCallbacks: EventSubscriptionCallbacks, onSetupComplete?: (err: Error|null) => void): void;
    stopAugurNodeEventListeners(callback?: (err: Error|null) => void): void;
    nodes: {
      augur: EventEmitter;
      ethereum: EventEmitter;
    }
  };
  public markets: {
    getMarketsInfo: ApiFunction;
    getMarketPriceHistory: ApiFunction;
    getMarkets: ApiFunction;
    getMarketsInCategory: ApiFunction;
    getMarketsClosingInDateRange: ApiFunction;
    getMarketsCreatedByUser: ApiFunction;
    getUnclaimedMarketCreatorFees: ApiFunction;
    getCategories: ApiFunction;
  };
  public reporting: {
    claimReportingFeesForkedMarket: ApiFunction;
    claimReportingFeesNonforkedMarkets: ApiFunction;
    finalizeMarket: ApiFunction;
    getDisputeInfo: ApiFunction;
    getDisputeTokens: ApiFunction;
    getFeeWindowCurrent: ApiFunction;
    getFeeWindows: ApiFunction;
    getInitialReporters: ApiFunction;
    getReportingFees: ApiFunction;
    getReportingHistory: ApiFunction;
    getReportingSummary: ApiFunction;
    getStakeRequiredForDesignatedReporter: ApiFunction;
    getCurrentPeriodProgress(reportingPeriodDurationInSeconds: number, timestamp?: number|null): number;
  };
  public rpc: RpcInterface;
  public trading: {
    getBetterWorseOrders: ApiFunction;
    getUserTradingHistory: ApiFunction;
    getUserTradingPositions: ApiFunction;
    getPositionInMarket: ApiFunction;
    claimMarketsTradingProceeds: ApiFunction;
    claimTradingProceeds: ApiFunction;
    placeTrade: ApiFunction;
    tradeUntilAmountIsZero: ApiFunction;
    getOrders: ApiFunction;
    calculateTradeCost: ApiFunction;
    generateTradeGroupId: ApiFunction;
    filterAndSortByPrice(p: {
      singleOutcomeOrderBookSide: SingleOutcomeOrderBookSide;
      orderType: number;
      price: any;
      userAddress: Address;
    }): Array<Order>;
    simulateTrade(p: ApiParams): SimulatedTrade;
    calculateProfitLoss(p: ApiParams): CalculatedProfitLoss;
    normalizePrice(p: ApiParams): string;
    denormalizePrice(p: ApiParams): string;
  };
  public utils: any;
  public connect(p: ApiParams, callback?: ApiCallback): void;
  public generateContractApi(functionsAbi: any): AutogeneratedContractApi;
}

export default Augur;
