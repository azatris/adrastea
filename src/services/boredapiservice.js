import axios from 'axios';
import constants from "../constants";
const BASE_URL = 'http://www.boredapi.com/api';
const ACTIVITY_URL = `${BASE_URL}/activity`;
const KEY_MIN_ACCESSIBILITY = 'minaccessibility';
const KEY_MAX_ACCESSIBILITY = 'maxaccessibility';
const KEY_MIN_PRICE = 'minprice';
const KEY_MAX_PRICE = 'maxprice';
const EPSILON = 0.00000000000000001; // The API has inclusive ranges, so we need to add a small number to the min params

module.exports = {
	getActivity: (accessibilityLevel, priceLevel) => {
		if (!accessibilityLevel && !priceLevel) {
			return axios({
				method: 'GET',
				url: ACTIVITY_URL
			});
		}

		let countParams = 0;
		let url = ACTIVITY_URL + `?`;

		function addAccessibilityConstraintsToUrl() {
			let minaccessibility = 0;
			let maxaccessibility = 1;
			const {High, Medium, Low} = constants.ACCESSIBILITY;
			if (accessibilityLevel === High.name) {
				minaccessibility = High.min;
				maxaccessibility = High.max;
			} else if (accessibilityLevel === Medium.name) {
				minaccessibility = Medium.min + EPSILON;
				maxaccessibility = Medium.max;
			} else if (accessibilityLevel === Low.name) {
				minaccessibility = Low.min + EPSILON;
				maxaccessibility = Low.max;
			}
			url += `${KEY_MIN_ACCESSIBILITY}=${minaccessibility}&${KEY_MAX_ACCESSIBILITY}=${maxaccessibility}`;
		}

		if (accessibilityLevel) {
			addAccessibilityConstraintsToUrl();
			countParams++;
		}

		function addPriceLevelConstraintsToUrl() {
			if (countParams > 0) {
				url += `&`;
			}
			let minprice = 0;
			let maxprice = 1;
			const {Free, Low, High} = constants.PRICE;
			if (priceLevel === Free.name) {
				minprice = Free.min;
				maxprice = Free.max;
			} else if (priceLevel === Low.name) {
				minprice = Low.min + EPSILON;
				maxprice = Low.max;
			} else if (priceLevel === High.name) {
				minprice = High.min + EPSILON;
				maxprice = High.max;
			}
			url += `${KEY_MIN_PRICE}=${minprice}&${KEY_MAX_PRICE}=${maxprice}`;
		}

		if (priceLevel) {
			addPriceLevelConstraintsToUrl();
		}
		return axios({
			method: 'GET',
			url: url
		});
	}
}
