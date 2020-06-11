import * as React from 'react';
//import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import { Button } from 'react-native-paper';

const StyledButton = styled(Button)`
  background-color: #6772e5;
  color: #fff;
  }
`;

// TODO change type from any 
export default function GoToButton({ screenName }:any) {
  const navigation = useNavigation();

  return (
    // <Button
    //   title={`Go to ${screenName}`}
    //   onPress={() => navigation.navigate(screenName)}
    // />

    <StyledButton
      onPress={() => navigation.navigate(screenName)}
    >{screenName}</StyledButton>
  );
}

