import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Configure API base URL
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000'  // Development - use localhost
  : 'https://your-api-domain.com';  // Production - update with your API URL

export default function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check backend health
    axios.get(`${API_BASE_URL}/health`)
      .then(response => {
        setHealth(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Text style={styles.title}>Weather Graphics</Text>
      <Text style={styles.subtitle}>Mobile App</Text>

      {loading ? (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={styles.statusText}>Connecting to backend...</Text>
        </View>
      ) : error ? (
        <View style={styles.statusContainer}>
          <Text style={styles.errorText}>❌ Backend not available</Text>
          <Text style={styles.errorDetail}>{error}</Text>
          <Text style={styles.hint}>
            Make sure the backend is running on {API_BASE_URL}
          </Text>
        </View>
      ) : health ? (
        <View style={styles.statusContainer}>
          <Text style={styles.successText}>✅ Backend Connected</Text>
          <Text style={styles.statusText}>Status: {health.status}</Text>
          <Text style={styles.statusText}>
            Uptime: {Math.floor(health.uptime)}s
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 40,
    opacity: 0.9,
  },
  statusContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 250,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  successText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  errorDetail: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  hint: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.8,
    fontStyle: 'italic',
  },
});

