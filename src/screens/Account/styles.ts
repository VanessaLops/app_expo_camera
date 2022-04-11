import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { Picker as SelectPicker, Picker } from "@react-native-picker/picker";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f0f5;
`;

export const PickerContainer = styled(SelectPicker)`
  background-color: #9994;
  align-items: center;
  align-self: center;
  color: #632e90;

  width: ${RFValue(85)}%;
  border-radius: ${RFValue(15)}px;
  margin-top: ${RFValue(20)}px;
  margin: 12px 12px 12px 12px;
`;

export const Register = styled.TouchableOpacity`
  background-color: #a700fd;
  flex-direction: row;
  width: ${RFValue(240)}px;
  height: ${RFValue(40)}px;
  justify-content: center;
  align-self: center;
  align-items: center;
  border-radius: ${RFValue(12)}px;
  margin-top: ${RFValue(10)}px;
`;
export const ButtonText = styled.Text`
  color: ${(props) => (props.button ? "red" : "#ffff")};
  font-size: ${RFValue(15)}px;
`;

export const Title = styled.Text`
  color: ${(props) => (props.primary ? "#632E90" : "#FF4BBF")};
  font-size: ${RFValue(30)}px;
  padding-top: 50px;
  align-self: center;
`;
export const SubTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  padding-top: ${RFValue(40)}px;
  align-self: center;
  padding: 12px 0px 12px 12px;
  color: ${(props) => (props.primary ? "#632E90" : "#FF4BBF")};
`;

export const InputArea = styled.View`
  display: flex;
  flex-direction: column;
`;

export const ImagePicker = styled.Image`
  width: ${RFValue(250)}px;
  height: ${RFValue(180)}px;
  border-radius: ${RFValue(8)}px;
  align-self: center;
  margin-top: ${RFValue(10)}px;
`;

export const ButtonCameraReverse = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  left: ${RFValue(10)}px;
  right: ${RFValue(10)}px;
  width: ${RFValue(50)}px;
  justify-content: center;
  border-radius: ${RFValue(15)}px;
  margin-top: ${RFValue(290)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
export const ButtonCamera = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  right: ${RFValue(20)}px;
  width: ${RFValue(50)}px;
  justify-content: center;
  margin-top: ${RFValue(290)}px;
  border-radius: ${RFValue(15)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const ViewFlatlist = styled.View`
  width: ${RFValue(100)}%;
  height: ${RFValue(150)}px;
  align-self: center;
  margin-top: ${RFValue(12)}px;
`;

export const Images = styled.Image`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}%;
  border-radius: ${RFValue(10)}px;
  margin: ${RFValue(100)}px;
`;

