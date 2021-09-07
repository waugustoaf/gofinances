import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Category, Container, Icon } from './styles';

type CategorySelectProps = TouchableOpacityProps & {
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
