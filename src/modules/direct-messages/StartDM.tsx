import React, { useState } from "react";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import {
  Searchbar,
  ActivityIndicator,
  Title,
  List,
  Avatar,
} from "react-native-paper";
import { UserSearchType } from "../search/search-types/UserSearchType";
import { useSearchUserQuery } from "../../generated-components/apolloComponents";
import { FlatList } from "react-native-gesture-handler";
import { emptyImage } from "../home/FeedView";
import { DMStackNavProps } from "../../navigation/app/direct-messages/DMParamList";

interface StartDMProps {}

export const StartDM: React.FC<StartDMProps & DMStackNavProps<"DMFeed">> = ({
  navigation,
  route,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <StyledColumnView>
      <Searchbar
        placeholder="Search Users"
        onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
        value={searchQuery}
      />
      {searchQuery ? (
        <DMUserSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          navigation={navigation}
          route={route}
        />
      ) : (
        <></>
      )}
    </StyledColumnView>
  );
};

interface DMUserSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const DMUserSearch: React.FC<
  DMUserSearchProps & DMStackNavProps<"DMFeed">
> = ({ searchQuery, navigation, route, setSearchQuery }) => {
  const { data, loading, error } = useSearchUserQuery({
    variables: {
      query: searchQuery,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    return <></>;
  }

  const searchResult = data?.searchUser;

  return (
    <StyledColumnView>
      <FlatList
        data={searchResult}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) => (
          <List.Item
            title={results.item?.username}
            onPress={() => {
              setSearchQuery("");
              navigation.navigate("DMChat", {
                partnerID: +results.item.id,
                partnerName: results.item.username,
                partnerPictureURL: results.item.profilePicture,
              });
            }}
            left={(props) => (
              <Avatar.Image
                size={20}
                source={{
                  uri: `${
                    results.item.profilePicture
                      ? results.item.profilePicture
                      : emptyImage
                  }`,
                }}
              />
            )}
          />
        )}
      />
    </StyledColumnView>
  );
};
