import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Basic from './animations/Basic';
import PanGesture from './animations/PanGesture';
import ScrollView from './animations/ScrollViewFromScratch';
import InterpolateColor from './animations/InterpolateColor';
import CircleAnimationProps from './animations/CircleAnimationProps';
import SwipeToDelete from './animations/SwipeToDelete';
import RippleButton from './animations/RippleButton';
import PerspectiveMenu from './animations/PerspectiveMenu';
import SlidingCounter from './animations/SlidingCounter';
import ClockLoader from './animations/ClockLoader';
import LayoutAnimation from './animations/LayoutAnimation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          options={{ title: 'Animations' }}
          name="home"
          component={Home}
        />
        <Stack.Screen
          options={{ title: 'Basic' }}
          name="basic"
          component={Basic}
        />
        <Stack.Screen
          options={{ title: 'PanGestureHandler' }}
          name="panGestureHandler"
          component={PanGesture}
        />
        <Stack.Screen
          options={{ title: 'ScrollView' }}
          name="scrollView"
          component={ScrollView}
        />
        <Stack.Screen
          options={{ title: 'Interpolate Colors' }}
          name="colors"
          component={InterpolateColor}
        />
        <Stack.Screen
          options={{ title: 'Circular Progress Bar' }}
          name="progress"
          component={CircleAnimationProps}
        />
        <Stack.Screen
          options={{ title: 'Swipe to delete' }}
          name="swipeToDelete"
          component={SwipeToDelete}
        />
        <Stack.Screen
          options={{ title: 'Ripple' }}
          name="ripple"
          component={RippleButton}
        />
        <Stack.Screen
          options={{ title: 'Perspective Menu', headerShown: false }}
          name="perspectiveMenu"
          component={PerspectiveMenu}
        />
        <Stack.Screen
          options={{ title: 'Sliding Counter', headerShown: false }}
          name="slidingCounter"
          component={SlidingCounter}
        />
        <Stack.Screen
          options={{ title: 'Clock Loader', headerShown: false }}
          name="clock"
          component={ClockLoader}
        />
        <Stack.Screen
          options={{ title: 'Layout Animation' }}
          name="layout"
          component={LayoutAnimation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
