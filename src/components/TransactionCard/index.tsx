import React from 'react';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface Data extends ITransactionDTO {}

interface Props {
  data: Data;
}

export const TransactionCard = ({
  data: { amount, category, date, title, type },
}: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
