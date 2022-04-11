import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Alert } from "react-native";

import {
  Container,
  Box,
  ButtonGmail,
  ButtonText,
  ButtonRegister,
  TextDecoration,
} from "./styles";

import { useAuth } from "../../context/auth";

export const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const navigation = useNavigation();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google" + error);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Box>
        <ButtonGmail onPress={handleSignInWithGoogle}>
          <ButtonText> Entrar com o Google</ButtonText>
        </ButtonGmail>
        <ButtonRegister onPress={() => navigation.navigate("Account")}>
          <ButtonText> Registrar-se</ButtonText>
        </ButtonRegister>
        <TextDecoration primary>@2022 by Vanessa Lopes</TextDecoration>
      </Box>
    </Container>
  );
};
