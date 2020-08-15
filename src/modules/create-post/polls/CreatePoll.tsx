import React, { useState, useEffect } from "react";
import { Title, TextInput, IconButton } from "react-native-paper";
import {
  StyledColumnView,
  LineBreak,
} from "../../../styled-components/ReusedUI";
import { FlatList, View } from "react-native";

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
    <StyledColumnView>
      <Title>Username</Title>
      <TextInput placeholder={"Ask a question..."} />
      <LineBreak />
      <FlatList
        data={array}
        keyExtractor={(item, index) => index.toString() + item}
        renderItem={({ item, index }) =>
          item.enabled ? (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TextInput
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
              <IconButton icon="minus" />
            </View>
          ) : (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TextInput
                value={item.text}
                placeholder={"Add Option"}
                disabled={true}
              />
              <IconButton
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
  );
};
