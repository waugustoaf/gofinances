import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { ICategoryDTO } from '../../dtos/ICategoryDTO';
import { Feather } from '@expo/vector-icons';

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  background-color: ${props => props.theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const List = styled(FlatList as new () => FlatList<ICategoryDTO>)`
  flex: 1;
  width: 100%;
`;

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${props =>
    props.isActive ? props.theme.colors.secondary_light : 'transparent'};
`;

export const Icon = styled(Feather)``;

export const Name = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  margin-left: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
