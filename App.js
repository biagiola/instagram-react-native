import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/header';
import Stories from './components/stories';
import Posts from './components/Posts';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Stories />
      <Posts/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa',
  },
});
