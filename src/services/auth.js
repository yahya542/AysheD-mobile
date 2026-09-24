import * as SecureStore from 'expo-secure-store';
import { authApi } from './api';

const TOKEN_KEY = 'ayshed_access_token';
const USER_KEY = 'ayshed_user';

async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

async function setToken(token) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

async function removeToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

async function getUser() {
  const raw = await SecureStore.getItemAsync(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function setUser(user) {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
}

async function removeUser() {
  await SecureStore.deleteItemAsync(USER_KEY);
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
};
