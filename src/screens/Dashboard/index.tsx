import React from 'react';
import { View, Text } from 'react-native';
import { Container } from './styles';
import { Profile } from '../../components/Dashboard/Profile';
import { Card } from '../../components/Dashboard/Card';


export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Profile />
      <Card />
    </Container>
  );
};
