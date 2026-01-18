import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import WelcomeScreen from './WelcomeScreen';
import MainTabs from './MainTabs';
import { TaskProvider } from './TaskContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </PaperProvider>
  );
}
