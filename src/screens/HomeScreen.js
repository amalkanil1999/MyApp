import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/authSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);
  const signInerror = useSelector(state => state.auth.error);
  const handleLogout = async () => {
    console.log("HANDLE");
    
    const result = await dispatch(signOut());
    if (signOut.fulfilled.match(result)) {
    } else {
      // show error
    }
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity>
        <Text onPress={handleLogout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
