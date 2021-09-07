import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { ICategoryDTO } from '../../dtos/ICategoryDTO';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import { CategorySelect } from '../CategorySelect';
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsTypes,
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const formSchema = Yup.object().shape({
  name: Yup.string().required('O nome deve ser informado.'),
  amount: Yup.number()
    .typeError('Informe um valor numérico.')
    .positive('O valor não pode ser negativo.')
    .required('O preço deve ser informado.'),
});

export const Register = () => {
  const [transactionType, setTransactionType] = useState<'' | 'up' | 'down'>(
    '',
  );
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState<ICategoryDTO>({
    color: '#fff',
    icon: 'any',
    key: 'category',
    name: 'Categoria',
  });

  const dataKey = '@gofinances:transactions';
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleSelectTransactionType = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  const toggleCategoryModalState = () => {
    setCategoryModalOpen(prevState => !prevState);
  };

  const handleRegister = async (data: FormData) => {
    if (!transactionType)
      return Alert.alert(
        'Preencha todos os campos',
        'Parece que você esqueceu de escolher o tipo da transação',
      );
    if (category.key === 'category')
      return Alert.alert(
        'Preencha todos os campos',
        'Parece que você esqueceu de escolher a categoria',
      );

    const newTransaction: ITransactionDTO = {
      category_key: category.key,
      date: new Date().toString(),
      title: data.name,
      amount: Number(data.amount),
      type: transactionType === 'down' ? 'negative' : 'positive',
      id: String(uuid.v4()),
    };

    try {
      const oldData = await AsyncStorage.getItem(dataKey);
      const oldTransactions: ITransactionDTO[] = JSON.parse(oldData) || [];
      const newTransactions = [...oldTransactions, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(newTransactions));
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Não foi possível salvar',
        'Houve um erro ao salvar sua transação.',
      );
      return;
    }

    setCategory({
      color: '#fff',
      icon: 'any',
      key: 'category',
      name: 'Categoria',
    });
    setTransactionType('');
    reset();

    navigation.navigate('Dashboard');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name='name'
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name='amount'
              placeholder='Preço'
              keyboardType='number-pad'
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title='Income'
                type='up'
                isActive={transactionType === 'up'}
                onPress={() => handleSelectTransactionType('up')}
              />
              <TransactionTypeButton
                title='Outcome'
                type='down'
                isActive={transactionType === 'down'}
                onPress={() => handleSelectTransactionType('down')}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={toggleCategoryModalState}
            />
          </Fields>

          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal
          visible={categoryModalOpen}
          onRequestClose={toggleCategoryModalState}
          animationType='slide'
        >
          <CategorySelect
            closeSelectCategory={toggleCategoryModalState}
            category={category}
            setCategory={setCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
