import React from "react";
import { Text, Card, Title, Button } from "react-native-paper";

interface TrackVotesProps {}

export const TrackVotes: React.FC<TrackVotesProps> = ({}) => {
  const handlePress = (vote: boolean) => {
    vote ? alert("Upvote") : alert("Downvote");
    // pass info to state management
  };
  return (
    <Card>
      <Card.Content style={{ alignItems: "center" }}>
        <Title>Vote on this Track</Title>
        <Button onPress={() => handlePress(true)} icon="thumb-up-outline">
          Upvote
        </Button>
        <Button onPress={() => handlePress(false)} icon="thumb-down-outline">
          Downvote
        </Button>
      </Card.Content>
    </Card>
  );
};
