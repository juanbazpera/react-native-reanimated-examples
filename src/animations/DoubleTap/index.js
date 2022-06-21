/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

const DoubleTap = () => {
  const doubleTapRef = useRef();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isfinished => {
      if (isfinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const onSingleTap = useCallback(() => {
    opacity.value = withSpring(0, undefined, isFinished => {
      if (isFinished) {
        opacity.value = withDelay(500, withSpring(1));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <TapGestureHandler
          maxDelayMs={250} // Wait for second tap
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}>
          <Animated.View>
            <ImageBackground
              style={styles.image}
              source={require('./assets/image.jpeg')}>
              <Animated.Image
                style={[styles.image, styles.like, heartStyle]}
                resizeMode="center"
                source={require('./assets/like.png')}
              />
            </ImageBackground>
            <Animated.Text style={[styles.text, textStyle]}>
              🐢🐢🐢🐢
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default DoubleTap;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width,
    height: width,
  },
  like: {
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 35,
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
  },
});
