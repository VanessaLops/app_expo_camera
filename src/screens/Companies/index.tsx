import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Container } from './styles';
import api from '../../services/api';
import { AxiosResponse } from 'axios';

interface Companies {
  id: string;
  name: string;
  email: string;
  typePeople: string;
  cnpj?: string;
  cpf?: string;
  images: [];
  documents: [];
}


export const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Array<Companies>>([]);

  useEffect(() => {
    api.get<Companies[]>('/store').then((response: AxiosResponse) => {
      setCompanies(response.data);
    });
  }, []);

  return (
    <Container>
      <View>
        {companies.map(comp => (
          <View key={comp.id}>
            <Text>{comp.email}</Text>
          </View>
        ))}
      </View>
    </Container>
  );
};
