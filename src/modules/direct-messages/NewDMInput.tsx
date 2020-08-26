import React from "react";
import { TextInput, IconButton } from "react-native-paper";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import {
  useSendNewDmMutation,
  DirectMessageInput,
  GetMyDmChatDocument,
} from "../../generated-components/apolloComponents";

interface NewDMInputProps {
  partnerID: number;
}

export const NewDMInput: React.FC<NewDMInputProps> = ({ partnerID }) => {
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
    <StyledColumnView>
      <TextInput
        placeholder={"Start a message"}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <IconButton icon="send" onPress={submitSendDM} />
    </StyledColumnView>
  );
};
