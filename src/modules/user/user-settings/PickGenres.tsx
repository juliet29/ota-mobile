import React, { useState } from "react";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import { Title, Chip, Colors, Button } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

interface PickGenresProps {}

export const PickGenres: React.FC<PickGenresProps> = ({}) => {
  const [selectedGenres, setSelectedGenres] = useState(new Array<String>());
  const data = ["edm", "electro", "electronic", "emo", "folk", "forro"];

  const updateSelectedGenres = (genreName: string) => {
    if (!selectedGenres.includes(genreName)) {
      // add
      setSelectedGenres((existData) => [...existData, genreName]);
      console.log("selec genres update", selectedGenres);
      return;
    }
    // delete
    const tempArr = selectedGenres.filter((e) => e !== genreName);
    setSelectedGenres(tempArr);
    console.log("selec genres delete", selectedGenres);
  };

  return (
    <StyledColumnView>
      <Title>Pick Your Favorite Genres</Title>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item!?.toString() + index}
        renderItem={(item) => (
          <Chip
            selectedColor={
              selectedGenres.includes(item.item)
                ? Colors.deepPurple100
                : Colors.deepPurple700
            }
            onPress={() => updateSelectedGenres(item.item)}>
            {item.item}
          </Chip>
        )}
      />
      <Button mode="contained" disabled={selectedGenres.length == 0}>
        Save Changes
      </Button>
      <Button>Skip For Now</Button>
    </StyledColumnView>
  );
};
