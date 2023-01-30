/**
 * @fileoverview Constants for the application
 */
const constants = Object.freeze({
  PRICE: {
    Free: {
      name: "Free",
      min: 0,
      max: 0,
    },
    Low: {
      name: "Low",
      min: 0,
      max: 0.5,
    },
    High: {
      name: "High",
      min: 0.5,
      max: 1,
    },
  },
  ACCESSIBILITY: {
    High: {
      name: "High",
      min: 0,
      max: 0.25,
    },
    Medium: {
      name: "Medium",
      min: 0.25,
      max: 0.75,
    },
    Low: {
      name: "Low",
      min: 0.75,
      max: 1,
    },
  },
});

export default constants;
