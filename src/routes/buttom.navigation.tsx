import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Dashboard} from "../screens/Dashboard";
import { EvilIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

// Interface

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: "#DCBE98",
        tabBarShowLabel: false,
        tabBarLabelPosition: "beside-icon",
        showLabel: false,
        tabBarLabel: {
          width: 60,
          fontSize: 15,
        },
        tabBarItemStyle: {
          borderRadius: 30,
          bottom: 0,
        },
        style: {
          position: "absolute",
          backgroundColor: "rgba(244,244,244,0.9)",
          elevation: 0,
          borderWidth: 0,
          marginVertical: 10,
          marginHorizontal: 20,
          borderRadius: 30,
          borderTopWidth: 0,
        },
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <EvilIcons color={color} size={30} name="location" />
          ),
        }}
        name="Inicio"
        component={Dashboard}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
