// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  setString,
  getString,
  removeKey,
  clearAll,
  setBool,
  getBool,
  KEYS,
} from '../utils/storage/storage';

// helpers using safe storage wrappers
const mmkvSet = (key, value) => {
  if (typeof value === 'boolean') return setBool(key, value);
  return setString(key, value);
};
const mmkvGetString = key => getString(key);
const mmkvGetBool = key => getBool(key);
const mmkvDelete = key => deleteKey(key);

// Thunks
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const username = `${firstName.trim()} ${lastName.trim()}`.trim();

      // Save to MMKV — these now throw on failure
      setString(KEYS.USER_NAME, username);
      setString(KEYS.USER_EMAIL, email.trim().toLowerCase());
      setString(KEYS.USER_PASSWORD, password);
      // setBool(KEYS.IS_SIGNED_IN, true);

      return { username, email: email.trim().toLowerCase() };
    } catch (err) {
      console.error('signUp error:', err && err.message ? err.message : err);
      // return the real message to the rejected action payload
      return rejectWithValue(
        err?.message || 'Failed to save user (unknown error)',
      );
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const savedEmail = mmkvGetString(KEYS.USER_EMAIL);
      const savedPassword = mmkvGetString(KEYS.USER_PASSWORD);

      if (!savedEmail || !savedPassword) {
        return rejectWithValue('No account found. Please sign up first.');
      }

      if (
        savedEmail.toLowerCase() !== email.trim().toLowerCase() ||
        savedPassword !== password
      ) {
        return rejectWithValue('Invalid email or password.');
      }

      mmkvSet(KEYS.IS_SIGNED_IN, true);
      const username = mmkvGetString(KEYS.USER_NAME) || '';
      return { username, email: savedEmail };
    } catch (err) {
      return rejectWithValue('Sign in failed.');
    }
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      clearAll();
      return {};
    } catch (err) {
      console.log('error', err);

      return rejectWithValue('Sign out failed.');
    }
  },
);

// initial state: read safely using safe getters
const initialState = {
  isSignedIn: mmkvGetBool(KEYS.IS_SIGNED_IN) || false,
  user: {
    username: mmkvGetString(KEYS.USER_NAME) || null,
    email: mmkvGetString(KEYS.USER_EMAIL) || null,
  },
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, s => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(signUp.fulfilled, (s, action) => {
        s.status = 'succeeded';
        // s.isSignedIn = true;
        s.user = {
          username: action.payload.username,
          email: action.payload.email,
        };
      })
      .addCase(signUp.rejected, (s, action) => {
        s.status = 'failed';
        s.error = action.payload || action.error.message;
      })

      .addCase(signIn.pending, s => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(signIn.fulfilled, (s, action) => {
        s.status = 'succeeded';
        s.isSignedIn = true;
        s.user = {
          username: action.payload.username,
          email: action.payload.email,
        };
      })
      .addCase(signIn.rejected, (s, action) => {
        s.status = 'failed';
        s.error = action.payload || action.error.message;
      })

      .addCase(signOut.pending, s => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(signOut.fulfilled, s => {
        s.status = 'succeeded';
        s.isSignedIn = false;
        s.user = { username: null, email: null };
      })
      .addCase(signOut.rejected, (s, action) => {
        s.status = 'failed';
        s.error = action.payload || action.error.message;
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
