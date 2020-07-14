import React, { useState, useEffect } from "react";
import { useGetArtistTopTracksQuery } from "../../../generated-components/apolloComponents";
import { ActivityIndicator, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card, Subheading, Caption, Text, Button } from "react-native-paper";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

interface ArtistProps {
  id: string;
}

export const ArtistPageTracks: React.FC<ArtistProps> = ({ id }) => {
  const { data, loading, error } = useGetArtistTopTracksQuery({
    variables: {
      id: id,
    },
  });

  const [state, setState] = useState({
    isPlaying: false,
    playbackInstance: null,
    currentTrack: "",
    volume: 1.0,
    isBuffering: false,
  });

  useEffect(() => {
    console.log("current track is", state.currentTrack);
    const prepareAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true,
        });

        await loadAudio();
      } catch (e) {
        console.log("err preparing audio", e);
      }
    };

    // actually execute
    prepareAudio();
  }, []);

  // useEffect( state.currentTrack
  //   () => {

  //   }
  // )

  const loadAudio = async () => {
    const { currentTrack, isPlaying, volume } = state;

    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri:
          "https://p.scdn.co/mp3-preview/9779493d90a47f29e4257aa45bc6146d1ee9cb26?cid=16ecb71937474d49bf1cd3c7d77a8850",
        // uri: `${currentTrack}`,
      };

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      console.log("pI 1", playbackInstance);
      setState({ ...state, playbackInstance });
    } catch (e) {
      console.log("err loading audio", e);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setState({ ...state, isBuffering: status.isBuffering });
  };

  const handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = state;
    console.log("pI 2", playbackInstance);
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    setState({ ...state, isPlaying: !isPlaying });
  };

  // actually render
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  return (
    <FlatList
      data={data.getArtistTopTracks.tracks!}
      renderItem={(item) => (
        <Card>
          <Card.Content style={{ alignItems: "center" }}>
            {
              item?.item.album.images.map((element) => (
                <Image
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                  source={{
                    uri: `${element.url}`,
                  }}
                />
              ))[0]
            }
            <Subheading style={{ textAlign: "center" }}>
              {item.item.name}
            </Subheading>
            {item.item.artists.map((element, ix) => (
              <Caption key={ix}>{element.name}</Caption>
            ))}

            {item.item.preview_url ? (
              <Button
                onPress={() => {
                  // setState({ ...state, currentTrack: item.item.preview_url });

                  handlePlayPause();
                }}>
                {state.isPlaying ? (
                  <Ionicons name="ios-pause" size={48} color="#444" />
                ) : (
                  <Ionicons name="ios-play-circle" size={48} color="#444" />
                )}
              </Button>
            ) : (
              <></>
            )}
          </Card.Content>
        </Card>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};
