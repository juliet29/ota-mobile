import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./utils/AuthProvider";
import { Routes } from "./utils/Routes";
interface ProvidersProps {}

const theme = {
  ...DefaultTheme,
  // roundness: 10,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: "#3498db",
  //   accent: "#f1c40f",
  // },
};

const host = "http://localhost:4000/graphql";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: host,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PaperProvider>
    </ApolloProvider>
  );
};
