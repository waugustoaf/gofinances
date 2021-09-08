import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;

  background-color: ${props => props.theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;

  padding: 13px 24px;

  border-radius: 5px;
  border-left-width: 4px;
  border-left-color: ${props => props.color};

  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.View`
  flex-direction: row;
`;

export const AmountPrefix = styled.Text`
  font-family: ${props => props.theme.fonts.medium};
  font-size: ${RFValue(15)}px;
`;

export const AmountValue = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  margin-left: 2px;
`;
