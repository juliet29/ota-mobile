import React from "react";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { CreatePostModal } from "./CreatePostModal";

interface CreatePostOptionsProps {}

export const CreatePostOptions: React.FC<CreatePostOptionsProps> = ({}) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  return (
    <StyledColumnView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          // TODO: put elsewhere later ...
          contentContainerStyle={{
            zIndex: 10,
            backgroundColor: "#6202EE",
            margin: "10px",
          }}>
          <CreatePostModal />
        </Modal>
      </Portal>
      <Button onPress={() => showModal()}>Song</Button>
      <Button>Artist</Button>
      <Button>Album</Button>
    </StyledColumnView>
  );
};
