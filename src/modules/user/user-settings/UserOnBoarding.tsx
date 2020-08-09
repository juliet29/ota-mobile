import React, { useState } from "react";
import { Caption, Button, Title } from "react-native-paper";
import Swiper from "react-native-swiper/src";
import { View, StyleSheet, Text } from "react-native";
import { EditNames } from "./EditNames";
import { PickGenres } from "./PickGenres";
import { HomeStackNavProps } from "../../../navigation/app/home/HomeParamList";
import {
  useEditFirstLoginMutation,
  GetCurrentUserDocument,
} from "../../../generated-components/apolloComponents";
// import {  } from "react";

interface UserOnBoardingProps {}

export const UserOnBoarding: React.FC<
  UserOnBoardingProps & HomeStackNavProps<"UserOnBoarding">
> = ({ navigation }) => {
  const [next, setNext] = useState(true);

  const [editFirstLogin] = useEditFirstLoginMutation();

  const submitEditFirstLogin = async () => {
    try {
      const response = await editFirstLogin({
        refetchQueries: [{ query: GetCurrentUserDocument }],
      });
      console.log("resp", response.data.editFirstLogin);
      return response.data.editFirstLogin;
    } catch (err) {
      return err;
    }
  };

  return (
    <Swiper loop={false} style={styles.wrapper} showsButtons={next}>
      <View style={styles.slide1}>
        <View>
          <Title>Welcome to OnTheAux*</Title>
        </View>
      </View>
      <View style={styles.slide2}>
        <EditNames setNext={setNext} />
      </View>
      <View style={styles.slide3}>
        <PickGenres />
      </View>
      <View style={styles.slide3}>
        <View>
          <Title>Thank you!</Title>
          <Button
            onPress={() => {
              submitEditFirstLogin()
                .then((x) => navigation.navigate("Feed"))
                .catch((err) => console.log("err use onboard", err));
            }}>
            Enter the App
          </Button>
        </View>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  slide4: {
    flex: 1,
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
