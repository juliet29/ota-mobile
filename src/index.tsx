import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./utils/AuthProvider";
import { Routes } from "./utils/Routes";
import { getAccessToken } from "./utils/accessToken";
import { AppWithHeaders } from "./utils/AppWithHeaders";

interface ProvidersProps {}

const theme = {
  ...DefaultTheme,
};
// const host: string = "https://peaceful-oasis-92942.herokuapp.com/graphql";

const host = "http://localhost:4000/graphql";
console.log(host);
// const httpLink = new HttpLink({
//   uri: host,
//   credentials: "include",
// });

export const client = new ApolloClient({
  uri: host,
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
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <AppWithHeaders />
      </PaperProvider>
    </ApolloProvider>
  );
};
