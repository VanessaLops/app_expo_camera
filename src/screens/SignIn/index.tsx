import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Alert } from 'react-native';

import {
  Container,
  Box,
  ButtonGmail,
  ButtonText,
  ButtonRegister,
  TextDecoration,
} from './styles';

import { useAuth } from '../../context/auth';

export type RootStackParamList = {
  Account: undefined;
};

export const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  type homeScreenProp = StackNavigationProp<RootStackParamList, 'Account'>;
  const navigation = useNavigation<homeScreenProp>();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google' + error);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Box>
        <ButtonGmail onPress={handleSignInWithGoogle}>
          <ButtonText> Entrar com o Google</ButtonText>
        </ButtonGmail>
        <ButtonRegister onPress={() => navigation.navigate('Account')}>
          <ButtonText> Registrar-se</ButtonText>
        </ButtonRegister>
        <TextDecoration primary>@2022 by Vanessa Lopes</TextDecoration>
      </Box>
    </Container>
  );
};
