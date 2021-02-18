import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/header';

import Posts from './components/Posts';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style={{ color: '#212121'}} />
      <Header />
      <Posts/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fafafa',
  },
});
