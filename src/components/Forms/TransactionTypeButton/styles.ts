import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface TypeProps {
  type: 'up' | 'down';
}

interface TransactionTypeProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<TransactionTypeProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: ${props => (props.isActive ? 0 : 1.5)}px solid
    ${props => props.theme.colors.text};

  padding: 16px;
  border-radius: 5px;

  ${props =>
    props.isActive &&
    props.type === 'up' &&
    css`
      background-color: ${props.theme.colors.success_light};
    `}

  ${props =>
    props.isActive &&
    props.type === 'down' &&
    css`
      background-color: ${props.theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;

  color: ${props =>
    props.type === 'up'
      ? props.theme.colors.success
      : props.theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${props => props.theme.fonts.regular};
  margin-left: 12px;
`;
