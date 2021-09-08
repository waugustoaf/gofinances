import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import React, { useState, useCallback, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LoadingView,
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

interface CardItemProps {
  amount: string;
  lastTransaction: string;
}
interface CardProps {
  entries: CardItemProps;
  expensive: CardItemProps;
  total: CardItemProps;
}

export const Dashboard = () => {
  const [transactions, setTransaction] = useState<ITransactionDTO[]>([]);
  const [cardsProps, setCardsProps] = useState<CardProps>({
    entries: {
      amount: 'R$ 0,00',
      lastTransaction: '',
    },
    expensive: {
      amount: 'R$ 0,00',
      lastTransaction: '',
    },
    total: {
      amount: 'R$ 0,00',
      lastTransaction: '',
    },
  });
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const formatCurrency = useCallback((value: number) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }, []);

  const getLastLastTransactionDate = (
    collection: ITransactionDTO[],
    type: 'positive' | 'negative',
  ) => {
    const lastTransactionDate = new Date(
      Math.max.apply(
        Math,
        collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime()),
      ),
    );

    return `${String(lastTransactionDate.getDate()).padStart(
      2,
      '0',
    )} de ${lastTransactionDate.toLocaleString('pt-BR', {
      month: 'long',
    })}`;
  };

  const loadTransactions = async () => {
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

    const stringValues = {
      entry: formatCurrency(entriesValue),
      expensive: formatCurrency(expensiveValue),
      total: formatCurrency(totalValue),
    };

    const lastTransactionsEntry = getLastLastTransactionDate(
      typedDate,
      'positive',
    );
    const lastTransactionsExpensive = getLastLastTransactionDate(
      typedDate,
      'positive',
    );
    const totalInterval = `01 a ${lastTransactionsExpensive}`;

    setCardsProps({
      entries: {
        amount: stringValues.entry,
        lastTransaction: lastTransactionsEntry,
      },
      expensive: {
        amount: stringValues.expensive,
        lastTransaction: lastTransactionsExpensive,
      },
      total: {
        amount: totalValue < 0 ? `- ${stringValues.total}` : stringValues.total,
        lastTransaction: totalInterval,
      },
    });
    setTransaction(formattedData);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  if (loading) {
    return (
      <LoadingView>
        <ActivityIndicator color={theme.colors.primary} size='large' />
      </LoadingView>
    );
  }

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
          amount={cardsProps.entries.amount}
          lastTransaction={`Última entrada dia ${cardsProps.entries.lastTransaction}`}
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount={cardsProps.expensive.amount}
          lastTransaction={`Última saída dia ${cardsProps.expensive.lastTransaction}`}
        />
        <HighlightCard
          type='total'
          title='Total'
          amount={cardsProps.total.amount}
          lastTransaction={`${cardsProps.total.lastTransaction}`}
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
