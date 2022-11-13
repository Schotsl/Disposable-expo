import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ScreenLogin from "../screen/ScreenLogin";
import ScreenWelcome from "../screen/ScreenWelcome";
import ScreenRegister from "../screen/ScreenRegister";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign in" component={ScreenLogin} />
        <Stack.Screen name="Welcome" component={ScreenWelcome} />
        <Stack.Screen name="Sign up" component={ScreenRegister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
