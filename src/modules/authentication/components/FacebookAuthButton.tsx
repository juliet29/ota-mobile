import * as Facebook from "expo-facebook";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Alert, Platform } from "react-native";
import { Button } from "react-native-paper";
import {
  SsoRegisterInput,
  useFacebookSsoMutation,
} from "../../../generated-components/apolloComponents";
import { FB_ID } from "../../../utils/Keys";
import { useLoginHook } from "./useLoginHook";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.facebook.com/v6.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v6.0/oauth/access_token",
};

const useProxy = Platform.select({ web: false, default: true });

export default function FacebookAuthButton() {
  const [signOnUser, { loading, error }] = useFacebookSsoMutation();
  const [setLoginUser] = useLoginHook();

  async function submitSignOnUser(data: SsoRegisterInput) {
    try {
      console.log("about submit");
      const response = await signOnUser({
        variables: {
          data,
        },
      });
      return response.data.facebookSSO.accessToken;
    } catch (err) {
      // TODO  handle server errors at top level
      console.log("server err", err);
    }
  }

  // log in with the facebook app on mobile
  async function fbAppLogIn() {
    try {
      await Facebook.initializeAsync(FB_ID);

      const res = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile, email"],
      });

      if (res.type === "success") {
        // Get the user's name using Facebook's Graph API

        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${res.token}`
        );

        const userInfo = await response.json();

        const goodUserInfo: SsoRegisterInput = {
          username: userInfo.name,
          email: userInfo.email,
          id: userInfo.id,
        };
        console.log("better user", userInfo);
        const token = await submitSignOnUser(goodUserInfo);
        setLoginUser(token);
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);

        // sign on the user to ota-server, and get an access code
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      // alert(`Facebook Login Error: ${message}`);
      console.log(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <Button
      mode="outlined"
      // disabled={!request}
      onPress={() => {
        // promptAsync({
        //   useProxy,
        //   windowFeatures: { width: 700, height: 600 },
        // } as any);
        // redirect to app tabs
        // setUser("facebooklogin");
        // TODO: give access token to user
        fbAppLogIn();
      }}>
      Sign in with Facebook
    </Button>
  );
}
