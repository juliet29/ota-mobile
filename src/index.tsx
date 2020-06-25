import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./utils/AuthProvider";
import { Routes } from "./utils/Routes";
import { onError } from "apollo-link-error";
import { AuthNavProps } from "./navigation/auth/AuthParamList";

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

// const function goToLogin({navigation}):AuthNavProps {
//   navigation.navigate("Login");
// }

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      if (message.includes("not authenticated")) {
        console.log("Not Authenticated");

        //TODO:  send to log in
      } else {
        console.log("dispatch");
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: host,
  credentials: "include",
});

export const client = new ApolloClient({
  link: errorLink.concat(httpLink),
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
