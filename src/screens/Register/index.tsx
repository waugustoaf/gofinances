import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { ICategoryDTO } from '../../dtos/ICategoryDTO';
import { CategorySelect } from '../CategorySelect';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState<ICategoryDTO>({
    color: '#fff',
    icon: 'any',
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleSelectTransactionType = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  const toggleCategoryModalState = () => {
    setCategoryModalOpen(prevState => !prevState);
  };

  const handleRegister = (data: FormData) => {
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

    const dataObject = { ...data, transactionType, category: category.key };

    console.log(dataObject);
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
