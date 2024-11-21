// index.js (LoginScreen)
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/daeyang_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Daeyang Smart Cafeteria</Text>
        <Text style={styles.subtitle}>fast & reliable</Text>
      </View>

      {/* Sign In Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Signin')} // Navigate to Sign In page
        >
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>

        {/* Link to Sign Up Page */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLinkText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Discount Section */}
      <View style={styles.discountContainer}>
        <Image
          source={require('../assets/images/food1.jpg')}
          style={styles.discountImage}
        />
        <Text style={styles.discountText}>
          15% Discount From Our Store
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#564631',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#c48d0a',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  signUpLinkText: {
    fontSize: 14,
    color: '#c48d0a',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  discountContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  discountImage: {
    width: 230,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  discountText: {
    color: '#c48d0a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
