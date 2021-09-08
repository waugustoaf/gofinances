import React from 'react';
import { Container, Title, Amount, AmountPrefix, AmountValue } from './styles';

interface HistoryCardProps {
  title: string;
  color: string;
  amount: string;
}

export const HistoryCard = ({ amount, color, title }: HistoryCardProps) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>
        <AmountPrefix>R$</AmountPrefix>
        <AmountValue>{amount}</AmountValue>
      </Amount>
    </Container>
  );
};
