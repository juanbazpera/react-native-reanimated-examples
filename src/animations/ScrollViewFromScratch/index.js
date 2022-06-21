import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import Page from './Page';

const titles = ["What's", 'up', 'mobile', 'devs?'];
const { width: PAGE_WIDTH } = Dimensions.get('window');

const ScrollViewFromScratch = () => {
  const translateX = useSharedValue(0);

  const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  }, [translateX]);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.translateX = clampedTranslateX.value;
      // TODO: We need to stop the previous animation, when we scroll a lot
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd: event => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.animatedView]}>
          {titles.map((title, index) => (
            <Page
              key={index.toString()}
              translateX={clampedTranslateX}
              index={index}
              title={title}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ScrollViewFromScratch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animatedView: {
    flex: 1,
    flexDirection: 'row',
  },
});
