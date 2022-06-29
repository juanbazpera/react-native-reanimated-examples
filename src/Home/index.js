import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Basic"
          onPress={() => {
            navigate('basic');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="PanGestureHandler"
          onPress={() => {
            navigate('panGestureHandler');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="ScrollView from Scratch"
          onPress={() => {
            navigate('scrollView');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Interpolate colors"
          onPress={() => {
            navigate('colors');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Circular Progress Bar"
          onPress={() => {
            navigate('progress');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Swipe to delete"
          onPress={() => {
            navigate('swipeToDelete');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Ripple Button"
          onPress={() => {
            navigate('ripple');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Perspective Menu"
          onPress={() => {
            navigate('perspectiveMenu');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Sliding Counter"
          onPress={() => {
            navigate('slidingCounter');
          }}
        />
      </View>
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
  buttonContainer: {
    marginTop: 10,
  },
});
