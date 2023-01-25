const express = require('express');
const router = express.Router();
const boredApiService = require('../boredapiservice');
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.get('/', function(req, res, next) {
	const getTransformedActivity = async () => {
		// If a user is created, let's use the last one created to get their accessibility and price to query the API
		// const { data: lastUser } = await prisma.user.findMany(({ orderBy: { id: 'desc' }, take: 1 }));
		const lastUser = await prisma.user.findFirst({ orderBy: { id: 'desc' } });
		await prisma.$disconnect();

		let activityJson;
		if (lastUser) {
			const { accessibility: accessibilityLevel, price: priceLevel } = lastUser;
			const activity = await boredApiService.getActivity(accessibilityLevel, priceLevel);
			activityJson = activity.data;
		} else {
			const activity = await boredApiService.getActivity();
			activityJson = activity.data;
		}
		if (activityJson.error) {
			console.log("Error received: ", activityJson.error);
			return activityJson;
		}
		const { accessibility, price } = activityJson;

		// Override old values with new ones
		const priceType = price === 0 ? "Free" : price <= 0.5 ? "Low" : "High"; // Assuming price is a number between 0 and 1
		const accessibilityType = accessibility <= 0.25 ? "High" : accessibility <= 0.75 ? "Medium" : "Low"; // Assuming accessibility is a number between 0 and 1
		activityJson.accessibility = accessibilityType;
		activityJson.price = priceType;

		return activityJson;
	}
	getTransformedActivity().then(activity => { res.send(activity); });
});

module.exports = router;
