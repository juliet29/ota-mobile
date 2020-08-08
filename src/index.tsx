import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-client";
import ApolloClient from "apollo-boost";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import { StoreProvider } from "easy-peasy";
import React, { useMemo, useState } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import getEnvVars from "../environment";
import introspectionQueryResultData from "../fragmentTypes.json";
import store from "./state-management/store";
import { getAccessToken } from "./utils/accessToken";
import { AppWithHeaders } from "./utils/AppWithHeaders";
import { AuthContext } from "./utils/AuthProvider";
// import { setContext } from "apollo-link-context";
console.log("index running");

// @ts-ignore
const { apiUrl } = getEnvVars();
console.log(`my url in index is ${apiUrl}`);

const theme = {
  ...DefaultTheme,
};

// for queries involving unions in shema
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

export const client = new ApolloClient({
  cache,
  uri: `${apiUrl}/graphql`,
  credentials: "include",
  request: (operation) => {
    // TODO move to easy-peasy
    const accessToken = getAccessToken();
    // console.log(accessToken);
    if (accessToken) {
      console.log("we have an access token in index", accessToken);
      operation.setContext({
        headers: {
          authorization: `bearer ${accessToken}`,
        },
      });
    }
    if (!accessToken) {
      console.log("we dont have an access token in index");
    }
  },
});

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <StoreProvider store={store}>
      <AuthContext.Provider value={value as any}>
        <ApolloProvider client={client}>
          <PaperProvider theme={theme}>
            {/* <SafeAreaProvider>
              {" "} */}
            <AppWithHeaders />
            {/* </SafeAreaProvider> */}
          </PaperProvider>
        </ApolloProvider>
      </AuthContext.Provider>
    </StoreProvider>
  );
};
