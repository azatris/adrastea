import "./boredapiservice";
import constants from "../constants";
import { getLastUser } from "./userservice";
import { getActivity } from "./boredapiservice";

export const getTransformedActivity = async () => {
  // If a user is created, let's use the last one created to get their accessibility and price to query the API
  const lastUser = await getLastUser();

  let activityJson;
  if (lastUser) {
    const { accessibility: accessibilityLevel, price: priceLevel } = lastUser;
    let activity = await getActivity(
      accessibilityLevel,
      priceLevel
    );
    activityJson = activity.data;
    if (activityJson.error) {
      // If the API returns an error, let's just get a random activity
      activity = await getActivity();
      activityJson = activity.data;
    }
  } else {
    const activity = await getActivity();
    activityJson = activity.data;
  }
  if (activityJson.error) {
    console.log("Error received: ", activityJson.error);
    return activityJson;
  }

  // Transform accessibility and price to human-readable values
  const { ACCESSIBILITY, PRICE } = constants;

  const accessibilityValue = activityJson.accessibility;
  if (accessibilityValue <= ACCESSIBILITY.High.max) {
    activityJson.accessibility = ACCESSIBILITY.High.name;
  } else if (accessibilityValue <= ACCESSIBILITY.Medium.max) {
    activityJson.accessibility = ACCESSIBILITY.Medium.name;
  } else {
    activityJson.accessibility = ACCESSIBILITY.Low.name;
  }

  const priceValue = activityJson.price;
  if (priceValue === PRICE.Free.max) {
    activityJson.price = PRICE.Free.name;
  } else {
    activityJson.price = priceValue <= PRICE.Low.max ? PRICE.Low.name : PRICE.High.name;
  }

  return activityJson;
};
