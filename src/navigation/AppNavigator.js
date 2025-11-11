import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from '../screens/SignupScreen';
import SignInScreen from '../screens/SignInScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const AuthenticationStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <AuthenticationStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
