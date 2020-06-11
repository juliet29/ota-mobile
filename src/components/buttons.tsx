import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


// TODO change type from any 
export default function GoToButton({ screenName }:any) {
  const navigation = useNavigation();

  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

