import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // ✅ now it will find Login
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b0036',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});




