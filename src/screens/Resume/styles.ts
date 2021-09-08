import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${props => props.theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${props => props.theme.colors.shape};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
  },
})`
  flex: 1;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
  margin: 0 auto;
`;

export const Warning = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export const WarningText = styled.Text`
  font-family: ${props => props.theme.fonts.medium};
  font-size: ${RFValue(16)}px;
`;
