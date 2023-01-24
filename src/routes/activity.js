const express = require('express');
const router = express.Router();
const boredApiService = require('../boredapiservice');

router.get('/', function(req, res, next) {
	const getTransformedActivity = async () => {
		const response = await boredApiService.getActivity();
		const activityJson = response.data;
		const accessibility = activityJson.accessibility;
		const price = activityJson.price;

		// Override old values with new ones
		const priceText = price === 0 ? "Free" : price <= 0.5 ? "Low" : "High"; // Assuming price is a number between 0 and 1
		const accessibilityText = accessibility <= 0.25 ? "High" : accessibility <= 0.75 ? "Medium" : "Low"; // Assuming accessibility is a number between 0 and 1
		activityJson.accessibility = accessibilityText;
		activityJson.price = priceText;

		return activityJson;
	}
	getTransformedActivity().then(activity => { res.send(activity); });
});

module.exports = router;
