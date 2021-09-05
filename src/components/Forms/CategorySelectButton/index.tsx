import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Category, Icon } from './styles';

type CategorySelectProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
  title: string;
};

export const CategorySelectButton = ({
  title,
  ...rest
}: CategorySelectProps) => {
  return (
    <Container {...rest}>
      <Category>{title}</Category>
      <Icon name='chevron-down' />
    </Container>
  );
};
