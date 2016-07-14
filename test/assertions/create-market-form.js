import { assert } from 'chai';

import assertEndDate from '../../test/assertions/common/end-date';
import assertInitialFairPrices from '../../test/assertions/common/initial-fair-prices';
import assertFormattedNumber from '../../test/assertions/common/formatted-number';

export default function(createMarketForm) {
	describe('createMarketForm', () => {
		describe(`step ${createMarketForm.step} state`, () => {
			switch(createMarketForm.step){
				case 1:
					describe('step', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.step, `'step' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.step, `'step' is not a number`);
						});
					});

					describe('creatingMarket', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.creatingMarket, `'creatingMarket' is not defined`);
						});

						it('should be a boolean', () => {
							assert.isBoolean(createMarketForm.creatingMarket, `'creatingMarket' is not a boolean`);
						});
					});

					describe('errors', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.errors, `'errors' is not defined`);
						});

						it('should be a object', () => {
							assert.isObject(createMarketForm.errors, `'errors' is not an object`);
						});
					});

					describe('onValuesUpdated', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.onValuesUpdated, `'onValuesUpdated' is not defined`);
						});

						it('should be a function', () => {
							assert.isFunction(createMarketForm.onValuesUpdated, `onValuesUpdated' is not a function`);
						});
					});

					break;
				case 2:
					describe('type', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.type, `'type' is not defined`);
						});

						it('should be a string', () => {
							assert.isString(createMarketForm.type, `'type' is not a string`);
						});
					});

					describe('initialFairPrices', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.initialFairPrices, `'initialFairPrices' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.initialFairPrices, `'initialFairPrices' is not an object`);
						});

						it('should have the correct shape', () => {
							assertInitialFairPrices(createMarketForm.initialFairPrices, 'createMarketForm');
						});
					});

					describe('descriptionPlaceholder', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.descriptionPlaceholder, `'descriptionPlaceholder' is not defined`);
						});

						it('should be a string', () => {
							assert.isString(createMarketForm.descriptionPlaceholder, `'descriptionPlaceholder' is not a string`);
						});
					});

					describe('descriptionMaxLength', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.descriptionMaxLength, `'descriptionMaxLength' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.descriptionMaxLength, `'descriptionMaxLength' is not a number`);
						});
					});

					describe(`type: ${createMarketForm.type}`, () => {
						switch(createMarketForm.type){
							case 'categorical':
								describe('categoricalOutcomesMinNum', () => {
									it('should be defined', () => {
										assert.isDefined(createMarketForm.categoricalOutcomesMinNum, `'categoricalOutcomesMinNum' is not defined`);
									});

									it('should be a number', () => {
										assert.isNumber(createMarketForm.categoricalOutcomesMinNum, `'categoricalOutcomesMinNum' is not a number`);
									});
								});

								describe('categoricalOutcomesMaxNum', () => {
									it('should be defined', () => {
										assert.isDefined(createMarketForm.categoricalOutcomesMaxNum, `'categoricalOutcomesMaxNum' is not defined`);
									});

									it('should be a number', () => {
										assert.isNumber(createMarketForm.categoricalOutcomesMaxNum, `'categoricalOutcomesMaxNum' is not a number`);
									});
								});

								describe('categoricalOutcomeMaxLength', () => {
									it('should be defined', () => {
										assert.isDefined(createMarketForm.categoricalOutcomeMaxLength, `'categoricalOutcomeMaxLength' is not defined`);
									});

									it('should be a number', () => {
										assert.isNumber(createMarketForm.categoricalOutcomeMaxLength, `'categoricalOutcomeMaxLength' is not a number`);
									});
								});
								break;
							case 'scalar':
								describe('scalarSmallNum', () => {
									it('should be defined', () => {
										assert.isDefined(createMarketForm.scalarSmallNum, `'scalarSmallNum' is not defined`);
									});

									it('should be a number', () => {
										assert.isNumber(createMarketForm.scalarSmallNum, `'scalarSmallNum' is not a number`);
									});
								});

								describe('scalarBigNum', () => {
									it('should be defined', () => {
										assert.isDefined(createMarketForm.scalarBigNum, `'scalarBigNum' is not defined`);
									});

									it('should be a number', () => {
										assert.isNumber(createMarketForm.scalarBigNum, `'scalarBigNum' is not a number`);
									});
								});
								break;
						}
					});

					break;
				case 3:
					describe('description', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.description, `'description' is not defined`);
						});

						it('should be a string', () => {
							assert.isString(createMarketForm.description, `'description' is not a string`);
						});
					});

					describe('tagsMaxNum', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.tagsMaxNum, `'tagsMaxNum' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.tagsMaxNum, `'tagsMaxNum' is not a number`);
						});
					});

					describe('tagMaxLength', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.tagMaxLength, `'tagsMaxLength' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.tagMaxLength, `'tagsMaxLength' is not a number`);
						});
					});

					break;
				case 4:
					describe('takerFee', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.takerFee, `'takerFee' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.takerFee, `'takerFee' is not a number`);
						});
					});

					describe('makerFee', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.makerFee, `'makerFee' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.makerFee, `'makerFee' is not a number`);
						});
					});

					describe('initialLiquidity', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.initialLiquidity, `'initialLiquidity' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.initialLiquidity, `'initialLiquidity' is not a number`);
						});
					});

					describe('initialFairPrices', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.initialFairPrices, `'initialFairPrices' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.initialFairPrices, `'initialFairPrices' is not an object`);
						});

						it('should have the correct shape', () => {
							assertInitialFairPrices(createMarketForm.initialFairPrices, 'createMarketForm');
						});
					});

					describe('bestStartingQuantity', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.bestStartingQuantity, `'bestStartingQuantity' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.bestStartingQuantity, `'bestStartingQuantity' is not a number`);
						});
					});

					describe('startingQuantity', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.startingQuantity, `'startingQuantity' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.startingQuantity, `'startingQuantity' is not a number`);
						});
					});

					describe('priceWidth', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.priceWidth, `'priceWidth' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.priceWidth, `'priceWidth' is not a number`);
						});
					});

					describe('priceDepth', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.priceDepth, `'priceDepth' is not defined`);
						});

						it('should be a number', () => {
							assert.isNumber(createMarketForm.priceDepth, `'priceDepth' is not a number`);
						});
					});

					break;
				default:
				case 5:
					describe('description', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.description, `'description' is not defined`);
						});

						it('should be a string', () => {
							assert.isString(createMarketForm.description, `'description' is not a string`);
						});
					});

					describe('outcomes', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.outcomes, `'outcomes' is not defined`);
						});

						it('should be an array', () => {
							assert.isArray(createMarketForm.outcomes, `'outcomes' is not an array`);
						});
					});

					describe('endDate', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.endDate, `'endDate' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.endDate, `'endDate' is not an object`);
						});

						it('should have the correct shape', () => {
							assertEndDate(createMarketForm.endDate, 'createMarketForm');
						});
					});

					describe('takerFeePercent', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.takerFeePercent, `'takerFeePercent' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.takerFeePercent, `'takerFeePercent' is not an object`);
						});

						it('should have the correct shape', () => {
							assertFormattedNumber(createMarketForm.takerFeePercent, 'createMarketForm.takerFeePercent');
						});
					});

					describe('makerFeePercent', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.makerFeePercent, `'makerFeePercent' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.makerFeePercent, `'makerFeePercent' is not an object`);
						});

						it('should have the correct shape', () => {
							assertFormattedNumber(createMarketForm.makerFeePercent, 'createMarketForm.makerFeePercent');
						});
					});

					describe('creatingMarket', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.creatingMarket, `'creatingMarket' is not defined`);
						});

						it('should be a boolean', () => {
							assert.isBoolean(createMarketForm.creatingMarket, `'creatingMarket' is not a boolean`);
						});
					});

					describe('volume', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.volume, `'volume' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.volume, `'volume' is not an object`);
						});

						it('should have the correct shape', () => {
							assertFormattedNumber(createMarketForm.volume, 'createMarketForm.volume');
						});
					});

					describe('initialFairPrices', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.initialFairPrices, `'initialFairPrices' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.initialFairPrices, `'initialFairPrices' is not an object`);
						});

						it('should have the correct shape', () => {
							assertInitialFairPrices(createMarketForm.initialFairPrices, 'createMarketForm.initialFairPrices');
						});
					});

					describe('bestStartingQuantityFormatted', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.bestStartingQuantityFormatted, `'bestStartingQuantityFormatted' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.bestStartingQuantityFormatted, `'bestStartingQuantityFormatted' is not an object`);
						});

						it('should have the correct shape', () => {
							assertFormattedNumber(createMarketForm.bestStartingQuantityFormatted, 'createMarketForm.bestStartingQuantityFormatted');
						});
					});

					describe('startingQuantityFormatted', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.startingQuantityFormatted, `'startingQuantityFormatted' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.startingQuantityFormatted, `'startingQuantityFormatted' is not an object`);
						});

						it('should have the correct shape', () => {
							assertFormattedNumber(createMarketForm.startingQuantityFormatted, 'createMarketForm.startingQuantityFormatted');
						});
					});

					describe('priceWidthFormatted', () => {
						it('should be defined', () => {
							assert.isDefined(createMarketForm.priceWidthFormatted, `'priceWidthFormatted' is not defined`);
						});

						it('should be an object', () => {
							assert.isObject(createMarketForm.priceWidthFormatted, `'priceWidthFormatted' is not an object`);
						});

						it('should have the correct shape', () => {
							assertFormattedNumber(createMarketForm.priceWidthFormatted, 'createMarketForm.priceWidthFormatted');
						});
					});
			}
		});
	});
}

