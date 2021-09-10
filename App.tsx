import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { CustomThemeProvider, theme } from './src/global/styles/theme';
import { HooksProvider } from './src/hooks';
import { Routes } from './src/routes';
import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <CustomThemeProvider>
      <HooksProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor={theme.colors.primary}
        />
        <Routes />
      </HooksProvider>
    </CustomThemeProvider>
  );
}
