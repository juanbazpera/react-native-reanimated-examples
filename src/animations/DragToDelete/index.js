import React, { useState, useCallback, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from './ListItem';

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];

const TASKS = TITLES.map((title, index) => ({ title, index }));

const BACKGROUND_COLOR = '#fafbff';

const DragToDelete = () => {
  const scrollRef = useRef();
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback(task => {
    setTasks(tasks => tasks.filter(item => item.index !== task.index));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <Text style={styles.title}>Tasks</Text>
      <ScrollView ref={scrollRef} style={styles.scrollStyle}>
        {tasks.map(task => (
          <ListItem
            key={task.index}
            task={task}
            onDismiss={onDismiss}
            simultaneousHandlers={scrollRef}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DragToDelete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%',
  },
  scrollStyle: {
    flex: 1,
  },
});
