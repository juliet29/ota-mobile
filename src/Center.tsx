import React from "react";
import { View } from "react-native";

interface centerProps {}

export const Center: React.FC<centerProps> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      {children}
    </View>
  );
};
