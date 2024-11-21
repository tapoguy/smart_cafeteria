import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/authcontext'; // Adjust the import path as needed

const SignOutScreen = ({ navigation }) => {
  const { logout } = useAuth();

  /**
   * Handles the user sign-out process.
   * - Logs the user out via the auth context.
   * - Redirects the user to the Login screen upon success.
   * - Displays an error alert if the sign-out process fails.
   */
  const handleSignOut = async () => {
    try {
      console.log('Sign-out initiated.'); // Log the start of sign-out
      await logout(); // Clear user data and AsyncStorage
      console.log('Sign-out successful. Redirecting to Login screen.'); // Log success
      navigation.replace('Login'); // Navigate to Login screen
    } catch (error) {
      console.error('Error during sign-out:', error); // Log error for debugging
      Alert.alert('Sign-Out Failed', 'An error occurred while signing out. Please try again.'); // User-friendly alert
    }
  };

  /**
   * Handles cancellation of the sign-out process.
   * - Navigates back to the previous screen.
   */
  const handleCancel = () => {
    console.log('Sign-out cancelled by user.'); // Log cancellation
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to sign out?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Ensure the background is white to match your other screens
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#000', // Dark text for good contrast
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  signOutButton: {
    backgroundColor: '#c48d0a', // Use your brand's primary color
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#888', // Light grey for the cancel button
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelText: {
    color: '#fff', // Keep cancel text white for visibility
  },
});

export default SignOutScreen;
