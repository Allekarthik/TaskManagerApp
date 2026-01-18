import React, { useContext, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { TaskContext } from './TaskContext';

export default function EditTaskScreen({ route, navigation }: any) {
  const { task } = route.params;
  const { tasks, setTasks } = useContext(TaskContext);
  const [title, setTitle] = useState(task.title);

  const saveTask = () => {
    setTasks(tasks.map(t =>
      t.id === task.id ? { ...t, title } : t
    ));
    navigation.goBack();
  };

  return (
    <View>
      <TextInput value={title} onChangeText={setTitle} />
      <Button title="Save" onPress={saveTask} />
    </View>
  );
}
