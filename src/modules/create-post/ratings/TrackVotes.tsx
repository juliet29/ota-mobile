import React, { useState } from "react";
import { Text, Card, Title, Button } from "react-native-paper";
import {
  useStoreActions,
  useStoreState,
} from "../../../state-management/hooks";

interface TrackVotesProps {}

export const TrackVotes: React.FC<TrackVotesProps> = ({}) => {
  const content = useStoreState((state) => state.createPost.content);
  const setContent = useStoreActions(
    (actions) => actions.createPost.setContent
  );
  // track is by default 0

  const handlePress = (vote: number) => {
    vote === 1
      ? setContent({ ...content, vote: 1 })
      : setContent({ ...content, vote: -1 });

    // pass info to state management
  };
  return (
    <Card>
      <Card.Content style={{ alignItems: "center" }}>
        <Title>Vote on this Track</Title>
        <Button onPress={() => handlePress(1)} icon="thumb-up-outline">
          Upvote
        </Button>
        <Button onPress={() => handlePress(-1)} icon="thumb-down-outline">
          Downvote
        </Button>
      </Card.Content>
    </Card>
  );
};
