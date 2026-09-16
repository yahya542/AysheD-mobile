import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../tokens';

const DARK = '#1f130b';
const DARK_SURFACE = '#2a1a10';
const DARK_BORDER = '#4d3221';
const AMBER_CARD = '#3d2719';
const AMBER_BADGE_BORDER = '#5a3a25';
const AMBER = '#f59e0b';
const AMBER_TEXT = '#fbbf24';
const TEXT_PRIMARY = '#fbf6ee';
const TEXT_MUTED = '#c9b29e';
const EMERALD = '#10B981';
const CRIMSON = '#DC2626';

export default function ThreatMonitor({ user, onLogout, onNavigate }) {
    const [panicMode, setPanicMode] = useState(false);

    const togglePanic = (val) => {
        if (val) {
            // In real app: show confirm dialog
        }
        setPanicMode(val);
    };

    return (
        <SafeAreaView style={s.root}>
            {/* Header */}
            <View style={s.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                    <View style={s.logoTile}><Text style={{ fontSize: 18 }}>🛡</Text></View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Text style={s.logoName}>AysheD</Text>
                            <View style={s.socBadge}><Text style={s.socBadgeText}>SOC EKSEKUTIF</Text></View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: EMERALD }} />
                            <Text style={{ fontFamily: 'monospace', fontSize: 10, color: '#34d399', letterSpacing: 1.5, fontWeight: '500' }}>GATEWAY AMAN</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={s.keyBtn}><Text style={{ fontSize: 17 }}>🔑</Text></TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                {/* Panic Mode Card */}
                <View style={s.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                        <View style={{ flex: 1, gap: 6 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <View style={s.panicIcon}><Text style={{ fontSize: 16 }}>🔄</Text></View>
                                <Text style={s.cardTitle}>Mode Panik Global</Text>
                            </View>
                            <Text style={s.cardBody}>Pemutusan ingress instan dan pencabutan sesi di seluruh node jaringan.</Text>
                        </View>
                        <Switch
                            value={panicMode}
                            onValueChange={togglePanic}
                            trackColor={{ false: '#d4d4d4', true: CRIMSON }}
                            thumbColor={'#fff'}
                        />
                    </View>
                    <View style={s.cardFoot}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: EMERALD }} />
                            <Text style={s.cardFootSub}>Failover Siaga</Text>
                        </View>
                        <Text style={s.cardFootStatus}>ISOLASI NONAKTIF</Text>
                    </View>
                </View>

                {/* Metric Summary */}
                <View style={s.metricGrid}>
                    {[
                        { label: 'Terblokir', value: '14', sub: '+4 hari ini', subColor: CRIMSON },
                        { label: 'Brute Force', value: '3', sub: 'rentang 10m', subColor: '#d97706' },
                        { label: 'Anomali', value: '1', sub: 'Ditandai', subColor: '#78716C' },
                    ].map((m) => (
                        <View key={m.label} style={s.metricCard}>
                            <Text style={s.metricLabel}>{m.label}</Text>
                            <Text style={s.metricValue}>{m.value}</Text>
                            <Text style={[s.metricSub, { color: m.subColor }]}>{m.sub}</Text>
                        </View>
                    ))}
                </View>

                {/* Incidents */}
                <View style={s.incidentsSection}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, marginBottom: 16 }}>
                        <Text style={s.incidentsTitle}>Insiden Aktif</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={{ fontFamily: 'monospace', fontSize: 11, color: AMBER_TEXT, fontWeight: '600' }}>Sinkron Langsung</Text>
                            <Text style={{ color: AMBER_TEXT }}>🔄</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Incident 1 */}
                    <View style={s.incidentCard}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                            <View style={{ gap: 4 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Text style={s.incidentId}>ID Pengguna #8841</Text>
                                    <View style={s.badgeCritical}><Text style={s.badgeCriticalText}>Kritis</Text></View>
                                </View>
                                <Text style={s.incidentBody}>
                                    Lonjakan impulsif <Text style={s.codeTag}>200 req/s</Text> pada autentikasi privat
                                </Text>
                            </View>
                            <Text style={s.incidentTime}>14 mnt lalu</Text>
                        </View>
                        <TouchableOpacity style={s.revokeBtn}>
                            <Text style={{ fontSize: 14 }}>⚡</Text>
                            <Text style={s.revokeBtnText}>Putus JWT & Tangguhkan</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Incident 2 */}
                    <View style={s.incidentCard}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                            <View style={{ gap: 4 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Text style={s.incidentIp}>185.220.101.45</Text>
                                    <View style={s.badgeWarn}><Text style={s.badgeWarnText}>Peringatan</Text></View>
                                </View>
                                <Text style={s.incidentBody}>45 upaya login gagal pada <Text style={s.codeTag}>/api/v1/login</Text></Text>
                            </View>
                            <Text style={s.incidentTime}>23 mnt lalu</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity style={s.unblockBtn}><Text style={s.unblockBtnText}>Lepas Blokir</Text></TouchableOpacity>
                            <TouchableOpacity style={s.blockIpBtn}>
                                <Text style={{ fontSize: 13 }}>🚫</Text>
                                <Text style={s.blockIpBtnText}>Blokir Permanen IP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Incident 3 */}
                    <View style={s.incidentCard}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ gap: 4 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Text style={s.incidentIp}>91.240.118.232</Text>
                                    <View style={s.badgeMitigated}><Text style={s.badgeMitigatedText}>Teredam</Text></View>
                                </View>
                                <Text style={s.incidentBody}>Brute force kredensial Port 22 (1.489 ditolak)</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: EMERALD }} />
                                <Text style={{ fontFamily: 'monospace', fontSize: 11, color: '#059669', fontWeight: '600' }}>Blokir UFW</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ height: 80 }} />
            </ScrollView>

            {/* Bottom Nav */}
            <View style={s.navBar}>
                <NavItem icon="👛" label="Buku Kas" />
                <NavItem icon="📡" label="Ancaman" active />
                <NavItem icon="🔗" label="Node" />
                <NavItem icon="🛡" label="Keamanan" />
            </View>
        </SafeAreaView>
    );
}

