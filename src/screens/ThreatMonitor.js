import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, s } from './styles/threatMonitorStyles';

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
