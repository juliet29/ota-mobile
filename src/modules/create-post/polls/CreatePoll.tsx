import React, { useState, useEffect } from "react";
import { Title, TextInput, IconButton } from "react-native-paper";
import {
  StyledColumnView,
  LineBreak,
} from "../../../styled-components/ReusedUI";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CreatePollProps {}
type PollItemType = {
  text: string;
  enabled: Boolean;
};

export const CreatePoll: React.FC<CreatePollProps> = ({}) => {
  const [array, setArray] = useState(
    Array<PollItemType>(4).fill({ text: "", enabled: false })
  );
  useEffect(() => {
    console.log("poll array", array);
  }, [array]);
  return (
    <SafeAreaView>
      <StyledColumnView style={{ marginLeft: 20, marginRight: 20 }}>
        <Title>Username</Title>
        <TextInput placeholder={"Ask a question..."} />
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
      </StyledColumnView>
    </SafeAreaView>
  );
};
