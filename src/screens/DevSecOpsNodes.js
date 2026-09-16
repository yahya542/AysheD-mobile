import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../tokens';

const PURPLE_BG = '#140d21';
const PURPLE_SURFACE = '#231738';
const PURPLE_BORDER = '#442c69';
const PURPLE_TEXT = '#d8b4fe';
const PURPLE_ACCENT = '#c084fc';
const TEXT_PRIMARY = '#f3ecfb';
const TEXT_MUTED = '#cbbbdc';
const EMERALD = '#10B981';
const AMBER = '#f59e0b';
const WHITE = '#FFFFFF';
const CARD_BG = '#FFFFFF';
const CARD_BORDER = '#E5DDD0';

const NODES = [
    { icon: '🔌', name: 'API Utama FastAPI', sub: 'Latensi 42ms • v2.18.4', badge: '99.98%', status: 'ok' },
    { icon: '🔀', name: 'Proksi Balik Nginx', sub: 'Batas Kecepatan Aktif • SSL A+', badge: 'Terlindungi', status: 'ok' },
    { icon: '🔒', name: 'Dinding Api UFW', sub: '3 Port Terbuka • Perlindungan SYN', badge: 'Ketat', status: 'ok' },
    { icon: '🗄', name: 'Gugus Basis Data', sub: 'PostgreSQL 16 • Repl. 1.2ms', badge: 'Terenkripsi', status: 'ok' },
    { icon: '⚖️', name: 'Daemon Fail2ban', sub: '14 IP Diblokir • Serangan Brutal', badge: 'Peringatan', status: 'warn' },
];

const ACTIONS = [
    { icon: '📡', label: 'Uji Probe' },
    { icon: '🧹', label: 'Bersihkan Cache' },
    { icon: '🔁', label: 'Mulai Ulang Layanan' },
    { icon: '🔒', label: 'Kunci Darurat', danger: true },
];

