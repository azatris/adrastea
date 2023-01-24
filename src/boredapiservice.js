const axios = require('axios');
const BASE_URL = 'http://www.boredapi.com/api';

module.exports = {
	getActivity: () => axios({
		method: 'GET',
		url: `${BASE_URL}/activity`
	})
}
