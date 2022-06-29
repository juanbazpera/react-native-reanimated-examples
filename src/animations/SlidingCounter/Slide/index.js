import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated/lib/reanimated2/core';
import Icon from 'react-native-vector-icons/AntDesign';

const ICON_SIZE = 20;
const SLIDE_WIDTH = 170;
const CIRCLE_WIDTH = 50;
const MAX_SLIDE_OFFSET = SLIDE_WIDTH / 2 - CIRCLE_WIDTH / 2;

const clamp = (value, min, max) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

const Slide = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount(count => count + 1);
  }, []);
  const decrementCount = useCallback(() => {
    setCount(count => count - 1);
  }, []);
  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const onPanGestureEvent = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = clamp(
        event.translationX,
        -MAX_SLIDE_OFFSET,
        MAX_SLIDE_OFFSET,
      );

      translateY.value = clamp(event.translationY, 0, MAX_SLIDE_OFFSET);
    },
    onEnd: () => {
      if (translateY.value === MAX_SLIDE_OFFSET) {
        runOnJS(resetCount)();
      } else if (translateX.value === MAX_SLIDE_OFFSET) {
        runOnJS(incrementCount)();
      } else if (translateX.value === -MAX_SLIDE_OFFSET) {
        runOnJS(decrementCount)();
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  }, []);

  const rCloseItemStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0, 1, 0],
    );
    return {
      opacity: opacityX,
    };
  }, []);

  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 1, 0.4],
    );
    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0],
    );
    return {
      opacity: opacityX * opacityY,
    };
  });

  const rSlideStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value * 0.1 },
        { translateY: translateY.value * 0.1 },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <Animated.View style={[styles.container, rSlideStyle]}>
        <Animated.View style={rPlusMinusIconStyle}>
          <Icon name="minus" size={ICON_SIZE} color="#fff" />
        </Animated.View>
        <Animated.View style={rCloseItemStyle}>
          <Icon name="close" size={ICON_SIZE} color="#fff" />
        </Animated.View>
        <Animated.View style={rPlusMinusIconStyle}>
          <Icon name="plus" size={ICON_SIZE} color="#fff" />
        </Animated.View>
        <View style={styles.circleContainer}>
          <PanGestureHandler onGestureEvent={onPanGestureEvent}>
            <Animated.View style={[styles.circle, rStyle]}>
              <Text style={styles.text}>{count}</Text>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 170,
    backgroundColor: '#111111',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    height: CIRCLE_WIDTH,
    width: CIRCLE_WIDTH,
    backgroundColor: '#232323',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
