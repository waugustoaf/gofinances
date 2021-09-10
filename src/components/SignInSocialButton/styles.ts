import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;
  background-color: ${props => props.theme.colors.shape};
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  width: ${RFValue(56)}px;
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  border-color: ${props => props.theme.colors.background};
  border-right-width: 1px;
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${props => props.theme.fonts.medium};
  padding: ${RFValue(14)}px;
`;
