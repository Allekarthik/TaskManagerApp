import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTasks } from './TaskContext';

export default function AddTaskScreen() {
  const { addTask } = useTasks();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [title, setTitle] = useState('');
  const date = route.params?.selectedDate;

  const saveTask = () => {
    if (!title) return;

    addTask({
      id: Date.now(),
      title,
      category: 'personal',
      date,
      completed: false,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>

      <TextInput
        placeholder="Task title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.date}>📅 {date}</Text>

      <TouchableOpacity style={styles.btn} onPress={saveTask}>
        <Text style={styles.btnText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}
