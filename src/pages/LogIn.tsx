import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoToButton from '../components/buttons';
import { TextInput } from 'react-native-paper';
// import { StyledView } from '../components/container';
import styled from 'styled-components';


export const StyledView = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: red;
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fcba03'
  }
});



export default function LogIn() {
  return (
    <View style={styles.container}>

        <TextInput
        label='Email'
      />
        <TextInput
        label='Password'
      />
      <GoToButton screenName="Home"/>
    </View>
    
  );
}