import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

const LIST_ITEM_COLOR = '#1798DE';

const LayoutAnimation = () => {
  const [items, setItems] = useState([]);

  const onDelete = useCallback(id => {
    setItems(current => {
      return current.filter(item => item.id !== id);
    });
  }, []);

  const onAdd = useCallback(() => {
    setItems(current => {
      const nextId = (current[current.length - 1]?.id ?? 0) + 1;
      return [...current, { id: nextId }];
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 50 }}>
        {items.map((item, index) => (
          <Animated.View
            entering={FadeIn.delay(100 * index)}
            key={item.id.toString()}
            onTouchEnd={() => onDelete(item.id)}
            exiting={FadeOut}
            layout={Layout.delay(50)}
            style={styles.listItem}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.floatingBtn} onPress={onAdd}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LayoutAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 30,
  },
  floatingBtn: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'black',
    borderRadius: 40,
    position: 'absolute',
    bottom: 50,
    right: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: 'white',
    fontSize: 40,
  },
});
