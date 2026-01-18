import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useTasks, Category } from './TaskContext';
import { useRoute } from '@react-navigation/native';


type Filter = 'All' | 'Pending' | 'Completed' | Category;

const categoryIcon: Record<Category, string> = {
  Work: '💼',
  Personal: '🏠',
  Birthday: '🎂',
};

export default function TaskListScreen() {
  const { tasks, addTask, toggleTask } = useTasks();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Work');
  const [filter, setFilter] = useState<Filter>('All');

  const route = useRoute<any>();
const selectedDate =
  route.params?.selectedDate ??
  new Date().toISOString().split('T')[0];

  // 🔹 Filtering logic
  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'Pending') return !task.completed;
      if (filter === 'Completed') return task.completed;
      if (filter === 'All') return true;
      return task.category === filter;
    })
    .sort((a, b) => Number(a.completed) - Number(b.completed)); // completed at bottom

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>

      {/* 🔹 Task input */}
      <TextInput
        placeholder="What do you need to do?"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* 🔹 Category selector */}
      <View style={styles.row}>
        {(['Work', 'Personal', 'Birthday'] as Category[]).map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              styles.chip,
              category === cat && styles.chipActive,
            ]}
          >
            <Text style={category === cat ? styles.chipTextActive : styles.chipText}>
              {categoryIcon[cat]} {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔹 Add Task Button */}
      <TouchableOpacity
        style={[
          styles.addBtn,
          !title.trim() && styles.disabledBtn,
        ]}
        disabled={!title.trim()}
        onPress={() => {
addTask(title, category, selectedDate);
          setTitle('');
        }}
      >
        <Text style={styles.addBtnText}>➕ Add Task</Text>
      </TouchableOpacity>

      {/* 🔹 Filter bar */}
<View style={styles.filterRow}>
  {(['All', 'Pending', 'Completed'] as Filter[]).map(f => (
    <TouchableOpacity
      key={f}
      onPress={() => setFilter(f)}
      style={[
        styles.filterBox,
        filter === f && styles.filterBoxActive,
      ]}
    >
      <Text
        style={[
          styles.filterText,
          filter === f && styles.filterTextActive,
        ]}
      >
        {f}
      </Text>
    </TouchableOpacity>
  ))}
</View>



      {/* 🔹 Empty State */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyText}>No tasks here</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={i => i.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.taskRow}
              onPress={() => toggleTask(item.id)}
            >
              <View
                style={[
                  styles.dot,
                  item.completed && styles.dotCompleted,
                ]}
              />

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.taskTitle,
                    item.completed && styles.completedTask,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.categoryText}>
                  {categoryIcon[item.category]} {item.category}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
filterRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
  marginVertical: 14,
},

filterBox: {
  paddingHorizontal: 18,
  paddingVertical: 8,
  borderRadius: 10,
  backgroundColor: '#f2f2f2',
},

filterBoxActive: {
  backgroundColor: '#e0f3e8',
},

filterText: {
  fontSize: 16,          // 🔹 increased text size
  color: '#555',
  fontWeight: '500',
},

filterTextActive: {
  color: '#2e7d32',
  fontWeight: '700',
},



  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
  },

  chipActive: {
    backgroundColor: '#e0f3e8',
  },

  chipText: {
    color: '#555',
  },

  chipTextActive: {
    color: '#2e7d32',
    fontWeight: '600',
  },

  addBtn: {
    backgroundColor: '#4CAF50',
    padding: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 14,
  },

  disabledBtn: {
    backgroundColor: '#a5d6a7',
  },

  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  active: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },

  inactive: {
    color: 'gray',
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },




  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#bbb',
    marginRight: 14,
  },

  dotCompleted: {
    backgroundColor: '#4CAF50',
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },

  categoryText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },

  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
    opacity: 0.6,
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },

  emptyIcon: {
    fontSize: 48,
  },

  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});
