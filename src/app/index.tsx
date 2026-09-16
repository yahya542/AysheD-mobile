import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from '../screens/LoginScreen';
import FinancialLedger from '../screens/FinancialLedger';
import ThreatMonitor from '../screens/ThreatMonitor';
import DevSecOpsNodes from '../screens/DevSecOpsNodes';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('ledger');

  // User role reset on logout
  const handleLogout = () => {
    setUser(null);
    setActiveTab('ledger');
  };

  // Login handler from LoginScreen
  const handleLogin = (userData) => {
    setUser(userData);
    setActiveTab('ledger');
  };

  if (!user) {
    return (
      <SafeAreaProvider>
        <LoginScreen onLogin={handleLogin} />
      </SafeAreaProvider>
    );
  }

  // User role: only ledger
  if (user.role === 'user') {
    return (
      <SafeAreaProvider>
        <FinancialLedger user={user} onLogout={handleLogout} />
      </SafeAreaProvider>
    );
  }

  // Superadmin: tab navigation across all screens
  const screens = {
    ledger: <FinancialLedger user={user} onLogout={handleLogout} />,
    threats: <ThreatMonitor user={user} onLogout={handleLogout} />,
    nodes: <DevSecOpsNodes user={user} onLogout={handleLogout} />,
  };

  return (
    <SafeAreaProvider>
      {screens[activeTab] ?? screens.ledger}
    </SafeAreaProvider>
  );
}
