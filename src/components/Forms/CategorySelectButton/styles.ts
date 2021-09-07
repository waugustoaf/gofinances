import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
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
