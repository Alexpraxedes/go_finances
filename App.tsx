import React from 'react'; // Importing React
import AppLoading from 'expo-app-loading'; // Importing the AppLoading component from expo-app-loading
import { ThemeProvider } from 'styled-components'; // ThemeProvider is a component that allows us to pass a theme to all styled components in our application

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'; // Importing the fonts

import theme from './src/global/styles/theme'; // Importing the theme object
import { Dashboard } from './src/screens/Dashboard'; // Importing the Dashboard component

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold 
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
