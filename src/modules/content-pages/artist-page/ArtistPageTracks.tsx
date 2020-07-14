import React, { useState, useEffect, useRef } from "react";
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
    playbackInstance: null,
    volume: 1.0,
    isBuffering: false,
  });

  const [currentTrack, setCurrentTrack] = useState("");
  const [playable, setPlayable] = useState(false);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
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
      } catch (e) {
        console.log("err preparing audio", e);
      }
    };

    // actually execute
    prepareAudio();
    console.log("pI 1.5", state);
  }, []);

  const isInitialMount = useRef(true);
  useEffect(() => {
    const loadTrack = async () => {
      console.log("current track is", currentTrack);
      try {
        await loadAudio();
        setPlayable(true);
      } catch (e) {
        console.log("err load audio", e);
      }
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      loadTrack();
    }
  }, [currentTrack]);

  const loadAudio = async () => {
    const { volume } = state;

    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        // uri:
        //   "https://p.scdn.co/mp3-preview/9779493d90a47f29e4257aa45bc6146d1ee9cb26?cid=16ecb71937474d49bf1cd3c7d77a8850",
        uri: `${currentTrack}`,
      };

      const status = {
        shouldPlay: playing,
        volume,
      };

      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      console.log("pbi", playbackInstance);

      setState((state) => ({ ...state, playbackInstance }));
      console.log("pI 0", state);

      // setTest((state) => ({ ...state, volume: 0.55 }));
      // console.log("pT 0", test);
      setState((state) => ({ ...state, volume: 0.55 }));

      console.log("pI 1", state);
    } catch (e) {
      console.log("err loading audio", e);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setState({ ...state, isBuffering: status.isBuffering });
  };

  const handlePlayPause = async () => {
    console.log("pI 2", state);
    if (playing) {
      setState((state) => ({ ...state, playbackInstance: null }));
      setPlayable(false);
      return;
    }

    await state.playbackInstance.playAsync();

    setPlaying((playing) => !playing);
    console.log("pI 2.1", state);
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
                  setCurrentTrack(item.item.preview_url);
                }}>
                Listen to This Track
              </Button>
            ) : (
              <Caption>No Preview Available</Caption>
            )}

            {playable ? (
              <Button
                onPress={() => {
                  handlePlayPause();
                }}>
                {state.isBuffering ? (
                  <Ionicons name="ios-circle" size={48} color="#12345" />
                ) : playing ? (
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
