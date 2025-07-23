import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const saveToken = async (token: string) => {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem('token', token);
  } else {
    await SecureStore.setItemAsync('token', token);
  }
};

export const getToken = async () => {
  if (Platform.OS === 'web') {
    return await AsyncStorage.getItem('token');
  } else {
    return await SecureStore.getItemAsync('token');
  }
};

export const removeToken = async () => {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem('token');
  } else {
    await SecureStore.deleteItemAsync('token');
  }
};
