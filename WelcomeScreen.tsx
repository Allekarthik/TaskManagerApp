import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <Text style={styles.subtitle}>Organize your life</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4CAF50' },
  title: { fontSize: 32, color: '#fff', fontWeight: 'bold' },
  subtitle: { color: '#fff', marginTop: 10 },
});
