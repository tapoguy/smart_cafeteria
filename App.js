import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './context/authcontext'; // Import AuthProvider and useAuth
import LoginScreen from './common/index';
import SignInScreen from './common/signin';
import SignUpScreen from './common/signup';
import SignOutScreen from './common/signout';
import FoodListScreen from './customer/screens/home';
import MenuScreen from './customer/screens/menuscreen';
import FavoritesScreen from './customer/screens/favoritesscreen';
import CartScreen from './customer/screens/cartscreen';
import ProfileScreen from './customer/screens/profilescreen';
import NotificationScreen from './customer/screens/notificationscreen';
import FeedbackForm from './customer/screens/feedback';
import { CartProvider } from './context/cartcontext';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN22VAFschVtqfTkfLkwXgvKDY8t4Jfso",
  authDomain: "smart-cafeteria-75c37.firebaseapp.com",
  projectId: "smart-cafeteria-75c37",
  storageBucket: "smart-cafeteria-75c37.appspot.com",
  messagingSenderId: "433447662836",
  appId: "1:433447662836:web:a00d93567c309321f4daa1",
  measurementId: "G-JDNZ31TRVJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create stack navigator
const Stack = createStackNavigator();

const AppNavigation = () => {
  const { user } = useAuth(); // Use context here after it's provided
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const initializeAnalytics = async () => {
      const supported = await isSupported();
      if (supported) {
        const analyticsInstance = getAnalytics(app);
        setAnalytics(analyticsInstance);
        logEvent(analyticsInstance, 'app_open', {
          method: 'App Initialized2',
        });
      }
    };
    initializeAnalytics();
  }, []);

  const logScreenView = (screenName) => {
    if (analytics) {
      logEvent(analytics, 'screen_view', {
        screen_name: screenName,
        screen_class: `${screenName}Screen`,
      });
    }
  };

  console.log('User from context:', user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Login"}
        screenOptions={{ headerShown: false }} // Global header config
      >
        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          listeners={{ focus: () => logScreenView('Login') }}
        />
        <Stack.Screen
          name="Signin"
          component={SignInScreen}
          listeners={{ focus: () => logScreenView('Signin') }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          listeners={{ focus: () => logScreenView('SignUp') }}
        />
        {/* App Screens */}
        <Stack.Screen
          name="Home"
          component={FoodListScreen}
          listeners={{ focus: () => logScreenView('Home') }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          listeners={{ focus: () => logScreenView('Menu') }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          listeners={{ focus: () => logScreenView('Favorites') }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          listeners={{ focus: () => logScreenView('Cart') }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={{ focus: () => logScreenView('Profile') }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          listeners={{ focus: () => logScreenView('Notification') }}
        />
        <Stack.Screen
          name="feedback"
          component={FeedbackForm}
          listeners={{ focus: () => logScreenView('feedback') }}
        />
        <Stack.Screen
          name="SignOut"
          component={SignOutScreen}
          listeners={{ focus: () => logScreenView('SignOut') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppNavigation />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
