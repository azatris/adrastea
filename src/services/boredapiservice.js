import axios from "axios";
import constants from "../constants";
import { InvalidAccessibilityError, InvalidPriceError } from "../errors";

const BASE_URL = "http://www.boredapi.com/api";
const ACTIVITY_URL = `${BASE_URL}/activity`;
const KEY_MIN_ACCESSIBILITY = "minaccessibility";
const KEY_MAX_ACCESSIBILITY = "maxaccessibility";
const KEY_MIN_PRICE = "minprice";
const KEY_MAX_PRICE = "maxprice";
const EPSILON = 0.00000000000000001; // The API has inclusive ranges, so we need to add a small number to the min params

/**
 * Get an activity from the Bored API
 * If accessibilityLevel and priceLevel are provided, the API will return an activity that matches the constraints
 * If accessibilityLevel and priceLevel are not provided, the API will return a random activity
 *
 * @param accessibilityLevel - The accessibility level of the activity (see constants.js)
 * @param priceLevel - The price level of the activity (see constants.js)
 * @returns {Promise<AxiosResponse<any>> | *} The activity
 */
const getActivity = (accessibilityLevel, priceLevel) => {
  if (!accessibilityLevel && !priceLevel) {
    return axios({
      method: "GET",
      url: ACTIVITY_URL,
    });
  }

  let countParams = 0;
  let url = `${ACTIVITY_URL}?`;

  const addAccessibilityConstraintsToUrl = () => {
    if (countParams > 0) {
      url += "&";
    }
    let minaccessibility = 0;
    let maxaccessibility = 1;
    const { High, Medium, Low } = constants.ACCESSIBILITY;
    if (accessibilityLevel === High.name) {
      minaccessibility = High.min;
      maxaccessibility = High.max;
    } else if (accessibilityLevel === Medium.name) {
      minaccessibility = Medium.min + EPSILON;
      maxaccessibility = Medium.max;
    } else if (accessibilityLevel === Low.name) {
      minaccessibility = Low.min + EPSILON;
      maxaccessibility = Low.max;
    } else if (accessibilityLevel) {
      // We have an accessibility level, but it's not one of the supported ones
      throw new InvalidAccessibilityError(
        `Unsupported accessibility level: ${accessibilityLevel}`
      );
    }
    url += `${KEY_MIN_ACCESSIBILITY}=${minaccessibility}&${KEY_MAX_ACCESSIBILITY}=${maxaccessibility}`;
    countParams += 1;
  };

  if (accessibilityLevel) {
    addAccessibilityConstraintsToUrl();
  }

  const addPriceLevelConstraintsToUrl = () => {
    if (countParams > 0) {
      url += "&";
    }
    let minprice = 0;
    let maxprice = 1;
    const { Free, Low, High } = constants.PRICE;
    if (priceLevel === Free.name) {
      minprice = Free.min;
      maxprice = Free.max;
    } else if (priceLevel === Low.name) {
      minprice = Low.min + EPSILON;
      maxprice = Low.max;
    } else if (priceLevel === High.name) {
      minprice = High.min + EPSILON;
      maxprice = High.max;
    } else if (priceLevel) {
      // We have a price level, but it's not one of the supported ones
      throw new InvalidPriceError(`Unsupported price level: ${priceLevel}`);
    }
    url += `${KEY_MIN_PRICE}=${minprice}&${KEY_MAX_PRICE}=${maxprice}`;
    countParams += 1;
  };

  if (priceLevel) {
    addPriceLevelConstraintsToUrl();
  }

  console.log("Activity request URL: " + url);

  return axios({
    method: "GET",
    url,
  });
};

export default getActivity;
