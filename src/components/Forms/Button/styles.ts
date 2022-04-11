import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
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

export const Title = styled.Text`
color: ${(props) => (props.button ? "red" : "#ffff")};
font-size: ${RFValue(15)}px;

`;