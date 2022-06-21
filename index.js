/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App';
// import Basic from './src/animations/Basic';
// import PanGesture from './src/animations/PanGesture';
// import InterpolateScrollView from './src/animations/InterpolateScrollView';
// import InterpolateColor from './src/animations/InterpolateColor';
// import PinchGestureHandler from './src/animations/PinchGestureHandler';
// import DoubleTap from './src/animations/DoubleTap';
import ScrollViewFromScratch from './src/animations/ScrollViewFromScratch';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => ScrollViewFromScratch);
