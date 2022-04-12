import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthRoutes } from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../context/auth';
import { NavigationContainer } from '@react-navigation/native';

const Routes: React.FC = () => {
  const { user, isLoadingUserData } = useAuth();

  if (isLoadingUserData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ff9900" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
