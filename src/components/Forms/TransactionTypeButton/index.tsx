import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from './styles';

type TransactionTypeButtonProps = TouchableOpacityProps & {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
};

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export const TransactionTypeButton = ({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) => {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};