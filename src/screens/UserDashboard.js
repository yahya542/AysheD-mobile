import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { styles } from './styles/userDashboardStyles';

export default function UserDashboard({ user, onLogout }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome,</Text>
                        <Text style={styles.username}>{user.email}</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
                        <Text style={styles.logoutText}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>

                {/* Role Badge */}
                <View style={styles.roleBadge}>
                    <Text style={styles.roleBadgeText}>● USER</Text>
                </View>

                {/* Financial Ledger */}
                <View style={styles.card}>
                    <Text style={styles.sectionLabel}>FINANCIAL LEDGER</Text>
                    <Text style={styles.metricText}>$4.2M</Text>

                    <View style={styles.bronzeBadge}>
                        <Text style={styles.bronzeBadgeText}>VERIFIED CLEARANCE</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.rowText}>TX_HASH: 0x8a92...b41</Text>
                        <Text style={styles.statusSafe}>SETTLED</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.rowText}>TX_HASH: 0x9f11...c22</Text>
                        <Text style={styles.statusPending}>PENDING</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
