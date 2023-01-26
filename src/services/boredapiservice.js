import axios from 'axios';
const BASE_URL = 'http://www.boredapi.com/api';

module.exports = {
	getActivity: (accessibilityLevel, priceLevel) => {
		if (!accessibilityLevel && !priceLevel) {
			return axios({
				method: 'GET',
				url: `${BASE_URL}/activity`
			});
		}

		let epsilon = 0.00000000000000001; // The API has inclusive ranges, so we need to add a small number to the min params
		let countParams = 0;
		let url = `${BASE_URL}/activity?`;
		if (accessibilityLevel) {
			let minaccessibility = 0;
			let maxaccessibility = 1;
			if (accessibilityLevel === 'High') {
				minaccessibility = 0;
				maxaccessibility = 0.25;
			} else if (accessibilityLevel === 'Medium') {
				minaccessibility = 0.25 + epsilon;
				maxaccessibility = 0.75;
			} else if (accessibilityLevel === 'Low') {
				minaccessibility = 0.75 + epsilon;
				maxaccessibility = 1;
			}
			url += `minaccessibility=${minaccessibility}&maxaccessibility=${maxaccessibility}`;
			countParams++;
		}
		if (priceLevel) {
			if (countParams > 0) {
				url += `&`;
			}
			let minprice = 0;
			let maxprice = 1;
			if (priceLevel === 'Free') {
				minprice = 0;
				maxprice = 0;
			} else if (priceLevel === 'Low') {
				minprice = epsilon;
				maxprice = 0.5;
			} else if (priceLevel === 'High') {
				minprice = 0.5 + epsilon;
				maxprice = 1;
			}
			url += `minprice=${minprice}&maxprice=${maxprice}`;
		}
		return axios({
			method: 'GET',
			url: url
		});
	}
}
