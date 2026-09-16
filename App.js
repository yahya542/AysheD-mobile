import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from './src/theme';

import UnifiedAuthGateway from './src/screens/UnifiedAuthGateway';
import FinancialLedger from './src/screens/FinancialLedger';
import ThreatMonitor from './src/screens/ThreatMonitor';
import DevSecOpsNodes from './src/screens/DevSecOpsNodes';

export default function App() {
  const [currentTab, setCurrentTab] = useState('Auth');

  const renderScreen = () => {
    switch (currentTab) {
      case 'Auth': return <UnifiedAuthGateway />;
      case 'Ledger': return <FinancialLedger />;
      case 'Threat': return <ThreatMonitor />;
      case 'Nodes': return <DevSecOpsNodes />;
      default: return <UnifiedAuthGateway />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderScreen()}

        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => setCurrentTab('Auth')} style={styles.tab}>
            <Text style={[styles.tabText, currentTab === 'Auth' && styles.activeTab]}>Auth</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentTab('Ledger')} style={styles.tab}>
            <Text style={[styles.tabText, currentTab === 'Ledger' && styles.activeTab]}>Ledger</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentTab('Threat')} style={styles.tab}>
            <Text style={[styles.tabText, currentTab === 'Threat' && styles.activeTab]}>Threat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentTab('Nodes')} style={styles.tab}>
            <Text style={[styles.tabText, currentTab === 'Nodes' && styles.activeTab]}>Nodes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: theme.colors.boneBorder,
    paddingBottom: 20, // inset for safe area
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  tabText: {
    ...theme.typography.labelSm,
    color: theme.colors.onSurfaceVariant,
  },
  activeTab: {
    color: theme.colors.bronzeHover,
    fontWeight: 'bold',
  }
});
