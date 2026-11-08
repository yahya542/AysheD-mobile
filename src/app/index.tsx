import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FinancialLedger from '../screens/FinancialLedger';
import AdminDashboard from '../screens/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = (userData) => {
    if (userData) {
      setUser(userData);
    } else {
      console.warn("Data user yang dikirim setelah login kosong!");
    }
  };

  if (!user) {
    if (showRegister) {
      return (
        <SafeAreaProvider>
          <RegisterScreen onBack={() => setShowRegister(false)} />
        </SafeAreaProvider>
      );
    }
    return (
      <SafeAreaProvider>
        <LoginScreen onLogin={handleLogin} onRegister={() => setShowRegister(true)} />
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
