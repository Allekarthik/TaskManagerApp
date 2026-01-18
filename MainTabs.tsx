import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TaskListScreen from './TaskListScreen';
import CalendarScreen from './CalendarScreen';
import MineScreen from './MineScreen';

const Tab = createBottomTabNavigator();

// Colors
const ACTIVE_COLOR = '#ffffff';
const INACTIVE_COLOR = 'rgba(255,255,255,0.8)';
const TAB_BG = '#4CAF50'; // Darker green for bottom bar
const ACTIVE_BG = '#43a047'; // Brighter green for active tab

export default function MainTabs() {
  const renderTab = (
    label: string,
    icon: string,
    focused: boolean,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.tabItem, focused ? styles.activeTabItem : undefined]}
    >
      <Text
        style={[
          styles.icon,
          {
            fontSize: focused ? 30 : 26, // bigger when active
            opacity: focused ? 1 : 0.85, // inactive slightly dimmed
            transform: [{ scale: focused ? 1.3 : 1 }],
            textShadowColor: focused ? 'rgba(0,0,0,0.25)' : 'transparent',
            textShadowOffset: { width: 0, height: focused ? 2 : 0 },
            textShadowRadius: focused ? 4 : 0,
          },
        ]}
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.label,
          focused ? styles.activeLabel : styles.inactiveLabel,
        ]}
      >
        {label}
      </Text>

      {focused && <View style={styles.activeLine} />}
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        headerStyle: { backgroundColor: TAB_BG },
        headerTitleStyle: { color: '#fff', fontWeight: '700' },
        headerTintColor: '#fff',
      }}
    >
      {/* TASKS */}
      <Tab.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{
          title: 'Tasks',
          tabBarButton: ({ accessibilityState, onPress }) =>
            renderTab('Tasks', '📋', accessibilityState?.selected ?? false, onPress),
        }}
      />

      {/* CALENDAR */}
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarButton: ({ accessibilityState, onPress }) =>
            renderTab('Calendar', '📅', accessibilityState?.selected ?? false, onPress),
        }}
      />

      {/* MINE */}
      <Tab.Screen
        name="Mine"
        component={MineScreen}
        options={{
          title: 'Mine',
          tabBarButton: ({ accessibilityState, onPress }) =>
            renderTab('Mine', '👤', accessibilityState?.selected ?? false, onPress),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    backgroundColor: TAB_BG,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingBottom: Platform.OS === 'ios' ? 18 : 10,
    elevation: 14,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeTabItem: {
    backgroundColor: ACTIVE_BG,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  icon: {
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  activeLabel: {
    color: ACTIVE_COLOR,
    fontWeight: '700',
  },
  inactiveLabel: {
    color: INACTIVE_COLOR,
  },
  activeLine: {
    marginTop: 4,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#ffffff',
  },
});
