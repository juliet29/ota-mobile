import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoToButton from '../components/buttons';

export default function CreatePost() {
  return (
    <View>
      <Text>Make a post</Text>
      <GoToButton screenName="LogIn"/>
    </View>
  );
}