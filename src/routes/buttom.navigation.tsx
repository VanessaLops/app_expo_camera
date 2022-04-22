import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Companies } from '../screens/Companies';
import { Octicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Interface

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#a700fd',
        tabBarShowLabel: true,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons color={color} size={25} name="home" />
          ),
        }}
        name="Inicio"
        component={Dashboard}
      />
          <Tab.Screen
        options={{
          tabBarLabel: 'Empresas',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons color={color} size={25} name="home" />
          ),
        }}
        name="Informações das Empresas"
        component={Companies}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
