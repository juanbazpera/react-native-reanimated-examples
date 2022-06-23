import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated/lib/reanimated2/core';

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;

const ListItem = ({ task, onDismiss, simultaneousHandlers }) => {
  const translationX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacityContainer = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: event => {
      translationX.value = event.translationX;
    },
    onEnd: () => {
      const sholdBeDismissed = translationX.value < -TRANSLATE_X_THRESHOLD;
      if (sholdBeDismissed) {
        translationX.value = withSpring(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacityContainer.value = withTiming(0, undefined, isFinish => {
          if (isFinish && onDismiss) {
            // To run a function in javascript thread
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translationX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translationX.value < -TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return {
      opacity,
    };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacityContainer.value,
    };
  });

  return (
    <Animated.View style={[styles.container, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <Icon
          name="trash"
          size={LIST_ITEM_HEIGHT * 0.5}
          color="rgba(256,0,0,0.6)"
        />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.title}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  task: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    backgroundColor: 'white',
    paddingLeft: 20,
    borderRadius: 10,
    justifyContent: 'center',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    width: LIST_ITEM_HEIGHT,
    height: LIST_ITEM_HEIGHT,
    right: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
