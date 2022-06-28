import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Ripple from './Ripple';

const RippleButton = () => {
  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple} onTap={() => console.log('Tap')}>
        <Text style={styles.text}>Tap</Text>
      </Ripple>
    </View>
  );
};

export default RippleButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    elevation: 2,
  },
  text: {
    fontSize: 25,
  },
});
