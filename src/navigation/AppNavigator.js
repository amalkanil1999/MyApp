import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

// Import your screens
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/home/HomeScreen';
import Bookings from '../screens/home/Bookings';
import Offers from '../screens/home/Offers';
import Profile from '../screens/home/Profile';

import { getIcon } from '../utils/iconutils/IconUtility';
import { Colorscheme } from '../constants/Colors';
import { Fonts } from '../constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const CustomTabIcon = ({ iconName, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      {focused && <View style={styles.activeIndicator} />}
      <View style={styles.iconWrapper}>
        {getIcon(iconName, '100%', '100%', focused ? Colorscheme.BLACK : Colorscheme.LIGHTGRAY)}
      </View>
    </View>
  );
};


const TAB_SCREENS = [
  {
    name: 'Home',
    component: HomeScreen,
    iconName: 'Home',
    label: 'Home',
  },
  {
    name: 'Bookings',
    component: Bookings,
    iconName: 'Bookings',
    label: 'Bookings',
  },
  {
    name: 'Offers',
    component: Offers,
    iconName: 'Offers',
    label: 'Offers',
  },
  {
    name: 'Profile',
    component: Profile,
    iconName: 'Profile',
    label: 'Profile',
  },
];

export default function AppNavigator() {
  const isSignedIn = useSelector(s => s.auth.isSignedIn);

  const AuthenticationStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    );
  };

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarActiveTintColor: Colorscheme.BLACK,
          tabBarInactiveTintColor: '#999',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarItemStyle: styles.tabBarItem,
        }}
      >
        {TAB_SCREENS.map((screen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              tabBarLabel: screen.label,
              tabBarIcon: ({ focused }) => (
                <CustomTabIcon iconName={screen.iconName} focused={focused} />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    );
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isSignedIn ? <HomeStack /> : <AuthenticationStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingBottom: 10,
    paddingTop: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabBarItem: {
  },
  tabBarLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  activeIndicator: {
    position: 'absolute',
    top: -12,
    width: 60,
    height: 7,
    backgroundColor: Colorscheme.BLUE,
    borderRadius: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});