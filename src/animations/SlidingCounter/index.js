import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slide from './Slide';

const SlidingCounter = () => {
  return (
    <View style={styles.container}>
      <Slide />
    </View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
