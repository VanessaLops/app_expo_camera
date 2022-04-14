import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  width: ${RFValue(85)}%;
  height: ${RFValue(60)}px;
  flex-direction: row;
  margin-bottom: 12px;
  align-self: center;
  border-radius: ${RFValue(12)}px;
`;

export const IconContainer = styled.View<Props>`
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f5;
  margin-right: ${RFValue(2)}px;
  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: blue;
    `}
`;

export const InputText = styled(TextInput) <Props>`
  flex: 1;
  background-color: #9994;
  color: #632e90;
  font-size: ${RFValue(14)}px;
  padding: 0 ${RFValue(10)}px;
  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: #ff4bbf;
    `}
`;
export const Error = styled.Text`
  width: 100%;
  color: red;
  font-size: ${RFValue(14)}px;
  margin: -7px 0 7px;
`;
