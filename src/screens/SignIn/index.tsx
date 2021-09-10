import React from 'react';
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';
import AppleSvg from '../../assets/apple-icon.svg';
import GoogleSvg from '../../assets/google-icon.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';

export const SignIn = () => {
  const { signInWithGoogle, signInWithApple, loading } = useAuth();
  const theme = useTheme();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Não foi possível acessar sua conta!',
        'Houve um erro ao tentar buscar suas informações nos servidores Google.',
      );
    }
  };

  const handleSignInWithApple = async () => {
    await signInWithApple();
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas{'\n'} finanças de forma{'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            svg={GoogleSvg}
            title='Entrar com Google'
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              svg={AppleSvg}
              title='Entrar com Apple'
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {loading && (
          <ActivityIndicator size='large' color={theme.colors.shape} />
        )}
      </Footer>
    </Container>
  );
};
