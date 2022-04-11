import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  width: ${RFValue(80)}px;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: red;
  font-size: ${RFValue(15)}px;
`;
