import React, { useContext } from "react";
import * as Google from "expo-google-app-auth";
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from "../utils/Keys";
import { Button } from "react-native-paper";
import { AuthContext } from "../utils/AuthProvider";

interface GoogleAuthButtonProps {}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({}) => {
  const { setUser } = useContext(AuthContext);
  async function submitSignInWithGoogle() {
    await signInWithGoogle();
    setUser("googlelogin");
  }
  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        //TODO make work for web
      });

      if (result.type === "success") {
        // Then you can use the Google REST API
        let userInfoResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${result.accessToken}` },
          }
        );
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("signing in with Google not successful! ", err);
      return { error: true };
    }
  }

  return (
    <Button
      mode="outlined"
      onPress={() => {
        submitSignInWithGoogle();
      }}>
      Sign in with Google
    </Button>
  );
};
