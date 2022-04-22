import React from 'react';

import { Container } from './styles';

import { CardCompanies } from '../../components/Companies/CardCompanies';

export const Companies: React.FC = () => {
  return (
    <Container>
      <CardCompanies />
    </Container>
  );
};