describe('takerFeePercent', () => {
	it('should be defined', () => {

	});

	it('should be an object', () => {

	});

	it('should have the correct shape', () => {

	});
});

function step1(actual){
	describe('augur-ui-react-components createMarketForm step-1 initial state', () => {
		it('should receive step and be a number', () => {
			assert.isDefined(actual.step, 'step is not defined');
			assert.isNumber(actual.step, 'step is not a number');
		});

		it('should receive creatingMarket and be a boolean', () => {
			assert.isDefined(actual.creatingMarket, 'creatingMarket is not defined');
			assert.isBoolean(actual.creatingMarket, 'creatingMarket is not a boolean');
		});

		it('should receive errors and be an object', () => {
			assert.isDefined(actual.errors, 'errors is not defined');
			assert.isObject(actual.errors, 'errors is not an object');
		});

		it('should receive onValuesUpdated and be a function', () => {
			assert.isDefined(actual.onValuesUpdated, 'onValuesUpdated is not defined');
			assert.isFunction(actual.onValuesUpdated, 'onValuesUpdated is not a function');
		});
	});
}

function step2(actual){
	describe(`augur-ui-react-components createMarketForm step-2 ${actual.type} market initial state`, () => {
		it('should receive type and be a string', () => {
			assert.isDefined(actual.type, 'type is not defined');
			assert.isString(actual.type, 'type is not a string');
		});

		it('should receive initialFairPrices and be an object with correct shape', () => {
			assert.isDefined(actual.initialFairPrices, 'initialFairPrices is not defined');
			assert.isObject(actual.initialFairPrices, 'initialFairPrices is not an object');
			assertInitialFairPrices(actual.initialFairPrices, 'createMarketForm');
		});

		it('should receive descriptionPlaceholder and be a string', () => {
			assert.isDefined(actual.descriptionPlaceholder, 'descriptionPlaceholder is not defined');
			assert.isString(actual.descriptionPlaceholder, 'descriptionPlaceholder is not a string');
		});

		it('should receive descriptionMaxLength and be a number', () => {
			assert.isDefined(actual.descriptionMaxLength, 'descriptionMaxLength is not defined');
			assert.isNumber(actual.descriptionMaxLength, 'descriptionMaxLength is not a number');
		});

		switch(actual.type){
		case 'categorical':
			it('should receive categoricalOutcomesMinNum and be a number', () => {
				assert.isDefined(actual.categoricalOutcomesMinNum, 'categoricalOutcomesMinNum is not defined');
				assert.isNumber(actual.categoricalOutcomesMinNum, 'categoricalOutcomesMinNum is not a number');
			});

			it('should receive categoricalOutcomesMaxNum and be a number', () => {
				assert.isDefined(actual.categoricalOutcomesMaxNum, 'categoricalOutcomesMaxNum is not defined');
				assert.isNumber(actual.categoricalOutcomesMaxNum, 'categoricalOutcomesMaxNum is not a number');
			});

			it('should receive categoricalOutcomeMaxLength and be a number', () => {
				assert.isDefined(actual.categoricalOutcomeMaxLength, 'categoricalOutcomeMaxLength is not defined');
				assert.isNumber(actual.categoricalOutcomeMaxLength, 'categoricalOutcomeMaxLength is not a number');
			});
			break;
		case 'scalar':
			it('should receive scalarSmallNum and be a number', () => {
				assert.isDefined(actual.scalarSmallNum, 'scalarSmallNum is not defined');
				assert.isNumber(actual.scalarSmallNum, 'scalarSmallNum is not a number');
			});

			it('should receive scalarBigNum and be a number', () => {
				assert.isDefined(actual.scalarBigNum, 'scalarBigNum is not defined');
				assert.isNumber(actual.scalarBigNum, 'scalarBigNum is not a number');
			});
			break;
		}
	});
}

