import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoToButton from '../components/buttons';

export default function LogIn() {
  return (
    <View>
      <Text>Log In!</Text>
      <GoToButton screenName="Home"/>
    </View>
  );
}