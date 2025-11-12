// src/utils/storage/storage.js
import { createMMKV } from 'react-native-mmkv';

let storage = null;
try {
  storage = createMMKV({ id: 'app_storage' });
} catch (e) {
  console.error('MMKV init failed:', e);
  storage = null;
}

export const KEYS = {
  IS_SIGNED_IN: 'is_signed_in',
  USER_EMAIL: 'user_email',
  USER_PASSWORD: 'user_password',
  USER_NAME: 'user_name',
};

function ensureStorage() {
  if (!storage) throw new Error('MMKV storage not initialized');
}

export const setString = (key, value) => {
  ensureStorage();
  storage.set(key, value); 
};

export const getString = (key) => {
  ensureStorage();
  return storage.getString(key);
};

export const removeKey = (key) => {
  ensureStorage();
  storage.remove(key);
};

export const clearAll = () => {
  ensureStorage();
  storage.clearAll();
};

export const setBool = (key, value) => {
  ensureStorage();
  storage.set(key, value ? '1' : '0');
};

export const getBool = (key) => {
  ensureStorage();
  return storage.getString(key) === '1';
};
