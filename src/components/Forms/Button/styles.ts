import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 16px 0;
  border-radius: 5px;
`;

export const Title = styled.Text`
 
  color: ${({ theme }) => theme.colors.secundary};
  font-size: ${RFValue(14)}px;
`;