function NavItem({ icon, label, active }) {
    return (
        <TouchableOpacity style={[s.navItem, active && s.navItemActive]}>
            <Text style={{ fontSize: 22 }}>{icon}</Text>
            <Text style={[s.navLabel, active && s.navLabelActive]}>{label}</Text>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: DARK },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: 'rgba(42,26,16,0.9)', borderBottomWidth: 1, borderBottomColor: DARK_BORDER },
    logoTile: { width: 40, height: 40, borderRadius: R.xl, backgroundColor: AMBER, alignItems: 'center', justifyContent: 'center' },
    logoName: { fontSize: 16, fontWeight: '700', color: TEXT_PRIMARY },
    socBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: R.sm, backgroundColor: AMBER_CARD, borderWidth: 1, borderColor: AMBER_BADGE_BORDER },
    socBadgeText: { fontFamily: 'monospace', fontSize: 9, color: AMBER_TEXT, fontWeight: '600', letterSpacing: 1 },
    keyBtn: { width: 40, height: 40, borderRadius: R.xl, backgroundColor: '#342013', borderWidth: 1, borderColor: '#523724', alignItems: 'center', justifyContent: 'center' },
    scroll: { padding: 20, gap: 16 },
    card: { backgroundColor: C.white, borderRadius: R['3xl'], borderWidth: 1, borderColor: '#E7E5E4', padding: 20, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
    panicIcon: { width: 28, height: 28, borderRadius: R.lg, backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FECACA', alignItems: 'center', justifyContent: 'center' },
    cardTitle: { fontSize: 17, fontWeight: '700', color: '#0C0A09' },
    cardBody: { fontSize: 13, color: '#57534E', lineHeight: 20 },
    cardFoot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, marginTop: 14, borderTopWidth: 1, borderTopColor: '#E7E5E4' },
    cardFootSub: { fontSize: 11, fontFamily: 'monospace', color: '#57534E' },
    cardFootStatus: { fontSize: 11, fontFamily: 'monospace', color: '#0C0A09', fontWeight: '700', letterSpacing: 1 },
    metricGrid: { flexDirection: 'row', gap: 12 },
    metricCard: { flex: 1, backgroundColor: C.white, borderRadius: R.xl, borderWidth: 1, borderColor: '#E7E5E4', padding: 16, alignItems: 'center' },
    metricLabel: { fontFamily: 'monospace', fontSize: 10, color: '#78716C', fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
    metricValue: { fontSize: 28, fontWeight: '700', color: '#0C0A09', marginBottom: 4 },
    metricSub: { fontFamily: 'monospace', fontSize: 10, fontWeight: '600' },
    incidentsSection: {},
    incidentsTitle: { fontSize: 13, fontWeight: '700', color: AMBER, textTransform: 'uppercase', letterSpacing: 2 },
    incidentCard: { backgroundColor: C.white, borderRadius: R['3xl'], borderWidth: 1, borderColor: '#E7E5E4', padding: 20, marginBottom: 16 },
    incidentId: { fontSize: 16, fontWeight: '700', color: '#0C0A09' },
    incidentIp: { fontFamily: 'monospace', fontSize: 14, fontWeight: '700', color: '#0C0A09' },
    incidentBody: { fontSize: 13, color: '#57534E', lineHeight: 20 },
    incidentTime: { fontFamily: 'monospace', fontSize: 11, color: '#78716C' },
    codeTag: { fontFamily: 'monospace', fontSize: 12, color: '#92400E', backgroundColor: '#FEF3C7', paddingHorizontal: 4 },
    badgeCritical: { backgroundColor: '#FEE2E2', paddingHorizontal: 10, paddingVertical: 3, borderRadius: R.full, borderWidth: 1, borderColor: '#FECACA' },
    badgeCriticalText: { fontFamily: 'monospace', fontSize: 10, fontWeight: '700', color: '#B91C1C' },
    badgeWarn: { backgroundColor: '#FFFBEB', paddingHorizontal: 10, paddingVertical: 3, borderRadius: R.full, borderWidth: 1, borderColor: '#FDE68A' },
    badgeWarnText: { fontFamily: 'monospace', fontSize: 10, fontWeight: '600', color: '#92400E' },
    badgeMitigated: { backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 3, borderRadius: R.full, borderWidth: 1, borderColor: '#A7F3D0' },
    badgeMitigatedText: { fontFamily: 'monospace', fontSize: 10, fontWeight: '600', color: '#065F46' },
    revokeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, backgroundColor: CRIMSON, borderRadius: R.lg },
    revokeBtnText: { fontFamily: 'monospace', fontSize: 12, fontWeight: '600', color: '#fff' },
    unblockBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: '#F4F4F5', borderRadius: R.lg, borderWidth: 1, borderColor: '#D4D4D8' },
    unblockBtnText: { fontFamily: 'monospace', fontSize: 12, fontWeight: '500', color: '#1C1917' },
    blockIpBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, backgroundColor: '#FEF2F2', borderRadius: R.lg, borderWidth: 1, borderColor: '#FECACA' },
    blockIpBtnText: { fontFamily: 'monospace', fontSize: 12, fontWeight: '600', color: CRIMSON },
    navBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: C.white, borderTopWidth: 1, borderTopColor: '#E7E5E4', paddingVertical: 8 },
    navItem: { alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: R.xl },
    navItemActive: { backgroundColor: '#FFFBEB', borderWidth: 1, borderColor: '#FDE68A' },
    navLabel: { fontFamily: 'monospace', fontSize: 10, color: '#78716C', marginTop: 4 },
    navLabelActive: { fontWeight: '700', color: '#1C1917' },
});
