import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React, { useMemo, useState } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { getAccessToken } from "./utils/accessToken";
import { AppWithHeaders } from "./utils/AppWithHeaders";
import { AuthContext } from "./utils/AuthProvider";

import getEnvVars from "../environment";
// @ts-ignore
const { apiUrl } = getEnvVars();
console.log(`my url in index is ${apiUrl}`);

interface ProvidersProps {}

const theme = {
  ...DefaultTheme,
};
// // const host: string = "https://peaceful-oasis-92942.herokuapp.com/graphql";

// const host = "http://localhost:4000/graphql";
// console.log(host);
// // const httpLink = new HttpLink({
// //   uri: host,
// //   credentials: "include",
// // });

export const client = new ApolloClient({
  uri: `${apiUrl}/graphql`,
  credentials: "include",
  request: (operation) => {
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

export const Providers: React.FC<ProvidersProps> = ({}) => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <AuthContext.Provider value={value as any}>
      <ApolloProvider client={client}>
        <PaperProvider theme={theme}>
          <AppWithHeaders />
        </PaperProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
};
