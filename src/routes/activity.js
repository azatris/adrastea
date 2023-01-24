const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', function(req, res, next) {
	axios.get('http://www.boredapi.com/api/activity')
		.then(response => {
			const activityJson = response.data;
			const accessibility = activityJson.accessibility;
			const price = activityJson.price;
			const priceText = price === 0 ? "Free" : price <= 0.5 ? "Low" : "High"; // Assuming price is a number between 0 and 1
			const accessibilityText = accessibility <= 0.25 ? "High" : accessibility <= 0.75 ? "Medium" : "Low"; // Assuming accessibility is a number between 0 and 1

			// Override old values with new ones
			activityJson.accessibility = accessibilityText;
			activityJson.price = priceText;
			res.send(activityJson);
		})
		.catch(error => {
			console.log(error);
		});
});

module.exports = router;
