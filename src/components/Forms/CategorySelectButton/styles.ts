import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  margin-top: 16px;
  padding: 18px 16px;
  border-radius: 5px;

  background-color: ${props => props.theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;
`;

export const Category = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${props => props.theme.colors.text_dark};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${props => props.theme.colors.text};
`;
