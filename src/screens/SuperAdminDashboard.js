import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

const TABS = ['LEDGER', 'THREAT', 'NODES'];

export default function SuperAdminDashboard({ user, onLogout }) {
    const [tab, setTab] = useState('LEDGER');

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Welcome,</Text>
                    <Text style={styles.username}>{user.identifier}</Text>
                </View>
                <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
                    <Text style={styles.logoutText}>LOGOUT</Text>
                </TouchableOpacity>
            </View>

            {/* Role Badge */}
            <View style={styles.topBar}>
                <View style={styles.roleBadge}>
                    <Text style={styles.roleBadgeText}>⬡ SUPERADMIN</Text>
                </View>

                {/* Tab Bar */}
                <View style={styles.tabBar}>
                    {TABS.map(t => (
                        <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
                            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {tab === 'LEDGER' && <LedgerPane />}
                {tab === 'THREAT' && <ThreatPane />}
                {tab === 'NODES' && <NodesPane />}
            </ScrollView>
        </SafeAreaView>
    );
}

function LedgerPane() {
    return (
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
    );
}

function ThreatPane() {
    return (
        <View>
            <View style={[styles.card, { marginBottom: theme.spacing.lg }]}>
                <Text style={styles.sectionLabel}>DEFENSE STATUS</Text>
                <Text style={styles.metricText}>NOMINAL</Text>
                <View style={styles.statusBadgeSafe}>
                    <Text style={styles.statusSafe}>● ALL CLEAR</Text>
                </View>
            </View>

            <Text style={styles.dangerLabel}>CRITICAL ACTIONS</Text>
            <TouchableOpacity style={styles.killButton}>
                <Text style={styles.killButtonText}>⚡ REVOKE PIPELINE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.killButton, { marginTop: theme.spacing.sm, backgroundColor: '#991B1B' }]}>
                <Text style={styles.killButtonText}>⛔ FREEZE CLUSTER</Text>
            </TouchableOpacity>
        </View>
    );
}

function NodesPane() {
    const nodes = [
        { title: 'CI/CD GATES', desc: 'Passed cryptographic sign-off', status: 'safe' },
        { title: 'VAULT DEPLOYMENT', desc: 'Awaiting clearance', status: 'idle' },
        { title: 'POLICY ORCHESTRATION', desc: 'Certificate valid until 2025-12-01', status: 'safe' },
        { title: 'SECRET ROTATION', desc: 'Advisory: Rotation due in 7 days', status: 'warn' },
    ];

    return (
        <View style={styles.card}>
            <Text style={styles.sectionLabel}>DEVSECOPS PIPELINE NODES</Text>
            {nodes.map((node, i) => (
                <View key={i}>
                    <View style={styles.nodeRow}>
                        <View style={[styles.diamond, node.status === 'safe' && styles.diamondSafe, node.status === 'idle' && styles.diamondIdle, node.status === 'warn' && styles.diamondWarn]} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nodeTitle}>{node.title}</Text>
                            <Text style={styles.nodeDesc}>{node.desc}</Text>
                        </View>
                    </View>
                    {i < nodes.length - 1 && <View style={styles.divider} />}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.background },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
        paddingHorizontal: theme.spacing.margin, paddingTop: theme.spacing.md, paddingBottom: theme.spacing.sm,
    },
    greeting: { ...theme.typography.bodyMd, color: theme.colors.onSurfaceVariant },
    username: { ...theme.typography.headlineMd, color: theme.colors.obsidian },
    logoutBtn: {
        paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.xs,
        borderRadius: theme.rounded.DEFAULT, borderWidth: 1, borderColor: theme.colors.boneBorder,
    },
    logoutText: { fontSize: 10, fontWeight: '600', color: theme.colors.onSurfaceVariant, letterSpacing: 1 },
    topBar: { paddingHorizontal: theme.spacing.margin, paddingBottom: theme.spacing.md },
    roleBadge: {
        backgroundColor: '#F0EBF8', paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs,
        borderRadius: theme.rounded.full, alignSelf: 'flex-start', marginBottom: theme.spacing.md,
        borderWidth: 1, borderColor: 'rgba(124, 58, 237, 0.2)',
    },
    roleBadgeText: { ...theme.typography.labelSm, color: '#7C3AED' },
    tabBar: { flexDirection: 'row', backgroundColor: theme.colors.surfaceContainer, borderRadius: theme.rounded.md, padding: 4 },
    tab: { flex: 1, paddingVertical: theme.spacing.sm, alignItems: 'center', borderRadius: theme.rounded.DEFAULT - 2 },
    tabActive: { backgroundColor: theme.colors.obsidian },
    tabText: { fontSize: 10, fontWeight: '600', color: theme.colors.onSurfaceVariant, letterSpacing: 1 },
    tabTextActive: { color: '#ffffff' },
    content: { padding: theme.spacing.margin, paddingTop: 0 },
    card: { backgroundColor: '#ffffff', borderRadius: theme.rounded.xl, padding: theme.spacing.lg, borderWidth: 1, borderColor: theme.colors.boneBorder, marginBottom: theme.spacing.lg },
    sectionLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 1.5, color: theme.colors.onSurfaceVariant, marginBottom: theme.spacing.xs },
    metricText: { ...theme.typography.monoMetric, color: theme.colors.bronzeBase, marginBottom: theme.spacing.md },
    bronzeBadge: {
        backgroundColor: theme.colors.bronzeBadge, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs,
        borderRadius: theme.rounded.full, alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(184,147,74,0.3)', marginBottom: theme.spacing.md,
    },
    bronzeBadgeText: { ...theme.typography.labelSm, color: theme.colors.bronzeHover },
    divider: { height: 1, backgroundColor: theme.colors.boneBorder, marginVertical: theme.spacing.sm },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: theme.spacing.xs },
    rowText: { ...theme.typography.bodySm, fontFamily: 'monospace', color: theme.colors.obsidian },
    statusSafe: { ...theme.typography.labelSm, color: theme.colors.successBase },
    statusPending: { ...theme.typography.labelSm, color: theme.colors.warningBase },
    statusBadgeSafe: {
        backgroundColor: theme.colors.successWash, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs,
        borderRadius: theme.rounded.full, alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(5,150,105,0.2)',
    },
    dangerLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 1.5, color: theme.colors.dangerBase, marginBottom: theme.spacing.sm },
    killButton: { backgroundColor: theme.colors.dangerBase, padding: theme.spacing.md, borderRadius: theme.rounded.DEFAULT, alignItems: 'center' },
    killButtonText: { ...theme.typography.labelMd, color: '#ffffff', fontWeight: 'bold' },
    nodeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: theme.spacing.sm },
    diamond: { width: 10, height: 10, transform: [{ rotate: '45deg' }], marginRight: theme.spacing.md },
    diamondSafe: { backgroundColor: theme.colors.successPing },
    diamondIdle: { backgroundColor: theme.colors.boneBorderDark },
    diamondWarn: { backgroundColor: theme.colors.warningBase },
    nodeTitle: { ...theme.typography.labelMd, color: theme.colors.obsidian },
    nodeDesc: { ...theme.typography.bodySm, color: theme.colors.onSurfaceVariant },
});
