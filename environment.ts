/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from "expo-constants";
import { Platform } from "react-native";

// const localhost = Platform.OS === "ios" ? "localhost:4000" : "10.0.2.2:4000";

const ENV = {
  dev: {
    apiUrl: "http://localhost:4000",
  },
  staging: {
    apiUrl: "https://peaceful-oasis-92942.herokuapp.com",
    //    amplitudeApiKey: "[Enter your key here]",
    // Add other keys you want here
  },
  prod: {
    apiUrl: "https://peaceful-oasis-92942.herokuapp.com",
    //    amplitudeApiKey: "[Enter your key here]",
    // Add other keys you want here
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars;
