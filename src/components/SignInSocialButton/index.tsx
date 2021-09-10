import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { Container, Button, ImageContainer, Text } from './styles';

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInSocialButton = ({
  title,
  svg: Svg,
  ...rest
}: SignInSocialButtonProps) => {
  return (
    <Container>
      <Button {...rest}>
        <ImageContainer>
          <Svg />
        </ImageContainer>

        <Text>{title}</Text>
      </Button>
    </Container>
  );
};
