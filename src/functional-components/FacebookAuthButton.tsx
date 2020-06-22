import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Platform } from "react-native";
import { Button } from "react-native-paper";
import { FB_ID } from "../utils/Keys";
import { AuthContext } from "../utils/AuthProvider";
import { useContext } from "react";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.facebook.com/v6.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v6.0/oauth/access_token",
};

const useProxy = Platform.select({ web: false, default: true });

export default function FacebookAuthButton() {
  const { login } = useContext(AuthContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: FB_ID,
      scopes: ["public_profile", "email"],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        useProxy,
        // For usage in bare and standalone
        // Use your FBID here. The path MUST be `authorize`.
        native: "fb111111111111://authorize",
      }),
      extraParams: {
        // Use `popup` on web for a better experience
        display: Platform.select({ web: "popup" }) as any,
        // Optionally you can use this to rerequest declined permissions
        auth_type: "rerequest",
      },
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <Button
      mode="outlined"
      disabled={!request}
      onPress={() => {
        promptAsync({
          useProxy,
          windowFeatures: { width: 700, height: 600 },
        } as any);
        // redirect to app tabs
        login();
      }}>
      Sign in with Facebook
    </Button>
  );
}