export default function DevSecOpsNodes({ user, onLogout }) {
    const [seconds, setSeconds] = useState(14 * 60 + 52);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(s => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const countdownText = seconds > 0
        ? `${mins}:${secs < 10 ? '0' : ''}${secs}s`
        : 'EXPIRED';

    return (
        <SafeAreaView style={s.root}>
            {/* Header */}
            <View style={s.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={s.logoBadge}><Text style={{ fontSize: 17 }}>🛡</Text></View>
                    <View>
                        <Text style={s.logoName}>AysheD</Text>
                        <Text style={s.logoSub}>KEUANGAN</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={s.countdownPill}>
                        <View style={s.pulseDot} />
                        <Text style={[s.countdownText, seconds === 0 && { color: '#DC2626' }]}>{countdownText}</Text>
                    </View>
                    <TouchableOpacity style={s.keyBtn}><Text style={{ fontSize: 16 }}>🔑</Text></TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                {/* Cluster Capsule */}
                <View style={s.clusterCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 }}>
                        <View style={s.clusterIcon}><Text style={{ fontSize: 20 }}>🖥</Text></View>
                        <View>
                            <Text style={s.clusterLabel}>Node Produksi</Text>
                            <Text style={s.clusterName}>Ubuntu 22.04 LTS</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={s.switchBtn}>
                        <Text style={s.switchBtnText}>Ganti</Text>
                        <Text>⇄</Text>
                    </TouchableOpacity>
                </View>

                {/* Metrics */}
                <View style={s.metricsRow}>
                    {[
                        { label: 'CPU', value: '18', unit: '%', sub: 'Puncak 4 vCPU' },
                        { label: 'Memori', value: '2.4', unit: 'GB', sub: '30% Swap Diam' },
                        { label: 'Waktu Aktif', value: '42', unit: 'Hari', sub: '14j 28m Aktif' },
                    ].map((m) => (
                        <View key={m.label} style={s.metricCard}>
                            <View style={s.metricHead}>
                                <Text style={s.metricLabel}>{m.label}</Text>
                                <View style={s.greenDot} />
                            </View>
                            <Text style={s.metricValue}>{m.value}<Text style={s.metricUnit}>{m.unit}</Text></Text>
                            <Text style={s.metricSub}>{m.sub}</Text>
                        </View>
                    ))}
                </View>

                {/* Nodes List */}
                <View>
                    <View style={s.sectionHead}>
                        <Text style={s.sectionTitle}>Infrastruktur & Node</Text>
                        <View style={s.countBadge}><Text style={s.countBadgeText}>5 Aktif</Text></View>
                    </View>
                    <View style={{ gap: 12 }}>
                        {NODES.map((node) => (
                            <View key={node.name} style={[s.nodeCard, node.status === 'warn' && { borderColor: '#FDE68A' }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 }}>
                                    <View style={[s.nodeIcon, node.status === 'warn' && { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
                                        <Text style={{ fontSize: 20 }}>{node.icon}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={s.nodeName}>{node.name}</Text>
                                        <Text style={[s.nodeSub, node.status === 'warn' && { color: '#92400E' }]}>{node.sub}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <View style={[s.nodeBadge, node.status === 'warn' && { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
                                        <Text style={[s.nodeBadgeText, node.status === 'warn' && { color: '#92400E' }]}>{node.badge}</Text>
                                    </View>
                                    <View style={[s.statusDot, { backgroundColor: node.status === 'warn' ? AMBER : EMERALD }]} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Health Check */}
                <View style={s.healthCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <View style={s.greenDot} />
                            <Text style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: '700', color: '#1C1917' }}>/api/v1/health</Text>
                        </View>
                        <View style={s.healthBadge}><Text style={s.healthBadgeText}>200 Berhasil • 99.99%</Text></View>
                    </View>
                    <View style={s.healthInfo}>
                        <Text style={s.healthInfoText}>Pemeriksaan keaktifan terverifikasi di 3 node</Text>
                        <Text style={s.healthInfoTimer}>Aktif 2dtk</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View>
                    <Text style={s.actionTitle}>Tindakan Cepat</Text>
                    <View style={s.actionGrid}>
                        {ACTIONS.map((a) => (
                            <TouchableOpacity key={a.label} style={[s.actionBtn, a.danger && s.actionBtnDanger]}>
                                <Text style={{ fontSize: 19 }}>{a.icon}</Text>
                                <Text style={[s.actionLabel, a.danger && s.actionLabelDanger]}>{a.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ height: 80 }} />
            </ScrollView>

            {/* Bottom Nav */}
            <View style={s.navBar}>
                {[
                    { icon: '👛', label: 'Buku Kas' },
                    { icon: '📡', label: 'Ancaman' },
                    { icon: '🔗', label: 'Node', active: true },
                    { icon: '🛡', label: 'Keamanan' },
                ].map((item) => (
                    <TouchableOpacity key={item.label} style={[s.navItem, item.active && s.navItemActive]}>
                        <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                        <Text style={[s.navLabel, item.active && s.navLabelActive]}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: PURPLE_BG },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: 'rgba(20,13,33,0.85)', borderBottomWidth: 1, borderBottomColor: 'rgba(218,180,255,0.12)' },
    logoBadge: { width: 40, height: 40, borderRadius: R.xl, backgroundColor: PURPLE_SURFACE, borderWidth: 1, borderColor: PURPLE_BORDER, alignItems: 'center', justifyContent: 'center' },
    logoName: { fontSize: 17, fontWeight: '600', color: WHITE, letterSpacing: -0.3 },
    logoSub: { fontSize: 11, fontWeight: '500', color: PURPLE_ACCENT, letterSpacing: 1 },
    countdownPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 5, backgroundColor: PURPLE_SURFACE, borderRadius: R.full, borderWidth: 1, borderColor: PURPLE_BORDER },
    pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: EMERALD },
    countdownText: { fontFamily: 'monospace', fontSize: 11, fontWeight: '600', color: '#e9d5ff' },
    keyBtn: { width: 36, height: 36, borderRadius: R.full, backgroundColor: PURPLE_SURFACE, borderWidth: 1, borderColor: PURPLE_BORDER, alignItems: 'center', justifyContent: 'center' },
    scroll: { padding: 20, gap: 16 },
    clusterCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
    clusterIcon: { width: 44, height: 44, borderRadius: R.lg, backgroundColor: '#F3F0FF', borderWidth: 1, borderColor: '#DDD5FE', alignItems: 'center', justifyContent: 'center' },
    clusterLabel: { fontSize: 11, fontWeight: '600', color: '#7C3AED', textTransform: 'uppercase', letterSpacing: 1.2 },
    clusterName: { fontSize: 16, fontWeight: '700', color: '#1C1917' },
    switchBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#F3F0FF', borderRadius: R.lg, borderWidth: 1, borderColor: '#DDD5FE' },
    switchBtnText: { fontSize: 12, fontWeight: '600', color: '#5B21B6' },
    metricsRow: { flexDirection: 'row', gap: 14 },
    metricCard: { flex: 1, backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, padding: 16, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, elevation: 3 },
    metricHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    metricLabel: { fontFamily: 'monospace', fontSize: 11, fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 },
    greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: EMERALD, borderWidth: 2, borderColor: '#D1FAE5' },
    metricValue: { fontSize: 24, fontWeight: '700', color: '#1C1917', lineHeight: 28 },
    metricUnit: { fontSize: 12, fontWeight: '600', color: '#7C3AED', marginLeft: 2 },
    metricSub: { fontSize: 11, color: '#64748B', marginTop: 4 },
    sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, marginBottom: 12 },
    sectionTitle: { fontSize: 12, fontWeight: '700', color: TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 1.5 },
    countBadge: { paddingHorizontal: 10, paddingVertical: 3, backgroundColor: '#2b1a47', borderRadius: R.full, borderWidth: 1, borderColor: '#4a2e78' },
    countBadgeText: { fontSize: 11, fontWeight: '600', color: WHITE },
    nodeCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
    nodeIcon: { width: 40, height: 40, borderRadius: R.lg, backgroundColor: '#F3F0FF', borderWidth: 1, borderColor: '#DDD5FE', alignItems: 'center', justifyContent: 'center' },
    nodeName: { fontSize: 14, fontWeight: '700', color: '#1C1917' },
    nodeSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
    nodeBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 3, borderRadius: R.full, borderWidth: 1, borderColor: '#A7F3D0' },
    nodeBadgeText: { fontFamily: 'monospace', fontSize: 11, fontWeight: '600', color: '#065F46' },
    statusDot: { width: 10, height: 10, borderRadius: 5 },
    healthCard: { backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, padding: 18, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4, gap: 12 },
    healthBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 3, borderRadius: R.full, borderWidth: 1, borderColor: '#A7F3D0' },
    healthBadgeText: { fontFamily: 'monospace', fontSize: 11, fontWeight: '600', color: '#065F46' },
    healthInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: R.lg, borderWidth: 1, borderColor: '#E2E8F0', padding: 14 },
    healthInfoText: { fontSize: 12, color: '#475569', flex: 1 },
    healthInfoTimer: { fontSize: 11, fontWeight: '700', color: '#7C3AED' },
    actionTitle: { fontSize: 12, fontWeight: '700', color: TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 1.5, paddingHorizontal: 4, marginBottom: 12 },
    actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    actionBtn: { flex: 1, minWidth: '45%', paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
    actionBtnDanger: { borderColor: '#FECACA', backgroundColor: '#FFF5F5' },
    actionLabel: { fontSize: 12, fontWeight: '600', color: '#1C1917' },
    actionLabelDanger: { color: '#DC2626' },
    navBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: CARD_BG, borderTopWidth: 1, borderTopColor: CARD_BORDER, paddingVertical: 8, paddingBottom: 12 },
    navItem: { alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: R.xl },
    navItemActive: { backgroundColor: '#F3F0FF', borderWidth: 1, borderColor: '#DDD5FE' },
    navLabel: { fontFamily: 'monospace', fontSize: 11, color: '#78716C', marginTop: 2 },
    navLabelActive: { fontWeight: '700', color: '#5B21B6' },
});
