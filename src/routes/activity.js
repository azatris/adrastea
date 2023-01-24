const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	// Gets an activity JSON from http://www.boredapi.com/api/activity/ using GET method
	// and returns it to the client after having transformed it a bit
	const https = require('https');
	const url = "https://www.boredapi.com/api/activity/";
	https.get(url, (resp) => {
		let data = '';
		// A chunk of data has been received.
		resp.on('data', (chunk) => {
			data += chunk;
		});
		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			const activityJson = JSON.parse(data);
			const accessibility = activityJson.accessibility;
			const price = activityJson.price;
			const priceText = price === 0 ? "Free" : price <= 0.5 ? "Low" : "High"; // Assuming price is a number between 0 and 1
			const accessibilityText = accessibility <= 0.25 ? "High" : accessibility <= 0.75 ? "Medium" : "Low"; // Assuming accessibility is a number between 0 and 1

			// Override old values with new ones
			activityJson.accessibility = accessibilityText;
			activityJson.price = priceText;
			res.send(activityJson);
		});
	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});

});

module.exports = router;
