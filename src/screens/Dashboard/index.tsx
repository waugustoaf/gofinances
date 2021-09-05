import React from 'react';
import { TouchableOpacity } from 'react-native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import {
  Container,
  Header,
  HighlightCards,
  Icon,
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

export const Dashboard = () => {
  const data: ITransactionDTO[] = [
    {
      id: '1',
      type: 'positive',
      amount: 'R$ 12.000,00',
      title: 'Desenvolvimento de site',
      category: { icon: 'dollar-sign', name: 'Vendas' },
      date: '13/04/2021',
    },
    {
      id: '2',
      type: 'negative',
      amount: 'R$ 59,00',
      title: 'Hamburgueria Pizzy',
      category: { icon: 'coffee', name: 'Alimentação' },
      date: '10/04/2021',
    },
    {
      id: '3',
      type: 'negative',
      amount: 'R$ 1.200,00',
      title: 'Aluguel do apartamento',
      category: { icon: 'shopping-bag', name: 'Casa' },
      date: '10/04/2021',
    },
  ];

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
          <TouchableOpacity activeOpacity={0.7}>
            <Icon name='power' />
          </TouchableOpacity>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última entrada dia 03 de abril'
        />
        <HighlightCard
          type='total'
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 a 16 de abril'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
          keyExtractor={item => item.id}
        />
      </Transactions>
    </Container>
  );
};
