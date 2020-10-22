import React, { useState, useEffect } from "react";
import {
  Title,
  TextInput,
  IconButton,
  Subheading,
  Button,
} from "react-native-paper";
import {
  StyledColumnView,
  LineBreak,
} from "../../../styled-components/ReusedUI";
import { FlatList, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-community/picker";
import { LengthPicker } from "./Picker";
import {
  useCreatePollMutation,
  GetPostsDocument,
  PollInput,
  PollOptionInput,
} from "../../../generated-components/apolloComponents";
import { styles } from "../../../styled-components/StyleSheet";

interface CreatePollProps {}
type PollItemType = {
  text: string;
  enabled: Boolean;
};

export const CreatePoll: React.FC<CreatePollProps> = ({}) => {
  const [err, setErr] = useState(false);
  const [array, setArray] = useState(
    Array<PollItemType>(4).fill({ text: "", enabled: false })
  );
  const [days, setDays] = useState(1);
  const [question, setQuestion] = useState("");
  const [createPoll] = useCreatePollMutation();
  //   useEffect(() => {
  //     console.log("poll array", array);
  //   }, [array]);

  useEffect(() => {
    console.log("days", days);
  }, [days]);

  const submitPoll = async () => {
    const options: PollOptionInput[] = array
      .filter((el) => el.text)
      .map((el) => {
        let votes: number = 0;
        let option = el.text;
        return { option, votes };
      });
    const pollData: PollInput = {
      length: days,
      question,
      options,
    };
    console.log("pollData sample", pollData);
    try {
      const response = await createPoll({
        variables: { data: pollData },
        refetchQueries: [{ query: GetPostsDocument }],
      });

      console.log("response pollData", response);
    } catch (err) {
      return err;
    } finally {
      console.log("success poll sent ");
      setQuestion("");
      setArray(Array<PollItemType>(4).fill({ text: "", enabled: false }));
      setDays(1);
      // redirect to home page
      // let know post was succesfule
    }
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require("../../../local-assets/wavy.png")}>
      <SafeAreaView>
        <StyledColumnView style={{ marginLeft: 20, marginRight: 20 }}>
          <Title>Username</Title>
          <Button onPress={() => submitPoll()}>Submit</Button>
          <TextInput
            placeholder={"Ask a question..."}
            value={question}
            onChangeText={(text) => setQuestion(text)}
          />
          <LineBreak />
          <StyledColumnView>
            <FlatList
              data={array.sort((a, b) => +b.enabled - +a.enabled)}
              keyExtractor={(item, index) => index.toString() + item}
              renderItem={({ item, index }) =>
                item.enabled ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}>
                    <TextInput
                      style={{ flexGrow: 2 }}
                      placeholder={"Enter an Answer"}
                      value={item.text}
                      onChangeText={(text) =>
                        setArray(
                          Object.assign([...array], {
                            [index]: { ...item, text: text },
                          })
                        )
                      }
                    />
                    <IconButton
                      style={{ flexGrow: 0.25 }}
                      icon="minus"
                      onPress={() => {
                        setArray(
                          Object.assign([...array], {
                            [index]: { ...item, enabled: false, text: "" },
                          })
                        );
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginRight: 20,
                    }}>
                    <TextInput
                      style={{ flexGrow: 2 }}
                      value={item.text}
                      placeholder={"Add Option"}
                      disabled={true}
                    />
                    <IconButton
                      style={{ flexGrow: 0.25 }}
                      icon="plus"
                      onPress={() => {
                        setArray(
                          Object.assign([...array], {
                            [index]: { ...item, enabled: true },
                          })
                        );
                      }}
                    />
                  </View>
                )
              }
            />
          </StyledColumnView>
          <Subheading>Poll Length</Subheading>
          <LengthPicker days={days} setDays={setDays} />
          {/* 
        <Picker
          selectedValue={days}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => setDays(+itemValue)}>
          <Picker.Item label="1 day" value={1} />
          <Picker.Item label="2 days" value={2} />
          <Picker.Item label="3 days" value={3} />
        </Picker> */}
        </StyledColumnView>
      </SafeAreaView>
    </ImageBackground>
  );
};
