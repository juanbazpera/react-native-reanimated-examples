import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './components/Page';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

const App = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      style={styles.container}
      pagingEnabled
      horizontal
      onScroll={scrollHandler}>
      {WORDS.map((title, index) => (
        <Page
          key={index.toString()}
          index={index}
          title={title}
          translateX={translateX}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
