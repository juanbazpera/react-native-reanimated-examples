import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        title="Basic"
        onPress={() => {
          navigate('basic');
        }}
      />
      <Button
        title="PanGestureHandler"
        onPress={() => {
          navigate('panGestureHandler');
        }}
      />
      <Button
        title="ScrollView from Scratch"
        onPress={() => {
          navigate('scrollView');
        }}
      />
      <Button
        title="Interpolate colors"
        onPress={() => {
          navigate('colors');
        }}
      />
      <Button
        title="Circular Progress Bar"
        onPress={() => {
          navigate('progress');
        }}
      />
      <Button
        title="Swipe to delete"
        onPress={() => {
          navigate('swipeToDelete');
        }}
      />
      <Button
        title="Ripple Button"
        onPress={() => {
          navigate('ripple');
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
});
