import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import imageSource from './assets/image.jpeg';

const { width, height } = Dimensions.get('window');

const PinchGestureHandlerApp = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { translateX: -width / 2 },
      { translateY: -height / 2 },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
      { translateX: width / 2 },
      { translateY: height / 2 },
    ],
  }));

  const focalPointStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
  }));

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{ flex: 1 }}>
        <Animated.Image
          style={[{ width, height }, rStyle]}
          resizeMode="stretch"
          source={imageSource}
        />
        <Animated.View style={[styles.focalPoint, focalPointStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default PinchGestureHandlerApp;

const styles = StyleSheet.create({
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
});
