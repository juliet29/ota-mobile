import React from "react";
import { AuthProvider } from "./AuthProvider";
import { Routes } from "./Routes";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

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

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
};
