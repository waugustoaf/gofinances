import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Container, Category, Icon } from './styles';

type CategorySelectProps = RectButton & {
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
