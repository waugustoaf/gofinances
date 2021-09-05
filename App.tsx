import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { CustomThemeProvider } from './src/global/styles/theme';
import { Register } from './src/screens/Register';

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
      <Register />
    </CustomThemeProvider>
  );
}