function step3(actual){
	describe('augur-ui-react-components createMarketForm step-3 initial state', () => {
		it('should receive description and be a string', () => {
			assert.isDefined(actual.description, 'description is not defined');
			assert.isString(actual.description, 'description is not a string');
		});

		it('should receive tagMaxNum and be a number', () => {
			assert.isDefined(actual.tagsMaxNum, 'tagsMaxNum is not defined');
			assert.isNumber(actual.tagsMaxNum, 'tagsMaxNum is not a number');
		});

		it('should receive tagsMaxLength and be a number', () => {
			assert.isDefined(actual.tagMaxLength, 'tagsMaxLength is not defined');
			assert.isNumber(actual.tagMaxLength, 'tagsMaxLength is not a number');
		});
	});
}

function step4(actual){
	describe('augur-ui-react-components createMarketForm step-4 initial state', () => {
		it('should receive takerFee and be a number', () => {
			assert.isDefined(actual.takerFee, 'makerFee is not defined');
			assert.isNumber(actual.takerFee, 'makerFee is not a number');
		});

		it('should receive makerFee and be a number', () => {
			assert.isDefined(actual.makerFee, 'makerFee is not defined');
			assert.isNumber(actual.makerFee, 'makerFee is not a number');
		});

		it('should receive initialLiquidity and be a number', () => {
			assert.isDefined(actual.initialLiquidity, 'initialLiquidity is not defined');
			assert.isNumber(actual.initialLiquidity, 'initialLiquidity is not a number');
		});

		it('should receive initialFairPrices and be an object with correct shape', () => {
			assert.isDefined(actual.initialFairPrices, 'initialFairPrices is not defined');
			assert.isObject(actual.initialFairPrices, 'initialFairPrices is not an object');
			assertInitialFairPrices(actual.initialFairPrices, 'createMarketForm');
		});

		it('should receive bestStartingQuantity and be a number', () => {
			assert.isDefined(actual.bestStartingQuantity, 'bestStartingQuantity is not defined');
			assert.isNumber(actual.bestStartingQuantity, 'bestStartingQuantity is not a number');
		});

		it('should receive startingQuantity and be a number', () => {
			assert.isDefined(actual.startingQuantity, 'startingQuantity is not defined');
			assert.isNumber(actual.startingQuantity, 'startingQuantity is not a number');
		});

		it('should receive priceWidth and be a number', () => {
			assert.isDefined(actual.priceWidth, 'priceWidth is not defined');
			assert.isNumber(actual.priceWidth, 'priceWidth is not a number');
		});

		it('should receive priceDepth and be a number', () => {
			assert.isDefined(actual.priceDepth, 'priceDepth is not defined');
			assert.isNumber(actual.priceDepth, 'priceDepth is not a number');
		});
	});
}

