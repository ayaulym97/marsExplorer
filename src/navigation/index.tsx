import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CameraDateSelection,
  MarsPhotosList,
  MarsPhotoDetails,
} from '../screens';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CameraDateSelection"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="CameraDateSelection"
          component={CameraDateSelection}
        />
        <Stack.Screen name="MarsPhotosList" component={MarsPhotosList} />
        <Stack.Screen name="MarsPhotoDetails" component={MarsPhotoDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
