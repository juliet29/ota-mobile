import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { Button } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import { SPOTIFY_ID } from "../utils/Keys";
import React from "react";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function SpotifyAuthButton() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_ID,
      scopes: ["user-read-email", "playlist-modify-public"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: "http://localhost:19006/callback/",
      }),
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
        promptAsync();
      }}>
      SIGN IN WITH SPOTIFY
    </Button>
  );
}
