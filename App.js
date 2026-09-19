import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from './src/theme';
import { auth } from './src/services/auth';

import UnifiedAuthGateway from './src/screens/UnifiedAuthGateway';
import FinancialLedger from './src/screens/FinancialLedger';
import ThreatMonitor from './src/screens/ThreatMonitor';
import DevSecOpsNodes from './src/screens/DevSecOpsNodes';
import SuperAdminDashboard from './src/screens/SuperAdminDashboard';
import UserDashboard from './src/screens/UserDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      try {
        const restored = await auth.restoreSession();
        if (restored) {
          setUser(restored);
        }
      } catch (err) {
        console.error("Gagal memulihkan sesi:", err);
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.logout();
      setUser(null);
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

  // FUNGSI NAVIGASI / ROUTING BERDASARKAN STATE USER
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={theme?.colors?.obsidian || '#0f172a'} />
          <Text style={styles.loadingText}>Memuat sesi...</Text>
        </View>
      );
    }

    if (!user) {
      return <UnifiedAuthGateway onLoginSuccess={setUser} />;
    }

    // PENTING: Menampung kecocokan role 'admin' ATAU 'superadmin' agar tidak salah lempar dashboard
    if (user.role === 'admin' || user.role === 'superadmin') {
      return <SuperAdminDashboard user={user} onLogout={handleLogout} />;
    }

    return <UserDashboard user={user} onLogout={handleLogout} />;
  };

  // SafeAreaView ditaruh tunggal di root paling atas
  return (
    <SafeAreaView style={styles.safeArea}>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme?.colors?.background || '#ffffff',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    // Menggunakan fallback jika properti theme.typography.bodyMd tidak ditemukan
    fontSize: theme?.typography?.bodyMd?.fontSize || 14,
    fontWeight: theme?.typography?.bodyMd?.fontWeight || 'normal',
    color: theme?.colors?.onSurfaceVariant || '#64748b',
  },
});
