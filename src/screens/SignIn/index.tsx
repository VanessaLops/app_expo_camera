import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import {
  Container,
  Box,
  ButtonGmail,
  ButtonText,
  ButtonRegister,
  TextDecoration,
} from "./styles.ts";

import logo from "../../assets/logo.png";
import background from "../../assets/background.jpg";

import { useAuth, signInWithGoogle } from "../../context/auth";
import SignInSocialButton from "../../components/SignInSocialButton";

export const SignIn: React.FC  = () => {
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
