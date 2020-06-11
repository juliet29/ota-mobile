import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoToButton from '../components/buttons';

export default function Home() {
  return (
    <View>
      <Text>Welcome home!</Text>
      <GoToButton screenName="CreatePost"/>
    </View>
  );
}