import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import React, { useMemo, useState } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { getAccessToken } from "./utils/accessToken";
import { AppWithHeaders } from "./utils/AppWithHeaders";
import { AuthContext } from "./utils/AuthProvider";
import { StoreProvider } from "easy-peasy";
import store from "./state-management/store";
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "../fragmentTypes.json";
import getEnvVars from "../environment";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";

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

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const accessToken = getAccessToken();
  console.log("index.tsx", accessToken);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : "",
    },
  };
});

const uploadLink = createUploadLink({
  uri: `${apiUrl}/graphql`,
  credentials: "include",
});

export const client = new ApolloClient({
  cache,
  link: authLink.concat(uploadLink),
});

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  // GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
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
