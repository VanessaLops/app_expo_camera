import React from 'react';
import { View, Text } from 'react-native';
import { Container } from './styles';
import { Profile } from '../../components/Dashboard/Profile';

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Profile />
      <View
        style={{
          backgroundColor: '#a700fd',
          width: 280,
          position: 'absolute',
          alignSelf: 'center',
          zIndex: 1,
          height: 500,
          marginTop: 100,
          borderRadius: 12,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 150,
            backgroundColor: 'red',
            alignSelf: 'center',
            marginTop: 120,
          }}
        ></View>
      </View>
    </Container>
  );
};
