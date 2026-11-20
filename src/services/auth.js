import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from './api';

const TOKEN_KEY = 'ayshed_access_token';
const USER_KEY = 'ayshed_user';

// Gunakan AsyncStorage untuk development (Expo Go), SecureStore untuk production build
const USE_SECURE_STORE = false;

async function getToken() {
  if (USE_SECURE_STORE) {
    return SecureStore.getItemAsync(TOKEN_KEY);
  }
  return AsyncStorage.getItem(TOKEN_KEY);
}

async function setToken(token) {
  if (USE_SECURE_STORE) {
    return SecureStore.setItemAsync(TOKEN_KEY, token);
  }
  return AsyncStorage.setItem(TOKEN_KEY, token);
}

async function removeToken() {
  if (USE_SECURE_STORE) {
    return SecureStore.deleteItemAsync(TOKEN_KEY);
  }
  return AsyncStorage.removeItem(TOKEN_KEY);
}

async function getUser() {
  const raw = await AsyncStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function setUser(user) {
  return AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

async function removeUser() {
  return AsyncStorage.removeItem(USER_KEY);
}

async function login({ email, password }) {
  const data = await authApi.login({ email, password });
  const token = data?.access_token;
  if (!token) {
    throw new Error('Login failed: no token returned');
  }
  await setToken(token);
  const profile = await authApi.me(token);
  const user = {
    id: profile?.id,
    email: profile?.email,
    role: profile?.role,
    isActive: profile?.is_active ?? true,
    createdAt: profile?.created_at,
  };
  await setUser(user);
  return user;
}

async function register({ email, password }) {
  const data = await authApi.register({ email, password });
  return data;
}

async function logout() {
  const token = await getToken();
  if (token) {
    try {
      await authApi.logout(token);
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    }
  }
  await removeToken();
  await removeUser();
}

async function restoreSession() {
  const token = await getToken();
  if (!token) return null;
  try {
    const profile = await authApi.me(token);
    const user = {
      id: profile?.id,
      email: profile?.email,
      role: profile?.role,
      isActive: profile?.is_active ?? true,
      createdAt: profile?.created_at,
    };
    await setUser(user);
    return user;
  } catch {
    await logout();
    return null;
  }
}

async function getUfwLogs() {
  const token = await getToken();
  if (!token) throw new Error('No token found');
  return authApi.ufwLogs(token);
}
async function getChartSummary() {
  const token = await getToken();
  if (!token) throw new Error('No token found');
  return authApi.chartSummary(token);
}
async function unsuspendUser(userId) {
  const token = await getToken();
  if (!token) throw new Error('No token found');
  return authApi.unsuspendUser(token, userId);
}
async function deleteUser(userId) {
  const token = await getToken();
  if (!token) throw new Error('No token found');
  return authApi.deleteUser(token, userId);
}
  const token = await getToken();
  if (!token) {
    throw new Error('No token found');
  }
  return authApi.users(token);
}

async function suspendUser(userId) {
  const token = await getToken();
  if (!token) {
    throw new Error('No token found');
  }
  return authApi.suspendUser(token, userId);
}

async function getLoginLogs() {
  const token = await getToken();
  if (!token) {
    throw new Error('No token found');
  }
  return authApi.loginLogs(token);
} 




export const auth = {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
  login,
  register,
  logout,
  restoreSession,
  getLoginLogs,
    getUsers,
    deleteUser,
    unsuspendUser,
    getChartSummary,
    getUfwLogs,
    suspendUser,
};
