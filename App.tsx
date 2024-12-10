import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import AddStudentScreen from './src/addStudentScreen';
import EditScreen from './src/editStudent';
import {Provider} from 'react-redux';
import {store} from './src/store';

const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="addStudent" component={AddStudentScreen} />
        <Stack.Screen name="editStudent" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
