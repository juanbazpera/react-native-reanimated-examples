import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

const ColorPicker = ({
  colors,
  style,
  start,
  end,
  maxWidth,
  onColorChange,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(0, translateX.value),
      maxWidth - CIRCLE_PICKER_SIZE,
    );
  }, [translateX]);

  const onEnd = useCallback(() => {
    'worklet';
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  }, []);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.translateX = adjustedTranslateX.value;

      // It's already in tapGestureEvent
      // translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      // scale.value = withSpring(1.2);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd,
  });

  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: event => {
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
      translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE);
    },
    onEnd,
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: adjustedTranslateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      colors.map((_, index) => ((index + 1) / colors.length) * maxWidth),
      // [
      //   // Because there is 9 colors con colors
      //   (1 / 9) * maxWidth,
      //   (2 / 9) * maxWidth,
      //   (3 / 9) * maxWidth,
      //   (4 / 9) * maxWidth,
      //   (5 / 9) * maxWidth,
      //   (6 / 9) * maxWidth,
      //   (7 / 9) * maxWidth,
      //   (8 / 9) * maxWidth,
      //   maxWidth,
      // ],
      colors,
    );

    onColorChange?.(backgroundColor);

    return {
      backgroundColor,
    };
  }, [adjustedTranslateX, maxWidth]);

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={styles.container}>
            <LinearGradient
              colors={colors}
              style={style}
              start={start}
              end={end}
            />
            <Animated.View style={[styles.picker, rStyle]}>
              <Animated.View
                style={[styles.internalPicker, rInternalPickerStyle]}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  picker: {
    position: 'absolute',
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    backgroundColor: '#FFF',
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalPicker: {
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1.0,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
  },
});

export default ColorPicker;
