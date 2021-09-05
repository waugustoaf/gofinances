import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { FlatList, Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background: ${props => props.theme.colors.primary};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${props => props.theme.colors.secondary};
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: ${Platform.OS === 'android'
    ? RFValue(44)
    : getStatusBarHeight() + RFValue(28)}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${props => props.theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${props => props.theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24 },
})`
  width: 100%;

  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.regular};
  margin-bottom: 16px;
`;

export const TransactionsList = styled(
  FlatList as new () => FlatList<ITransactionDTO>,
).attrs({
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 8,
  },
  showsVerticalScrollIndicator: false,
})``;
