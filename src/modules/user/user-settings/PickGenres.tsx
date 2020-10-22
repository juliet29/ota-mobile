import React, { useState } from "react";
import { StyledColumnView } from "../../../styled-components/ReusedUI";
import {
  Title,
  Chip,
  Colors,
  Button,
  ActivityIndicator,
  Caption,
} from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  useEditUserNamesMutation,
  useGetGenresQuery,
  useEditUserGenresMutation,
  GetCurrentUserDocument,
  EditUserInput,
} from "../../../generated-components/apolloComponents";

interface PickGenresProps {}

export const PickGenres: React.FC<PickGenresProps> = ({}) => {
  const [selectedGenres, setSelectedGenres] = useState(new Array<string>());
  const [editGenres] = useEditUserGenresMutation();
  const { data, loading, error } = useGetGenresQuery();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error..</Caption>;
  }
  // const data = ["edm", "electro", "electronic", "emo", "folk", "forro"];

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

  const submitEditGenres = async () => {
    const data: EditUserInput = {
      genres: selectedGenres,
    };
    try {
      const response = await editGenres({
        variables: { data },
        refetchQueries: [{ query: GetCurrentUserDocument }],
      });
      console.log("resp", response);
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <ScrollView>
      <StyledColumnView>
        <Title
          style={{
            textAlign: "center",
          }}>
          Pick Your Favorite Genres
        </Title>
        <Button
          mode="contained"
          disabled={selectedGenres.length == 0}
          onPress={submitEditGenres}>
          Save Changes
        </Button>
        {/* <Caption>Use Side Arrows to Skip for Now</Caption> */}
        <FlatList
          style={{
            marginHorizontal: 3,
          }}
          contentContainerStyle={{
            display: "flex",
            alignItems: "center",
          }}
          data={data.getGenres.genres}
          numColumns={3}
          keyExtractor={(item, index) => item!?.toString() + index}
          renderItem={(item) => (
            <Chip
              style={{
                margin: 7,
                borderRadius: 50,
                height: 90,
                width: 90,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: selectedGenres.includes(item.item)
                  ? Colors.cyan400
                  : Colors.white,
              }}
              selectedColor={
                selectedGenres.includes(item.item)
                  ? Colors.white
                  : Colors.deepPurple700
              }
              onPress={() => updateSelectedGenres(item.item)}>
              {item.item}
            </Chip>
          )}
        />
      </StyledColumnView>
    </ScrollView>
  );
};
