import styled from 'styled-components/native';


export const Container = styled.View`
flex:1;
justify-content:center;
align-Items:center;
`

export const Close = styled.TouchableOpacity`
width:40px;
height:40px;
background-color: ${({ theme }): any => theme.colors.secondary};
border-radius:15px;
marginBottom:15px;
`



