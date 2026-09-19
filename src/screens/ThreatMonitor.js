import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = {
    royalBg: '#1e3a8a',
    primaryDark: '#0f172a',
    cardBlue: '#172554',
    cardBlueLight: '#1e40af',
    accentYellow: '#fbbf24',
    accentYellowHover: '#f59e0b',
    borderBlue: '#2563eb',
    white: '#ffffff',
    slate500: '#64748b',
    blue100: '#dbeafe',
    blue200: '#bfdbfe',
    blue300: '#93c5fd',
    red500: '#ef4444',
    red600: '#dc2626',
    green500: '#10b981',
};

export default function ThreatMonitor({ user, onLogout }) {
    const [panicMode, setPanicMode] = useState(false);
    const email = user?.identifier || 'superadmin@ayshed.biz.id';

    return (
        <SafeAreaView style={s.root}>
            {/* Header */}
            <View style={s.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={s.headerAvatar}>
                        <Text style={{ fontSize: 13, fontWeight: '700', color: C.primaryDark }}>SA</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={s.headerTitle}>SecOps Executive</Text>
                            <View style={s.socBadge}>
                                <View style={s.socBadgeDot} />
                                <Text style={s.socBadgeText}>SOC AKTIF</Text>
                            </View>
                        </View>
                        <Text style={s.headerSubtitle}>{email}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <TouchableOpacity style={s.notifBtn}><Text style={{ fontSize: 16 }}>🔔</Text></TouchableOpacity>
                    <TouchableOpacity style={s.logoutBtn} onPress={onLogout}>
                        <Text style={s.logoutText}>Keluar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                {/* Banner */}
                <View style={s.userCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ fontSize: 12, fontWeight: '500', color: C.blue200 }}>Sesi Keamanan Aktif</Text>
                        <View style={s.radarBadge}>
                            <View style={s.radarDot} />
                            <Text style={s.radarText}>LIVE THREAT RADAR</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: '700', fontFamily: 'monospace', color: C.white, letterSpacing: -0.5 }}>{email}</Text>
                    <View style={s.clearanceBanner}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={{ fontSize: 15, color: '#facc15' }}>🛡️</Text>
                            <Text style={s.clearanceText}>SUPERADMIN • Level 4 Clearance</Text>
                        </View>
                        <Text style={{ fontSize: 11, fontFamily: 'monospace', color: C.blue300 }}>ID: SEC-8092</Text>
                    </View>
                </View>

                {/* Segmented Tabs (Visual Only for Threat Screen) */}
                <View style={s.tabWrap}>
                    <View style={[s.tabBtn, s.tabBtnActive]}>
                        <Text style={{ fontSize: 16, color: '#facc15' }}>🛡️</Text>
                        <Text style={s.tabTextActive}>THREATS</Text>
                    </View>
                    <View style={s.tabBtn}>
                        <Text style={{ fontSize: 16 }}>🧾</Text>
                        <Text style={s.tabText}>AUDIT LOGS</Text>
                    </View>
                </View>

                {/* Global Isolation Protocol */}
                <View style={s.panicCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 12, flex: 1 }}>
                            <View style={s.panicIconWrap}><Text style={{ fontSize: 20 }}>🔄</Text></View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: C.white }}>Protokol Isolasi Sesi Terkoordinasi</Text>
                                    <View style={s.guardrailBadge}><Text style={s.guardrailText}>Safe Guardrail</Text></View>
                                </View>
                                <Text style={{ fontSize: 12, color: C.blue100, marginTop: 4, lineHeight: 18 }}>Tindakan administratif graceful: pemutusan ingress instan & pencabutan sesi tanpa pemutusan mendadak.</Text>
                            </View>
                        </View>
                        <Switch
                            value={panicMode}
                            onValueChange={setPanicMode}
                            trackColor={{ false: C.cardBlueLight, true: C.red500 }}
                            thumbColor={C.white}
                            style={{ transform: [{ scale: 0.9 }], marginLeft: 8 }}
                        />
                    </View>
                    <View style={s.panicFoot}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.green500 }} />
                            <Text style={{ fontSize: 11, fontWeight: '500', color: C.blue200 }}>Failover Standby: Cluster Ready</Text>
                        </View>
                        <View style={s.isolationBadge}><Text style={s.isolationText}>ISOLASI NONAKTIF</Text></View>
                    </View>
                </View>

                {/* Metrics Grid */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={s.metricCard}>
                        <Text style={s.metricLabel}>Terblokir</Text>
                        <Text style={s.metricValueWhite}>14</Text>
                        <View style={s.metricSubRed}><Text style={{ fontSize: 11 }}>⬆️</Text><Text style={s.metricSubRedText}>+4 hari ini</Text></View>
                    </View>
                    <View style={s.metricCardYellow}>
                        <Text style={s.metricLabelDark}>Brute Force</Text>
                        <Text style={s.metricValueDark}>3</Text>
                        <View style={s.metricSubDark}><Text style={s.metricSubDarkText}>rentang 10m</Text></View>
                    </View>
                    <View style={s.metricCard}>
                        <Text style={s.metricLabel}>Anomali</Text>
                        <Text style={s.metricValueWhite}>1</Text>
                        <View style={s.metricSubYellow}><Text style={s.metricSubYellowText}>Ditandai</Text></View>
                    </View>
                </View>

                {/* Incidents Header */}
                <View style={{ marginTop: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#facc15' }} />
                        <Text style={{ fontSize: 12, fontWeight: '700', fontFamily: 'monospace', color: C.white, textTransform: 'uppercase', letterSpacing: 1.5 }}>Insiden Keamanan Aktif</Text>
                        <View style={s.incidentsCount}><Text style={s.incidentsCountText}>2 Perlu Tindakan</Text></View>
                    </View>
                    <TouchableOpacity style={s.syncBtn}>
                        <Text style={{ fontSize: 13 }}>🔄</Text>
                        <Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark }}>Live Sync</Text>
                    </TouchableOpacity>
                </View>

                {/* Incident 1 */}
                <View style={[s.incidentCard, { borderColor: C.red500 }]}>
                    <View style={[s.incidentStripe, { backgroundColor: C.red500 }]} />
                    <View style={s.incidentInner}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <View style={{ flex: 1, gap: 4 }}>
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Text style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: '700', color: C.white }}>ID Pengguna #8841</Text>
                                    <View style={s.criticalBadge}><Text style={s.criticalBadgeText}>● Kritis</Text></View>
                                </View>
                                <Text style={{ fontSize: 12, color: C.blue100 }}>Lonjakan impulsif <Text style={{ fontFamily: 'monospace', backgroundColor: C.red600, color: C.white, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontSize: 11, fontWeight: '700' }}> 200 req/s </Text> pada endpoint autentikasi privat</Text>
                            </View>
                            <Text style={{ fontFamily: 'monospace', fontSize: 11, color: C.blue300 }}>14 mnt lalu</Text>
                        </View>
                        <TouchableOpacity style={s.dangerBtn}>
                            <Text style={{ fontSize: 15 }}>⚡</Text>
                            <Text style={s.dangerBtnText}>Putus JWT & Tangguhkan Sesi</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Incident 2 */}
                <View style={[s.incidentCard, { borderColor: C.accentYellowHover }]}>
                    <View style={[s.incidentStripe, { backgroundColor: C.accentYellowHover }]} />
                    <View style={s.incidentInner}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <View style={{ flex: 1, gap: 4 }}>
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Text style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: '700', color: C.white }}>185.220.101.45</Text>
                                    <View style={s.warnBadge}><Text style={s.warnBadgeText}>▲ Peringatan</Text></View>
                                </View>
                                <Text style={{ fontSize: 12, color: C.blue100 }}>45 upaya login gagal terdeteksi pada <Text style={{ fontFamily: 'monospace', backgroundColor: '#facc15', color: C.primaryDark, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontSize: 11, fontWeight: '700' }}> /api/v1/login </Text></Text>
                            </View>
                            <Text style={{ fontFamily: 'monospace', fontSize: 11, color: C.blue300 }}>23 mnt lalu</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10, borderTopWidth: 1, borderTopColor: C.cardBlueLight, paddingTop: 12 }}>
                            <TouchableOpacity style={s.btnOutline}>
                                <Text style={s.btnOutlineText}>Lepas Blokir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.btnWarning}>
                                <Text style={{ fontSize: 15 }}>🚫</Text>
                                <Text style={s.btnWarningText}>Blokir IP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Log Redirect */}
                <TouchableOpacity style={s.logRedirect}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={{ fontSize: 18 }}>💻</Text>
                        <Text style={{ fontSize: 12, fontWeight: '500', color: C.blue100 }}>Periksa riwayat log autentikasi lengkap</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '700', fontFamily: 'monospace', color: '#facc15' }}>Buka Logs →</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Visual Bottom Nav */}
            <View style={s.bottomNav}>
                <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
                    <Text style={{ fontSize: 22 }}>🛡️</Text>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: '#facc15', letterSpacing: 0.5 }}>Threats</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', gap: 2, opacity: 0.7 }}>
                    <Text style={{ fontSize: 22 }}>🧾</Text>
                    <Text style={{ fontSize: 11, fontWeight: '500', color: C.blue300, letterSpacing: 0.5 }}>Audit Logs</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.royalBg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.primaryDark, borderBottomWidth: 1, borderBottomColor: C.borderBlue, paddingHorizontal: 16, paddingVertical: 14, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
    headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.accentYellowHover, borderWidth: 2, borderColor: '#fbbf24', alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 14, fontWeight: '700', color: C.white },
    socBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#facc15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    socBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.primaryDark },
    socBadgeText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark },
    headerSubtitle: { fontSize: 11, fontWeight: '500', fontFamily: 'monospace', color: C.blue200, marginTop: 2 },
    notifBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: C.cardBlueLight, borderWidth: 1, borderColor: '#3b82f6', alignItems: 'center', justifyContent: 'center' },
    logoutBtn: { backgroundColor: C.accentYellowHover, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#d97706' },
    logoutText: { fontSize: 12, fontWeight: '600', fontFamily: 'monospace', color: C.primaryDark },
    scroll: { padding: 16, gap: 16 },

    userCard: { backgroundColor: C.cardBlue, borderWidth: 1, borderColor: C.borderBlue, borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    radarBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.accentYellowHover, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
    radarDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.primaryDark },
    radarText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark, letterSpacing: 0.5 },
    clearanceBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: C.cardBlueLight },
    clearanceText: { fontSize: 11, fontWeight: '500', color: C.blue100 },

    tabWrap: { flexDirection: 'row', backgroundColor: C.primaryDark, borderRadius: 12, padding: 4, borderWidth: 1, borderColor: 'rgba(37,99,235,0.6)' },
    tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 8 },
    tabBtnActive: { backgroundColor: C.borderBlue, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
    tabTextActive: { fontSize: 12, fontWeight: '600', color: C.white },
    tabText: { fontSize: 12, fontWeight: '600', color: C.blue200 },

    panicCard: { backgroundColor: C.cardBlue, borderWidth: 1, borderColor: C.borderBlue, borderRadius: 12, padding: 16 },
    panicIconWrap: { width: 36, height: 36, borderRadius: 12, backgroundColor: C.accentYellowHover, alignItems: 'center', justifyContent: 'center' },
    guardrailBadge: { backgroundColor: C.cardBlueLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: '#3b82f6' },
    guardrailText: { fontSize: 10, fontWeight: '600', fontFamily: 'monospace', color: C.blue100 },
    panicFoot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.cardBlueLight },
    isolationBadge: { backgroundColor: C.primaryDark, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: C.borderBlue },
    isolationText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: '#facc15', letterSpacing: 0.5 },

    metricCard: { flex: 1, backgroundColor: C.cardBlue, borderWidth: 1, borderColor: C.borderBlue, borderRadius: 12, padding: 14, alignItems: 'center' },
    metricCardYellow: { flex: 1, backgroundColor: C.accentYellowHover, borderWidth: 1, borderColor: C.accentYellow, borderRadius: 12, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    metricLabel: { fontSize: 10, fontWeight: '600', fontFamily: 'monospace', color: C.blue200, textTransform: 'uppercase', marginBottom: 2 },
    metricLabelDark: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark, textTransform: 'uppercase', marginBottom: 2 },
    metricValueWhite: { fontSize: 24, fontWeight: '700', fontFamily: 'monospace', color: C.white, marginBottom: 6 },
    metricValueDark: { fontSize: 24, fontWeight: '900', fontFamily: 'monospace', color: C.primaryDark, marginBottom: 6 },
    metricSubRed: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.red600, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    metricSubRedText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    metricSubDark: { backgroundColor: C.primaryDark, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    metricSubDarkText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    metricSubYellow: { backgroundColor: '#facc15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    metricSubYellowText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark },

    incidentsCount: { backgroundColor: C.accentYellowHover, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12 },
    incidentsCountText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark },
    syncBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#facc15', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },

    incidentCard: { backgroundColor: C.cardBlue, borderRadius: 12, borderWidth: 1, overflow: 'hidden', flexDirection: 'row' },
    incidentStripe: { width: 6 },
    incidentInner: { flex: 1, padding: 16, paddingLeft: 12 },
    criticalBadge: { backgroundColor: C.red600, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
    criticalBadgeText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    warnBadge: { backgroundColor: C.accentYellowHover, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
    warnBadgeText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark },
    dangerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: C.red600, paddingVertical: 10, borderRadius: 8, marginTop: 12, borderTopWidth: 1, borderTopColor: C.cardBlueLight },
    dangerBtnText: { fontSize: 12, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    btnOutline: { flex: 1, paddingVertical: 8, alignItems: 'center', borderWidth: 1, borderColor: '#3b82f6', borderRadius: 8, backgroundColor: C.cardBlueLight },
    btnOutlineText: { fontSize: 12, fontWeight: '600', color: C.white },
    btnWarning: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 8, backgroundColor: C.accentYellowHover, borderRadius: 8 },
    btnWarningText: { fontSize: 12, fontWeight: '700', color: C.primaryDark },

    logRedirect: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.cardBlue, borderWidth: 1, borderColor: C.borderBlue, borderRadius: 12, padding: 14 },

    bottomNav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: C.primaryDark, borderTopWidth: 1, borderTopColor: C.borderBlue, paddingVertical: 8, paddingBottom: 16 }
});
