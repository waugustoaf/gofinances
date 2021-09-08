import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState, useMemo } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { ICategoryDTO } from '../../dtos/ICategoryDTO';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import {
  Container,
  Header,
  Content,
  Title,
  Warning,
  WarningText,
  ChartContainer,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

interface ICategoryWithSum extends ICategoryDTO {
  total: number;
  totalFormatted: string;
  percentage: number;
  formattedPercentage: string;
}

export const Resume = () => {
  const [categoriesWithSum, setCategoriesWithSum] = useState<
    ICategoryWithSum[]
  >([]);

  const theme = useTheme();

  const loadData = async () => {
    const dataKey = '@gofinances:transactions';
    const data = await AsyncStorage.getItem(dataKey);
    const formattedTransaction: ITransactionDTO[] = JSON.parse(data) || [];

    const expensiveTransactions = formattedTransaction.filter(
      transaction => transaction.type === 'negative',
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
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
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

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {categoriesWithSum.length !== 0 ? (
        <Content>
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
          <WarningText>Nenhuma transação cadastrada</WarningText>
        </Warning>
      )}
    </Container>
  );
};
