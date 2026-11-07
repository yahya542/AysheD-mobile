import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from '../screens/LoginScreen';
import FinancialLedger from '../screens/FinancialLedger';
import AdminDashboard from '../screens/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = (userData) => {
    // PROTEKSI: Pastikan userData yang masuk tidak null/undefined sebelum dimasukkan ke state
    if (userData) {
      setUser(userData);
    } else {
      console.warn("Data user yang dikirim setelah login kosong!");
    }
  };

  // 1. Jika user belum login, tampilkan layar login
  if (!user) {
    return (
      <SafeAreaProvider>
        <LoginScreen onLogin={handleLogin} />
      </SafeAreaProvider>
    );
  }

  // 2. PROTEKSI DENGAN TANDA TANYA (?.)
  // Backend mengembalikan role "admin" untuk superadmin, "user" untuk user biasa
  if (user?.role === 'admin' || user?.role === 'superadmin') {
    return (
      <SafeAreaProvider>
        <AdminDashboard user={user} onLogout={handleLogout} />
      </SafeAreaProvider>
    );
  }

  // 3. Fallback jika bukan superadmin (Regular User)
  return (
    <SafeAreaProvider>
      <FinancialLedger user={user} onLogout={handleLogout} />
    </SafeAreaProvider>
  );
}
