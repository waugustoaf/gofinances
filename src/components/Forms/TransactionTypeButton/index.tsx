import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Icon, Title, BorderView } from './styles';

type TransactionTypeButtonProps = RectButtonProps & {
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
      <BorderView isActive={isActive}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </BorderView>
    </Container>
  );
};
