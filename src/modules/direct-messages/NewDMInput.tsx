import React from "react";
import { TextInput, IconButton } from "react-native-paper";
import {
  CommentTextInput,
  StyledColumnView,
} from "../../styled-components/ReusedUI";
import {
  useSendNewDmMutation,
  DirectMessageInput,
  GetMyDmChatDocument,
  GetMyDMsDocument,
} from "../../generated-components/apolloComponents";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { View } from "react-native";

interface NewDMInputProps {
  partnerID: number;
}

export const NewDMInput: React.FC<NewDMInputProps> = ({ partnerID }) => {
  const themeContext = useContext(ThemeContext);
  const [text, setText] = React.useState("");
  const [sendDM] = useSendNewDmMutation();

  const submitSendDM = async () => {
    const data: DirectMessageInput = {
      text,
      recipientID: partnerID,
    };
    try {
      const response = await sendDM({
        variables: { data },
        refetchQueries: [
          { query: GetMyDmChatDocument, variables: { data: { partnerID } } },
          { query: GetMyDMsDocument },
        ],
      });
      setText("");
      console.log("send dm res", response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginVertical: 20,
        marginHorizontal: 5,
      }}>
      <CommentTextInput
        style={{
          width: 270,
          height: 40,
        }}
        placeholder="Start a message "
        placeholderTextColor={themeContext.colors.darkText}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      {/* <TextInput
        placeholder={"Start a message"}
        value={text}
        onChangeText={(text) => setText(text)}
      /> */}
      <IconButton icon="send" onPress={submitSendDM} />
    </View>
  );
};
