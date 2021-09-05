import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { ICategoryDTO } from '../../dtos/ICategoryDTO';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  List,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

interface CategorySelectProps {
  category: ICategoryDTO;
  setCategory: (category: ICategoryDTO) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) => {
  const [currentCategory, setCurrentCategory] =
    useState<ICategoryDTO>(category);

  const handleReturn = () => {
    if (currentCategory.key !== 'category') {
      setCategory(currentCategory);
    }

    closeSelectCategory();
  };

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <List
        data={categories}
        renderItem={({ item }) => (
          <Category
            onPress={() => setCurrentCategory(item)}
            isActive={item.key === currentCategory.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title='Selecionar' onPress={handleReturn} />
      </Footer>
    </Container>
  );
};
