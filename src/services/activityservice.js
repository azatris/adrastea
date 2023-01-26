import { PrismaClient } from "@prisma/client";
import boredApiService from "./boredapiservice";
import constants from "../constants";

const prisma = new PrismaClient();

const getTransformedActivity = async () => {
  // If a user is created, let's use the last one created to get their accessibility and price to query the API
  // const { data: lastUser } = await prisma.user.findMany(({ orderBy: { id: 'desc' }, take: 1 }));
  const lastUser = await prisma.user.findFirst({ orderBy: { id: "desc" } });
  await prisma.$disconnect();

  let activityJson;
  if (lastUser) {
    const { accessibility: accessibilityLevel, price: priceLevel } = lastUser;
    const activity = await boredApiService.getActivity(
      accessibilityLevel,
      priceLevel
    );
    activityJson = activity.data;
  } else {
    const activity = await boredApiService.getActivity();
    activityJson = activity.data;
  }
  if (activityJson.error) {
    console.log("Error received: ", activityJson.error);
    return activityJson;
  }

  // Transform accessibility and price to human-readable values
  const { ACCESSIBILITY, PRICE } = constants;
  if (activityJson.accessibility <= ACCESSIBILITY.High.max) {
    activityJson.accessibility = ACCESSIBILITY.High.name;
  } else if (activityJson <= ACCESSIBILITY.Medium.max) {
    activityJson.accessibility = ACCESSIBILITY.Medium.name;
  } else {
    activityJson.accessibility = ACCESSIBILITY.Low.name;
  }
  if (activityJson.price === PRICE.Free.max) {
    activityJson.price = PRICE.Free.name;
  } else {
    activityJson.price =
      activityJson.price <= PRICE.Low.max ? PRICE.Low.name : PRICE.High.name;
  }

  return activityJson;
};

module.exports = {
  getTransformedActivity,
};
