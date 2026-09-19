import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

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

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.background },
    container: { padding: theme.spacing.margin },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.md,
    },
    greeting: { ...theme.typography.bodyMd, color: theme.colors.onSurfaceVariant },
    username: { ...theme.typography.headlineMd, color: theme.colors.obsidian },
    logoutBtn: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.rounded.DEFAULT,
        borderWidth: 1,
        borderColor: theme.colors.boneBorder,
    },
    logoutText: { fontSize: 10, fontWeight: '600', color: theme.colors.onSurfaceVariant, letterSpacing: 1 },
    roleBadge: {
        backgroundColor: theme.colors.successWash,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.rounded.full,
        alignSelf: 'flex-start',
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(5,150,105,0.2)',
    },
    roleBadgeText: { ...theme.typography.labelSm, color: theme.colors.successBase },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: theme.rounded.xl,
        padding: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.boneBorder,
    },
    sectionLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 1.5, color: theme.colors.onSurfaceVariant, marginBottom: theme.spacing.xs },
    metricText: { ...theme.typography.monoMetric, color: theme.colors.bronzeBase, marginBottom: theme.spacing.md },
    bronzeBadge: {
        backgroundColor: theme.colors.bronzeBadge,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.rounded.full,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(184,147,74,0.3)',
        marginBottom: theme.spacing.lg,
    },
    bronzeBadgeText: { ...theme.typography.labelSm, color: theme.colors.bronzeHover },
    divider: { height: 1, backgroundColor: theme.colors.boneBorder, marginVertical: theme.spacing.sm },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: theme.spacing.xs },
    rowText: { ...theme.typography.bodySm, fontFamily: 'monospace', color: theme.colors.obsidian },
    statusSafe: { ...theme.typography.labelSm, color: theme.colors.successBase },
    statusPending: { ...theme.typography.labelSm, color: theme.colors.warningBase },
});
