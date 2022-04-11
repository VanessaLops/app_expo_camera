import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn } from "../screens/SignIn";
import { Account } from "../screens/Account";
import { Confirmation } from "../components/Account/Confirmation";
import { Dashboard } from "../screens/Dashboard";
const Stack = createStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={"SignIn"}
        options={{ headerShown: false }}
        component={SignIn}
      />
      <Stack.Screen
        name={"Account"}
        options={{ headerShown: false }}
        component={Account}
      />
      <Stack.Screen
        name={"Confirmation"}
        options={{ headerShown: false }}
        component={Confirmation}
      />
    </Stack.Navigator>
  );
}
