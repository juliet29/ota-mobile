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
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-community/picker";
import RNPickerSelect from "react-native-picker-select";

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
  //   useEffect(() => {
  //     console.log("poll array", array);
  //   }, [array]);

  //   useEffect(() => {
  //     console.log("days", days);
  //   }, [days]);

  const submitPoll = () => {
    const options = array.filter((el) => el.text).map((el) => el.text);
    if (options.length <= 1) {
      setErr(true);
    }
    const pollData = {
      days,
      question,
      options,
    };
    console.log("pollData sample", pollData);
  };

  return (
    <SafeAreaView>
      <StyledColumnView style={{ marginLeft: 20, marginRight: 20 }}>
        <Title>Username</Title>
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
        {/* <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          // items={[
          //     { label: 'Football', value: 'football' },
          //     { label: 'Baseball', value: 'baseball' },
          //     { label: 'Hockey', value: 'hockey' },
          // ]}
          items={[
            { label: "1 day", value: 1 },
            { label: "2 days", value: 2 },
            { label: "3 days", value: 3 },
          ]}
        /> */}
        <Picker
          selectedValue={days}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => setDays(+itemValue)}>
          <Picker.Item label="1 day" value={1} />
          <Picker.Item label="2 days" value={2} />
          <Picker.Item label="3 days" value={3} />
        </Picker>

        <Button onPress={() => submitPoll()}>Submit</Button>
      </StyledColumnView>
    </SafeAreaView>
  );
};
