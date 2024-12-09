import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import AddStudentScreen from './src/addStudentScreen';
import EditScreen from './src/editStudent';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="addStudent" component={AddStudentScreen} />
      <Stack.Screen name="editStudent" component={EditScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
