import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const { width: PAGE_WIDTH } = Dimensions.get('window');

const Page = ({ title, index, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + pageOffset }],
  }));
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
        rStyle,
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 70,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
