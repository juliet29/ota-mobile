import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from './src/pages/LogIn';
import Home from './src/pages/Home'
import CreatePost from './src/pages/CreatePost';
import { Provider as PaperProvider } from 'react-native-paper';


const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
      <Stack.Screen name="LogIn" component={LogIn}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
