import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Dashboard} from "../screens/Dashboard";
import BottomTabs from "./buttom.navigation";

const App = createStackNavigator();

const AppRouthes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: "#312e38" },
    }}
  >
    <App.Screen
      name="BottomTabs"
      component={BottomTabs}
      options={{ headerShown: false }}
    />
    <App.Screen
      name="Inicio"
      component={Dashboard}
      options={{ headerShown: false }}
    />
  </App.Navigator>
);

export default AppRouthes;
