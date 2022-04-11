import React from "react";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../ConfirmButton";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export const Confirmation: React.FC = () => {
  const { params } = useRoute();
  const { title, message, nextScreenRoute } = params as Params;

  const { navigate } = useNavigation<any>();

  function handleConfirm() {
    navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Content>
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton onPress={handleConfirm} title="OK" />
      </Footer>
    </Container>
  );
};
