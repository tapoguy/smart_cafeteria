import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to provide context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state for the initial check

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Set user if exists in AsyncStorage
        }
      } catch (error) {
        console.error('Error fetching user from storage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData)); // Store user in AsyncStorage
      setUser(userData); // Update user state
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user'); // Remove user from AsyncStorage
      setUser(null); // Clear user state
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  // Provide context value
  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

// Loading screen for when data is being fetched
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
  </View>
);
