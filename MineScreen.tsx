import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTasks } from './TaskContext';

export default function MineScreen() {
  const { tasks } = useTasks();

  const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d); // local date, no timezone shift
};

  /* ---------- Helper: Current Week ---------- */
  const getWeekRange = () => {
    const today = new Date();
const first = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    first.setHours(0, 0, 0, 0);
    first.setDate(today.getDate() - today.getDay());

    const last = new Date(first);
    last.setDate(first.getDate() + 6);

    return { first, last };
  };

  const { first, last } = getWeekRange();

const isInCurrentWeek = (dateStr: string) => {
  const d = parseLocalDate(dateStr);
  return d >= first && d <= last;
};


  /* ---------- Weekly Tasks ---------- */
  const weeklyTasks = tasks.filter(t => t.date && isInCurrentWeek(t.date));

  const completed = weeklyTasks.filter(t => t.completed).length;
  const pending = weeklyTasks.filter(t => !t.completed).length;

  /* ---------- Weekly Bar Chart ---------- */
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const weeklyData = days.map((_, index) =>
    weeklyTasks.filter(
      t =>
        t.completed &&
        parseLocalDate(t.date).getDay() === index
    ).length
  );

  const maxValue = Math.max(...weeklyData, 1);

  /* ---------- Pending Tasks by Category ---------- */
  const categoryCounts: Record<string, number> = {};

  weeklyTasks
    .filter(t => !t.completed)
    .forEach(task => {
      const cat = task.category || 'Others';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

  const categoryColors: Record<string, string> = {
    Work: '#4CAF50',
    Personal: '#FF9800',
    Birthday: '#E91E63',
    Others: '#607D8B',
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Overview</Text>
        <Text style={styles.headerSub}>This week at a glance 📊</Text>
      </View>

      {/* ---------- Stats Cards ---------- */}
      <View style={styles.cardRow}>
        <View style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
          <Text style={[styles.cardNumber, { color: '#4CAF50' }]}>
            {completed}
          </Text>
          <Text style={styles.cardLabel}>Completed</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#FFF3E0' }]}>
          <Text style={[styles.cardNumber, { color: '#FF9800' }]}>
            {pending}
          </Text>
          <Text style={styles.cardLabel}>Pending</Text>
        </View>
      </View>

      {/* ---------- Weekly Chart ---------- */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Daily Task Completion</Text>

        <View style={styles.chart}>
          {weeklyData.map((value, index) => (
            <View key={index} style={styles.barWrapper}>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${(value / maxValue) * 20}%`,
                  },
                ]}
              />
              <Text style={styles.barLabel}>{days[index]}</Text>
              {value > 0 && <Text style={styles.barValue}>{value}</Text>}
            </View>
          ))}
        </View>
      </View>

      {/* ---------- Pending by Category ---------- */}
      <View style={styles.categoryBox}>
        <Text style={styles.sectionTitle}>Pending Tasks by Category</Text>

        {Object.keys(categoryCounts).length === 0 ? (
          <Text style={styles.emptyText}>No pending tasks 🎉</Text>
        ) : (
          Object.entries(categoryCounts).map(([cat, count]) => (
            <View
              key={cat}
              style={[
                styles.categoryRow,
                {
                  backgroundColor:
                    (categoryColors[cat] || categoryColors.Others) + '20',
                },
              ]}
            >
              <Text style={styles.categoryName}>{cat}</Text>
              <View style={styles.categoryBadge}>
                <Text
                  style={[
                    styles.categoryCount,
                    { color: categoryColors[cat] || categoryColors.Others },
                  ]}
                >
                  {count}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* ---------- Weekly Summary ---------- */}
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Weekly Summary</Text>

        <View style={styles.summaryStats}>
          <View style={[styles.summaryStatBox, { backgroundColor: '#E8F5E9' }]}>
            <Text style={[styles.summaryStatNumber, { color: '#4CAF50' }]}>
              {completed}
            </Text>
            <Text style={styles.summaryStatLabel}>Completed</Text>
          </View>

          <View style={[styles.summaryStatBox, { backgroundColor: '#FFF3E0' }]}>
            <Text style={[styles.summaryStatNumber, { color: '#FF9800' }]}>
              {pending}
            </Text>
            <Text style={styles.summaryStatLabel}>Pending</Text>
          </View>
        </View>

        <Text style={styles.summaryText}>
          Total This Week: {weeklyTasks.length}
        </Text>
      </View>

    </ScrollView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },

  header: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSub: {
    color: '#E0F2F1',
    marginTop: 4,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  cardNumber: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  chartContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  chart: {
    flexDirection: 'row',
    height: 150,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barWrapper: {
    alignItems: 'center',
    width: '12%',
  },
  bar: {
    width: '100%',
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#555',
  },
  barValue: {
    fontSize: 10,
    color: '#333',
  },

  categoryBox: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryBadge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 10,
  },

  summary: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryStats: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },
  summaryStatBox: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  summaryStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryStatLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
});
