import React from 'react';
import { Avatar, Container } from './styles';
import { useAuth } from '../../../context/auth';
export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Avatar source={{ uri: user.photo }} />
    
    </Container>
  );
};
