import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <MainApp />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme } = useTheme();
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}


