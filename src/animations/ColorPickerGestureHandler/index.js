/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ColorPicker from './ColorPicker';

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const width = Dimensions.get('window').width * 0.9;
const PICKER_WIDTH = width;
const CIRCLE_SIZE = width * 0.8;

const ColorPickerGestureHandler = () => {
  const pickedColor = useSharedValue(COLORS[0]);

  const rStyle = useAnimatedStyle(() => ({
    backgroundColor: pickedColor.value,
  }));

  const onColorChange = useCallback(color => {
    'worklet';
    pickedColor.value = color;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          style={styles.colorPicker}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          maxWidth={PICKER_WIDTH}
          onColorChange={onColorChange}
        />
      </View>
    </View>
  );
};

export default ColorPickerGestureHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: 'red',
    borderRadius: CIRCLE_SIZE / 2,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  colorPicker: {
    width: PICKER_WIDTH,
    height: 40,
    borderRadius: 20,
  },
});
