import React from "react";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { StyledColumnView, Wrapper } from "../../styled-components/ReusedUI";
import { CreatePostModal } from "./CreatePostModal";
import { useStoreActions } from "../../state-management/hooks";
import { FlatList } from "react-native-gesture-handler";

interface CreatePostOptionsProps {}

export const CreatePostOptions: React.FC<CreatePostOptionsProps> = ({}) => {
  const [visible, setVisible] = React.useState(false);

  const setPostType = useStoreActions(
    (actions) => actions.createPost.setPostType
  );

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const postTypes = ["Song", "Artist", "Album"];

  return (
    <StyledColumnView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            zIndex: 10,
          }}>
          <CreatePostModal />
        </Modal>
      </Portal>
      <FlatList
        data={postTypes}
        renderItem={(item) => (
          <Button
            onPress={() => {
              showModal();
              setPostType(item.item);
            }}>
            {item.item}
          </Button>
        )}
        keyExtractor={(item) => item}
      />
    </StyledColumnView>
  );
};
