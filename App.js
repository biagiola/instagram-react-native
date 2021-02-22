import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header/Header';

import Posts from './components/Posts/Posts';

export default function App() {
  return (
    <View>
      <View style={styles.container}>
        <Header />
        <Posts/>
        <StatusBar style="light" backgroundColor="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fafafa',
    paddingBottom: 70
  }
});
