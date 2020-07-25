// import React from "react";
// import { View, GestureResponderEvent } from "react-native";
// import { Checkbox, ToggleButton } from "react-native-paper";
// import { FlatList } from "react-native-gesture-handler";

// interface UserPostsFilterProps {
//     artist: () => void,
//     album: () => void,
//     track: () => voud
// }
// type Status = "checked" | "unchecked";
// type setFx = (value?: string | GestureResponderEvent) => void;
// type ToggleButtonType = (a: string, b: setFx) => void;

// export const UserPostsFilter: React.FC<UserPostsFilterProps> = ({artist, album, track}) => {
// //   const [artistStatus, setArtistStatus] = React.useState("checked");
// //   const [albumStatus, setAlbumStatus] = React.useState("checked");
// //   const [trackStatus, setTrackStatus] = React.useState("checked");

//   const onArtistButtonToggle = (value) => {
//     setArtistStatus(artistStatus === "checked" ? "unchecked" : "checked");
//   };

//   const onAlbumButtonToggle = (value) => {
//     setAlbumStatus(albumStatus === "checked" ? "unchecked" : "checked");
//   };

//   const onTrackButtonToggle = (value) => {
//     setTrackStatus(trackStatus === "checked" ? "unchecked" : "checked");
//   };

//   const buttonArray = [
//     ["artist", artistStatus, onArtistButtonToggle],
//     ["album", albumStatus, onAlbumButtonToggle],
//     ["music", trackStatus, onTrackButtonToggle],
//   ];

//   return (
//     <View>
//       <FlatList
//         data={buttonArray}
//         renderItem={({ item }) => (
//           <ToggleButton
//             icon={item[0] as string}
//             value={item[0] as string}
//             status={item[1] as Status}
//             onPress={item[2] as setFx}
//           />
//         )}
//         keyExtractor={(item, ix) => ix.toString()}
//       />
//     </View>
//   );
// };
