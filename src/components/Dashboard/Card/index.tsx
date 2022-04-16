import React, { useState, useEffect } from 'react';
import { CardContainer, Container, Name, Email, Title } from './styles';
import { useAuth } from '../../../context/auth';
import api from '../../../services/api';
interface UserProps {
  name: string;
  email: string;
}
export const Card: React.FC<UserProps> = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const users = await api.get('http://192.168.100.26:3000/store');
    setUsers(users.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <CardContainer>
      <Container>
        <Name>Nome de Usuário - {user.name}</Name>
        <Email>Email - {user.email}</Email>

        <Title>Informações da Empresa Cadastrada</Title>
      </Container>

      <Title>Informações da Empresa Cadastrada</Title>
      {console.log('retorno -- >' + users.length)}
    </CardContainer>
  );
};
