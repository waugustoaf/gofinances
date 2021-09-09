import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { ICategoryDTO } from '../../dtos/ICategoryDTO';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import { categories } from '../../utils/categories';
import { addMonths, subMonths, format } from 'date-fns';
import {
  ChartContainer,
  Container,
  Content,
  Header,
  LoadingView,
  Title,
  Warning,
  WarningText,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  WarningView,
} from './styles';
import { ptBR } from 'date-fns/locale';

interface ICategoryWithSum extends ICategoryDTO {
  total: number;
  totalFormatted: string;
  percentage: number;
  formattedPercentage: string;
}

export const Resume = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoriesWithSum, setCategoriesWithSum] = useState<
    ICategoryWithSum[]
  >([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const handleChangeDate = (action: 'next' | 'previous') => {
    if (action === 'next') {
      setSelectedDate(prevState => addMonths(prevState, 1));
    } else {
      setSelectedDate(prevState => subMonths(prevState, 1));
    }
  };

  const loadData = async () => {
    const dataKey = '@gofinances:transactions';
    const data = await AsyncStorage.getItem(dataKey);
    const formattedTransaction: ITransactionDTO[] = JSON.parse(data) || [];

    const expensiveTransactions = formattedTransaction.filter(
      transaction =>
        transaction.type === 'negative' &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear(),
    );

    const expensiveTotal = expensiveTransactions.reduce(
      (prevValue, currentTransaction) => {
        return prevValue + Number(currentTransaction.amount);
      },
      0,
    );

    const totalByCategory: ICategoryWithSum[] = [];

    categories.forEach(category => {
      const categorySum = expensiveTransactions.reduce(
        (prevValue, currentTransaction) => {
          const newValueToSum =
            currentTransaction.category_key === category.key
              ? Number(currentTransaction.amount)
              : 0;

          return prevValue + newValueToSum;
        },
        0,
      );

      const total = categorySum;
      const totalFormatted = total
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
        .replace('R$', '');

      const percentage = (categorySum / expensiveTotal) * 100;
      const formattedPercentage = `${percentage.toFixed(0)}%`;

      categorySum > 0 &&
        totalByCategory.push({
          ...category,
          total,
          totalFormatted,
          percentage,
          formattedPercentage,
        });
    });

    setCategoriesWithSum(totalByCategory);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      setSelectedDate(new Date());
    }, []),
  );

  const chartProps = useMemo(() => {
    return {
      values: categoriesWithSum.map(category => ({
        x: category.formattedPercentage,
        y: category.total,
      })),
      colors: categoriesWithSum.map(category => category.color),
    };
  }, [categoriesWithSum]);

  if (loading) {
    return (
      <LoadingView>
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </LoadingView>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {categoriesWithSum.length !== 0 ? (
        <Content>
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate('previous')}>
              <MonthSelectIcon name='chevron-left' />
            </MonthSelectButton>
            <Month>
              {format(selectedDate, 'MMMM, yyyy', {
                locale: ptBR,
              })}
            </Month>
            <MonthSelectButton onPress={() => handleChangeDate('next')}>
              <MonthSelectIcon name='chevron-right' />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie
              data={chartProps.values}
              colorScale={chartProps.colors}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={56}
            />
          </ChartContainer>

          {categoriesWithSum.map(category => (
            <HistoryCard
              key={category.key}
              color={category.color}
              amount={category.totalFormatted}
              title={category.name}
            />
          ))}
        </Content>
      ) : (
        <Warning>
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate('previous')}>
              <MonthSelectIcon name='chevron-left' />
            </MonthSelectButton>
            <Month>
              {format(selectedDate, 'MMMM, yyyy', {
                locale: ptBR,
              })}
            </Month>
            <MonthSelectButton onPress={() => handleChangeDate('next')}>
              <MonthSelectIcon name='chevron-right' />
            </MonthSelectButton>
          </MonthSelect>

          <WarningView>
            <WarningText>Nenhuma transação cadastrada</WarningText>
          </WarningView>
        </Warning>
      )}
    </Container>
  );
};
