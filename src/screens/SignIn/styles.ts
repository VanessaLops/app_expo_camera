import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: #a700fd;
`;

export const Box = styled.View`
  width: 100%;
  background: #ebe9e9;
  height: 280px;
  border-top-left-radius: 80px;
  opacity: 0.6;
`;

export const TextDecoration = styled.Text`
  font-size: 20px;
  margin-top: 60px;
  text-align: center;
  color: ${(props) => (props.primary ? "white" : "#5c1b8a")};
`;

export const ButtonGmail = styled.TouchableOpacity`
  background: #5c1b8a;
  flex-direction: row;
  width: 291px;
  height: 42px;
  justify-content: center;
  align-self: center;
  align-items: center;
  border-radius: 50px;
  margin-top: 60px;
`;

export const ButtonRegister = styled.TouchableOpacity`
  background: white;
  flex-direction: row;
  color: #5c1b8a;
  width: 291px;
  height: 42px;
  justify-content: center;
  align-self: center;
  align-items: center;
  border-radius: 50px;
  margin-top: 20px;
`;
export const ButtonText = styled.Text`
  color: ${(props) => (props.button ? "#fffff" : "#5c1b8a")};
  font-size: 15px;
`;
