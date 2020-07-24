import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
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
    console.log(accessToken);
    if (accessToken) {
      operation.setContext({
        headers: {
          authorization: `bearer ${accessToken}`,
        },
      });
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
