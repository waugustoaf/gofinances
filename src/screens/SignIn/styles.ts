import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${props => props.theme.colors.primary};

  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.medium};
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(30)}px;
  text-align: center;
`;

export const SignInTitle = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(16)}px;
  text-align: center;
  margin-bottom: 67px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;
  background-color: ${props => props.theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
  align-items: center;
  justify-content: space-between;
`;
