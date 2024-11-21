import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/authcontext'; // Use the custom hook to consume context
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
  const { login } = useAuth(); // Access login function from AuthContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await axios.post('http://172.20.10.2:5000/api/signin', { username, password });
  
      console.log('API Response:', response.data); // Log the full response
  
      // Adjusted condition to match the actual API response structure
      if (response.status === 200 && response.data && response.data.message === 'Login successful') {
        const user = {
          userId: response.data.userId,
          username: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          role: response.data.role,
        };
  
        console.log('Login successful:', user); // Log user details
        login(user); // Save user to context
        navigation.navigate('Home'); // Navigate to the Home screen
      } else {
        console.error('Login failed:', response.data.message || 'Invalid credentials');
        Alert.alert('Error', response.data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error(
        'Login error:',
        error.response ? error.response.data : error.message
      );
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.signInButton}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.signInText}>Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  signInButton: {
    backgroundColor: '#c48d0a',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SignInScreen;
