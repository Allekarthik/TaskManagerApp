import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from './TaskContext';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CATEGORY_META: any = {
  Work: { icon: '💼', color: '#2196F3' },
  Personal: { icon: '🏠', color: '#4CAF50' },
  Birthday: { icon: '🎂', color: '#9C27B0' },
};

export default function CalendarScreen() {
  const { tasks } = useTasks();
  const navigation = useNavigation<any>();

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const tasksForDate = tasks.filter(t => t.date === selectedDate);

  const changeMonth = (direction: number) => {
    Animated.timing(slideAnim, {
      toValue: direction * -60,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentDate(new Date(year, month + direction, 1));
      slideAnim.setValue(0);
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.arrow}>‹</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.month}>
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
          </Text>
          <Text style={styles.subText}>
            {tasksForDate.length} task(s) on selected day
          </Text>
        </View>

        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* WEEK DAYS */}
      <View style={styles.weekRow}>
        {days.map(d => (
          <Text key={d} style={styles.weekDay}>{d}</Text>
        ))}
      </View>

      {/* CALENDAR GRID */}
      <Animated.View
        style={[
          styles.calendar,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        {[...Array(firstDay)].map((_, i) => (
          <View key={`empty-${i}`} style={styles.dateCell} />
        ))}

        {[...Array(totalDays)].map((_, i) => {
          const day = i + 1;
          const dateStr = new Date(year, month, day)
            .toISOString()
            .split('T')[0];

          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;

          const dayTasks = tasks.filter(t => t.date === dateStr);

          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.dateCell,
                isSelected && styles.selectedDate,
                isToday && styles.todayBorder,
              ]}
              onPress={() => setSelectedDate(dateStr)}
              onLongPress={() =>
                navigation.navigate('Tasks', { selectedDate: dateStr })
              }
            >
              <Text style={isSelected && styles.selectedText}>{day}</Text>

              <View style={styles.iconRow}>
                {dayTasks.slice(0, 3).map((t, idx) => (
                  <Text key={idx} style={styles.icon}>
                    {CATEGORY_META[t.category]?.icon}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* TASK LIST */}
      <FlatList
        data={tasksForDate}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.noTask}>📅 No tasks for this day</Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskCard,
              { borderLeftColor: CATEGORY_META[item.category]?.color },
            ]}
          >
            <Text style={styles.taskText}>
              {CATEGORY_META[item.category]?.icon} {item.title}
            </Text>
          </View>
        )}
      />

      {/* FLOATING + BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate('Tasks', { selectedDate })
        }
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 16 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  month: { fontSize: 20, fontWeight: 'bold' ,color: '#4CAF50' },
  subText: { fontSize: 12, color: '#777', textAlign: 'center' },

  arrow: { fontSize: 28 },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  weekDay: {
    width: '14%',
    textAlign: 'center',
    color: '#4CAF50',
  },

  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },

  dateCell: {
    width: '14%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 10,
  },

  selectedDate: { backgroundColor: '#4CAF50' },

  todayBorder: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },

  selectedText: { color: '#fff', fontWeight: 'bold' },

  iconRow: {
    flexDirection: 'row',
    marginTop: 2,
  },

  icon: { fontSize: 10, marginHorizontal: 1 },

  taskCard: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    borderLeftWidth: 5,
  },

  taskText: { fontSize: 16 },

  noTask: {
    textAlign: 'center',
    marginTop: 10,
    color: '#777',
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#4CAF50',
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  fabText: { fontSize: 30, color: '#fff' },
});