function step5(actual){
	describe('augur-ui-react-components createMarketForm step-5 initial state', () => {
		it('should receive description and be a string', () => {
			assert.isDefined(actual.description, 'description is not defined');
			assert.isString(actual.description, 'description is not a string');
		});

		it('should receive outcomes and be an array', () => {
			assert.isDefined(actual.outcomes, 'outcomes is not defined');
			assert.isArray(actual.outcomes, 'outcomes is not an array');
		});

		it('should receive endDate and be an object with correct shape', () => {
			assert.isDefined(actual.endDate, 'endDate is not defined');
			assert.isObject(actual.endDate, 'endDate is not an array');
			assertEndDate(actual.endDate, 'createMarketForm');
		});

		it('should receive takerFeePercent and be an object with correct shape', () => {
			assert.isDefined(actual.takerFeePercent, 'takerFeePercent is not defined');
			assert.isObject(actual.takerFeePercent, 'takerFeePercent is not an object');
			assertFormattedNumber(actual.takerFeePercent, 'createMarketForm.takerFeePercent');
		});

		it('should receive makerFeePercent and be an object with correct shape', () => {
			assert.isDefined(actual.makerFeePercent, 'makerFeePercent is not defined');
			assert.isObject(actual.makerFeePercent, 'makerFeePercent is not an object');
			assertFormattedNumber(actual.makerFeePercent, 'createMarketForm.makerFeePercent');
		});

		it('should receive creatingMarket and be a boolean', () => {
			assert.isDefined(actual.creatingMarket, 'creatingMarket is not defined');
			assert.isBoolean(actual.creatingMarket, 'creatingMarket is not a boolean');
		});

		it('should receive volume and be an object with correct shape', () => {
			assert.isDefined(actual.volume, 'volume is not defined');
			assert.isObject(actual.volume, 'volume is not an object');
			assertFormattedNumber(actual.volume, 'createMarketForm.volume');
		});

		it('should receive initialFairPrices and be an object with correct shape', () => {
			assert.isDefined(actual.initialFairPrices, 'initialFairPrices is not defined');
			assert.isObject(actual.initialFairPrices, 'initialFairPrices is not an object');
			assertInitialFairPrices(actual.initialFairPrices, 'createMarketForm');
		});

		it('should receive bestStartingQuantityFormatted and be an object with correct shape', () => {
			assert.isDefined(actual.bestStartingQuantityFormatted, 'bestStartingQuantityFormatted is not defined');
			assert.isObject(actual.bestStartingQuantityFormatted, 'bestStartingQuantityFormatted is not an object');
			assertFormattedNumber(actual.bestStartingQuantityFormatted, 'createMarketForm.bestStartingQuantityFormatted');
		});

		it('should receive startingQuantityFormatted and be an object with correct shape', () => {
			assert.isDefined(actual.startingQuantityFormatted, 'startingQuantityFormatted is not defined');
			assert.isObject(actual.startingQuantityFormatted, 'startingQuantityFormatted is not an object');
			assertFormattedNumber(actual.startingQuantityFormatted, 'createMarketForm.startingQuantityFormatted');
		});

		it('should receive priceWidthFormatted and be an object with correct shape', () => {
			assert.isDefined(actual.priceWidthFormatted, 'priceWidthFormatted is not defined');
			assert.isObject(actual.priceWidthFormatted, 'priceWidthFormatted is not an object');
			assertFormattedNumber(actual.priceWidthFormatted, 'createMarketForm.priceWidthFormatted');
		});
	});
}
