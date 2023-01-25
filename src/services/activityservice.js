import { PrismaClient } from '@prisma/client'
import boredApiService from "./boredapiservice";
const prisma = new PrismaClient()

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
	activityJson.accessibility = accessibility <= 0.25 ? "High" : accessibility <= 0.75 ? "Medium" : "Low"; // Assuming accessibility is a number between 0 and 1
	activityJson.price = price === 0 ? "Free" : price <= 0.5 ? "Low" : "High"; // Assuming price is a number between 0 and 1

	return activityJson;
}

module.exports = {
	getTransformedActivity
}
