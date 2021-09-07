import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import React, { useState, useCallback, useMemo } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LogoutButton,
  Photo,
  Title,
  Transactions,
  TransactionsList,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles';

interface CardProps {
  entries: string;
  expensive: string;
  total: string;
}

export const Dashboard = () => {
  const [transactions, setTransaction] = useState<ITransactionDTO[]>([]);
  const [cardsProps, setCardsProps] = useState<CardProps>({
    entries: 'R$ 0,00',
    expensive: 'R$ 0,00',
    total: 'R$ 0,00',
  });

  const formatCurrency = useCallback((value: number) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }, []);

  const loadTransactions = useCallback(async () => {
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const typedDate: ITransactionDTO[] = JSON.parse(data) || [];
    const formattedData = typedDate.map(transaction => {
      const amount = formatCurrency(Number(transaction.amount));

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(transaction.date));

      const category = categories.find(
        category => category.key === transaction.category_key,
      );

      return {
        ...transaction,
        date,
        amount,
        category,
      };
    });

    const entriesValue = typedDate.reduce((prevValue, currentValue) => {
      return (
        Number(currentValue.type === 'positive' ? currentValue.amount : 0) +
        prevValue
      );
    }, 0);

    const expensiveValue = typedDate.reduce((prevValue, currentValue) => {
      return (
        Number(currentValue.type === 'negative' ? currentValue.amount : 0) +
        prevValue
      );
    }, 0);

    const totalValue = entriesValue - expensiveValue;

    setCardsProps({
      entries: formatCurrency(entriesValue),
      expensive: formatCurrency(expensiveValue),
      total:
        totalValue < 0
          ? `- ${formatCurrency(totalValue)}`
          : formatCurrency(totalValue),
    });

    setTransaction(formattedData);
  }, []);

  useFocusEffect(() => {
    (async () => {
      await loadTransactions();
    })();
  });

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/waugustoaf.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Walther</UserName>
            </User>
          </UserInfo>
          <LogoutButton activeOpacity={0.7}>
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount={cardsProps.entries}
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount={cardsProps.expensive}
          lastTransaction='Última entrada dia 03 de abril'
        />
        <HighlightCard
          type='total'
          title='Total'
          amount={cardsProps.total}
          lastTransaction='01 a 16 de abril'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={transactions}
          renderItem={({ item }) => <TransactionCard data={item} />}
          keyExtractor={item => item.id}
        />
      </Transactions>
    </Container>
  );
};
