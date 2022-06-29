/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Square from './Square';
import { N } from './constants';
import {
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';

const ClockLoader = () => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {new Array(N).fill(0).map((_, index) => (
        <Square key={index.toString()} progress={progress} index={index} />
      ))}
    </View>
  );
};

export default ClockLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
