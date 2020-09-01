import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import {
  deepPurple900,
  deepPurpleA700,
  deepPurple50,
  deepPurple300,
  deepPurpleA400,
} from "./colors";

interface StylishComponentsProps {
  //   onPress?: any;
  //   text?: string;
}

export const GradientButton: React.FC<StylishComponentsProps> = (
  {
    //   onPress,
    //   text,
  }
) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <LinearGradient
          colors={["#7713ff", deepPurpleA700, "#4900ad"]}
          start={{ x: 0.8, y: 0 }}
          style={styles.gradient}>
          <Text style={styles.text}>hello</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  button: {
    width: "100%",
    height: "40%",
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 50,
    marginBottom: 15,
  },
});
