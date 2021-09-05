import React from 'react';
import { TextInputProps } from 'react-native';
import { Input } from '../Input';
import { Container, Error } from './styles';
import { Control, Controller } from 'react-hook-form';

type InputFormProps = TextInputProps & {
  control: Control;
  name: string;
  error?: string;
};

export const InputForm = ({
  control,
  name,
  error,
  ...rest
}: InputFormProps) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};
