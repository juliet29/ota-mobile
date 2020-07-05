import React, { useState } from "react";
import { Text, Card, Title } from "react-native-paper";
import StarRating from "react-native-star-rating";

interface AlbumStarsProps {}

export const AlbumStars: React.FC<AlbumStarsProps> = ({}) => {
  const [starCount, setStarCount] = useState(0);

  const onPress = (rating: number) => {
    setStarCount(rating);
  };

  return (
    <Card>
      <Card.Content style={{ alignItems: "center" }}>
        <Title>Rate this Album</Title>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={starCount}
          selectedStar={(rating: number) => onPress(rating)}
        />
      </Card.Content>
    </Card>
  );
};
