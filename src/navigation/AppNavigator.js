import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isSignedIn = useSelector(s => s.auth.isSignedIn);
  const AuthenticationStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {isSignedIn ? <HomeScreen /> :<AuthenticationStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
