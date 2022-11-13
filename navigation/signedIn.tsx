import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ScreenHome from '../screen/ScreenHome';
import ScreenCamera from '../screen/ScreenCamera';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ScreenHome} />
        <Stack.Screen name="Camera" component={ScreenCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
