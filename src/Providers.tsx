import React from "react";
import { AuthProvider } from "./AuthProvider";
import { Routes } from "./Routes";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { Platform } from "react-native";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
interface ProvidersProps {}

const theme = {
  ...DefaultTheme,
  roundness: 30,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: "#3498db",
  //   accent: "#f1c40f",
  // },
};

const host =
  Platform.OS === "ios"
    ? "http://localhost:4000/graphql"
    : "http://10.0.2.2:4000/graphql";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: host,
  }),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
// });

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
