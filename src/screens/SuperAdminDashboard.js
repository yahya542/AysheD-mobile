import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Switch, SafeAreaView } from 'react-native';

const C = {
    royalBg: '#1e3a8a',
    primaryDark: '#0f172a',
    cardBlue: '#172554',
    cardBlueLight: '#1e40af',
    accentYellow: '#fbbf24',
    accentYellowHover: '#f59e0b',
    borderBlue: '#2563eb',
    borderBlueDark: '#1d4ed8',
    white: '#ffffff',
    slate100: '#f1f5f9',
    slate500: '#64748b',
    red500: '#ef4444',
    red600: '#dc2626',
    red800: '#991b1b',
    red900: '#7f1d1d',
    green500: '#22c55e',
    emerald500: '#10b981',
    emerald700: '#047857',
    blue200: '#bfdbfe',
    blue300: '#93c5fd',
};

export default function SuperAdminDashboard({ user, onLogout }) {
    const [activeTab, setActiveTab] = useState('threat'); // 'threat' or 'logs'
    const email = user?.identifier || 'superadmin@ayshed.biz.id';

    // Threat specific state
    const [panicMode, setPanicMode] = useState(false);

    // Log specific state
    const [searchQuery, setSearchQuery] = useState('');
    const [logFilter, setLogFilter] = useState('all'); // 'all', 'success', 'failed'

    const showToast = (msg) => {
        // In real app, trigger native toast or custom component
        console.log('[TOAST]', msg);
    };

    const renderHeader = () => (
        <View style={s.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={s.headerAvatar}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: C.primaryDark }}>SA</Text>
                </View>
                <View>
                    <Text style={s.headerTitle}>SecOps Executive</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.accentYellow }} />
                        <Text style={s.headerSubtitle}>SENTINEL VANGUARD</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity style={s.notifBtn} onPress={() => showToast('Notifikasi tersinkronisasi')}>
                    <Text style={{ fontSize: 16 }}>🔔</Text>
                    <View style={s.notifDot} />
                </TouchableOpacity>
                <TouchableOpacity style={s.logoutBtn} onPress={onLogout}>
                    <Text style={s.logoutText}>KELUAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderUserInfo = () => (
        <View style={s.userCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: C.blue300, textTransform: 'uppercase', letterSpacing: 0.5 }}>Welcome back,</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: C.white }}>{email}</Text>
                        <Text style={{ fontSize: 16, color: C.accentYellow }}>🛡️</Text>
                    </View>
                </View>
                <View style={s.liveBadge}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.accentYellow }} />
                    <Text style={s.liveBadgeText}>LIVE</Text>
                </View>
            </View>

            <View style={s.clearanceBanner}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 16 }}>🔑</Text>
                    <Text style={s.clearanceText}>SUPERADMIN — Level 4 Clearance</Text>
                </View>
                <View style={s.idBadge}>
                    <Text style={s.idBadgeText}>ID: SEC-8092</Text>
                </View>
            </View>
        </View>
    );

    const renderTabs = () => (
        <View style={s.tabContainer}>
            <TouchableOpacity
                style={[s.tabBtn, activeTab === 'threat' && s.tabBtnActive]}
                onPress={() => setActiveTab('threat')}
            >
                <Text style={[s.tabText, activeTab === 'threat' && s.tabTextActive]}>THREATS</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[s.tabBtn, activeTab === 'logs' && s.tabBtnActive]}
                onPress={() => setActiveTab('logs')}
            >
                <Text style={[s.tabText, activeTab === 'logs' && s.tabTextActive]}>AUDIT LOGS</Text>
            </TouchableOpacity>
        </View>
    );

    const renderThreatTab = () => (
        <View style={{ gap: 16 }}>
            {/* Panic Protocol */}
            <View style={s.panicCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', gap: 12, flex: 1 }}>
                        <View style={s.panicIconWrap}><Text style={{ fontSize: 20 }}>🔄</Text></View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                                <Text style={{ fontSize: 14, fontWeight: '700', color: C.white }}>Protokol Isolasi Sesi</Text>
                                <View style={s.guardrailBadge}><Text style={s.guardrailText}>Safe Guardrail</Text></View>
                            </View>
                            <Text style={{ fontSize: 12, color: C.blue200, marginTop: 4, lineHeight: 18 }}>Tindakan administratif graceful: pemutusan ingress instan & pencabutan sesi aman.</Text>
                        </View>
                    </View>
                    <Switch
                        value={panicMode}
                        onValueChange={setPanicMode}
                        trackColor={{ false: C.cardBlueLight, true: C.red500 }}
                        thumbColor={C.white}
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

            {/* Metric Grid */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={s.metricCard}>
                    <Text style={s.metricLabel}>Terblokir</Text>
                    <Text style={s.metricValueWhite}>14</Text>
                    <View style={s.metricSubRed}><Text style={s.metricSubRedText}>+4 hari ini</Text></View>
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

            {/* Incidents Title */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.accentYellow }} />
                    <Text style={{ fontSize: 12, fontWeight: '700', color: C.white, tracking: 1, textTransform: 'uppercase' }}>Insiden Aktif</Text>
                    <View style={s.incidentsCount}><Text style={s.incidentsCountText}>2 Perlu Tindakan</Text></View>
                </View>
            </View>

            {/* Incident 1 - Critical */}
            <View style={[s.incidentCard, { borderColor: C.red500 }]}>
                <View style={[s.incidentStripe, { backgroundColor: C.red500 }]} />
                <View style={s.incidentInner}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                        <View style={{ flex: 1, gap: 4 }}>
                            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                                <Text style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: '700', color: C.white }}>ID Pengguna #8841</Text>
                                <View style={s.criticalBadge}><Text style={s.criticalBadgeText}>● Kritis</Text></View>
                            </View>
                            <Text style={{ fontSize: 12, color: C.blue200 }}>Lonjakan impulsif <Text style={{ fontFamily: 'monospace', backgroundColor: C.red600, color: C.white, paddingHorizontal: 4 }}>200 req/s</Text> pada autentikasi privat.</Text>
                        </View>
                        <Text style={{ fontFamily: 'monospace', fontSize: 11, color: C.blue300 }}>14 mnt lalu</Text>
                    </View>
                    <TouchableOpacity style={s.dangerBtn}>
                        <Text style={{ fontSize: 16 }}>⚡</Text>
                        <Text style={s.dangerBtnText}>Putus JWT & Tangguhkan Sesi</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Incident 2 - Warning */}
            <View style={[s.incidentCard, { borderColor: C.accentYellowHover }]}>
                <View style={[s.incidentStripe, { backgroundColor: C.accentYellowHover }]} />
                <View style={s.incidentInner}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                        <View style={{ flex: 1, gap: 4 }}>
                            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                                <Text style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: '700', color: C.white }}>185.220.101.45</Text>
                                <View style={s.warnBadge}><Text style={s.warnBadgeText}>▲ Peringatan</Text></View>
                            </View>
                            <Text style={{ fontSize: 12, color: C.blue200 }}>45 upaya login gagal pada <Text style={{ fontFamily: 'monospace', backgroundColor: C.accentYellowHover, color: C.primaryDark, paddingHorizontal: 4 }}>/api/v1/login</Text></Text>
                        </View>
                        <Text style={{ fontFamily: 'monospace', fontSize: 11, color: C.blue300 }}>23 mnt lalu</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, borderTopWidth: 1, borderTopColor: C.cardBlueLight, paddingTop: 12 }}>
                        <TouchableOpacity style={s.btnOutline}>
                            <Text style={s.btnOutlineText}>Lepas Blokir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnWarning}>
                            <Text style={{ fontSize: 14 }}>🚫</Text>
                            <Text style={s.btnWarningText}>Blokir IP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ height: 40 }} />
        </View>
    );

    const renderLogsTab = () => (
        <View style={{ gap: 16 }}>
            {/* Search */}
            <View style={s.searchWrap}>
                <View style={s.searchInputWrap}>
                    <Text style={{ fontSize: 16 }}>🔍</Text>
                    <TextInput
                        style={s.searchInput}
                        placeholder="Cari IP, Pengguna..."
                        placeholderTextColor={C.slate500}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Filters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
                <TouchableOpacity style={[s.filterPill, logFilter === 'all' ? s.filterPillActiveYellow : s.filterPillInactive]} onPress={() => setLogFilter('all')}>
                    <Text style={[s.filterPillText, logFilter === 'all' ? { color: C.primaryDark } : { color: C.blue200 }]}>Semua</Text>
                    <View style={[s.filterPillCount, logFilter === 'all' ? { backgroundColor: C.cardBlue } : { backgroundColor: C.cardBlueLight }]}><Text style={s.filterPillCountText}>10</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={[s.filterPill, logFilter === 'success' ? s.filterPillActiveGreen : s.filterPillInactiveBordered]} onPress={() => setLogFilter('success')}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.emerald500 }} />
                    <Text style={[s.filterPillText, logFilter === 'success' ? { color: C.white } : { color: C.emerald500 }]}>Sukses</Text>
                    <View style={[s.filterPillCount, logFilter === 'success' ? { backgroundColor: C.emerald700 } : { backgroundColor: C.cardBlue, borderWidth: 1, borderColor: C.emerald700 }]}><Text style={s.filterPillCountText}>8</Text></View>
                </TouchableOpacity>

                <TouchableOpacity style={[s.filterPill, logFilter === 'failed' ? s.filterPillActiveRed : s.filterPillInactiveBordered]} onPress={() => setLogFilter('failed')}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.red500 }} />
                    <Text style={[s.filterPillText, logFilter === 'failed' ? { color: C.white } : { color: C.red500 }]}>Gagal</Text>
                    <View style={[s.filterPillCount, logFilter === 'failed' ? { backgroundColor: C.red800 } : { backgroundColor: C.cardBlue, borderWidth: 1, borderColor: C.red800 }]}><Text style={s.filterPillCountText}>2</Text></View>
                </TouchableOpacity>
            </ScrollView>

            {/* Log Feed */}
            <LogCard
                id="#10" status="success" date="19 Sep 2026, 10:47:13" email="superadmin@ayshed.biz.id"
                ip="127.0.0.1" agent="🚀 Postman 7.39.1" authLabel="Token Bearer"
                isYellow
            />
            <LogCard
                id="#9" status="success" date="19 Sep 2026, 10:36:30" email="superadmin@ayshed.biz.id"
                ip="10.154.197.250" agent="🤖 OkHttp/Android 4.12.0" authLabel="Basic Auth"
            />
            <LogCard
                id="#3" status="failed" date="18 Sep 2026, 14:41:52" email="superadmin@ayshed.biz.id"
                ip="172.25.159.164" agent="🤖 OkHttp/Android 4.12.0" reason="Invalid credentials" statusCode="401 Unauthorized"
                isRedAlert
            />

            <View style={{ height: 40 }} />
        </View>
    );

    return (
        <SafeAreaView style={s.root}>
            {renderHeader()}
            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                {renderUserInfo()}
                {renderTabs()}
                {activeTab === 'threat' ? renderThreatTab() : renderLogsTab()}
            </ScrollView>

            {/* Bottom Nav */}
            <View style={s.bottomNav}>
                <TouchableOpacity style={s.bottomNavItem} onPress={() => setActiveTab('threat')}>
                    <Text style={{ fontSize: 24 }}>{activeTab === 'threat' ? '🛡️' : '🛡️'}</Text>
                    <Text style={[s.bottomNavText, activeTab === 'threat' ? { color: C.accentYellow } : { color: C.blue300 }]}>Threats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.bottomNavItem} onPress={() => setActiveTab('logs')}>
                    <Text style={{ fontSize: 24, opacity: activeTab === 'logs' ? 1 : 0.6 }}>📖</Text>
                    <Text style={[s.bottomNavText, activeTab === 'logs' ? { color: C.accentYellow } : { color: C.blue300 }]}>Audit Logs</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Subcomponent for Audit Log Card
function LogCard({ id, status, date, email, ip, agent, authLabel, reason, statusCode, isYellow, isRedAlert }) {
    const isErr = status === 'failed';

    let wrapperStyle = [s.logWrap];
    if (isYellow) wrapperStyle.push(s.logWrapYellow);
    else if (isRedAlert) wrapperStyle.push(s.logWrapRed);
    else wrapperStyle.push(s.logWrapBlue);

    return (
        <View style={wrapperStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Text style={[s.logId, (isYellow || isRedAlert) && { color: C.primaryDark }]}>{id}</Text>
                    <View style={isErr ? s.logBadgeRed : s.logBadgeGreen}>
                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: isErr ? C.white : '#34d399' }} />
                        <Text style={{ fontSize: 10, fontWeight: '700', color: C.white, fontFamily: 'monospace' }}>{isErr ? 'Gagal' : 'Sukses'}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 11, fontWeight: '600', color: (isYellow || isRedAlert) ? C.primaryDark : C.blue200, fontFamily: 'monospace' }}>{date}</Text>
            </View>

            <View style={{ marginTop: 10 }}>
                <Text style={[s.logEmail, (isYellow || isRedAlert) && { color: C.primaryDark }]}>{email}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                    <View style={[s.ipTag, isYellow ? { backgroundColor: C.white, borderColor: C.accentYellowHover } : isRedAlert ? { backgroundColor: C.red900, borderColor: C.red600 } : { backgroundColor: C.cardBlueLight, borderColor: C.borderBlue }]}>
                        <Text style={{ fontSize: 11, color: isYellow ? C.slate500 : isRedAlert ? C.blue200 : C.blue300, fontFamily: 'monospace' }}>IP: </Text>
                        <Text style={{ fontSize: 11, fontWeight: '700', color: isYellow ? C.primaryDark : isRedAlert ? C.slate100 : C.accentYellow, fontFamily: 'monospace' }}>{ip}</Text>
                    </View>
                    <View style={[s.agentTag, isYellow ? { backgroundColor: '#b45309' } : isRedAlert ? { backgroundColor: C.accentYellow } : { backgroundColor: C.cardBlueDark }]}>
                        <Text style={{ fontSize: 11, fontWeight: '700', color: (isRedAlert || !isYellow && !isRedAlert) ? C.primaryDark : C.white, fontFamily: 'monospace' }}>{agent}</Text>
                    </View>
                </View>

                {isErr && (
                    <View style={s.errorReason}>
                        <Text style={{ fontSize: 16 }}>⚠️</Text>
                        <Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark }}>Alasan: <Text style={{ color: C.red900 }}>"{reason}"</Text></Text>
                    </View>
                )}
            </View>

            <View style={[s.logFoot, { borderTopColor: isYellow ? C.accentYellowHover : isRedAlert ? 'rgba(153,27,27,0.6)' : C.cardBlueLight }]}>
                {isErr ? (
                    <Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.red500 }}>{statusCode}</Text>
                ) : (
                    <Text style={{ fontSize: 11, fontWeight: '600', fontFamily: 'monospace', color: isYellow ? C.primaryDark : C.blue200 }}>Auth: <Text style={{ fontWeight: '700', color: isYellow ? C.cardBlue : C.accentYellow }}>{authLabel}</Text></Text>
                )}
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity style={[s.logBtnSm, isYellow && { backgroundColor: C.white, borderColor: '#cbd5e1' }]}><Text style={[s.logBtnSmText, isYellow && { color: C.primaryDark }]}>Copy IP</Text></TouchableOpacity>
                    <TouchableOpacity style={[s.logBtnPrimary, isErr && { backgroundColor: C.red600 }]}><Text style={s.logBtnPrimaryText}>{isErr ? 'Block IP' : 'Inspect'}</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.royalBg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f1d4a', borderBottomWidth: 1, borderBottomColor: C.borderBlue, paddingHorizontal: 20, paddingVertical: 14 },
    headerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.accentYellow, borderWidth: 2, borderColor: C.accentYellowHover, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 16, fontWeight: '700', color: C.white },
    headerSubtitle: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.accentYellow, letterSpacing: 1 },
    notifBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: C.cardBlue, borderWidth: 1, borderColor: C.borderBlue, alignItems: 'center', justifyContent: 'center' },
    notifDot: { position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderRadius: 5, backgroundColor: C.accentYellow, borderWidth: 2, borderColor: '#0f1d4a' },
    logoutBtn: { backgroundColor: C.accentYellow, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
    logoutText: { fontSize: 12, fontWeight: '700', color: C.primaryDark, letterSpacing: 1 },
    scroll: { padding: 20, paddingBottom: 40 },
    userCard: { backgroundColor: C.cardBlue, borderWidth: 2, borderColor: C.borderBlue, borderRadius: 16, padding: 20, marginBottom: 20 },
    liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#0f1d4a', borderRadius: 20, borderWidth: 1, borderColor: C.borderBlue },
    liveBadgeText: { fontSize: 10, fontWeight: '700', color: C.accentYellow, fontFamily: 'monospace' },
    clearanceBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: C.accentYellow, borderWidth: 2, borderColor: C.accentYellowHover, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginTop: 16 },
    clearanceText: { fontSize: 12, fontWeight: '700', color: C.primaryDark, textTransform: 'uppercase' },
    idBadge: { backgroundColor: C.primaryDark, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    idBadgeText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.accentYellow },
    tabContainer: { flexDirection: 'row', backgroundColor: '#0f1d4a', borderRadius: 16, borderWidth: 2, borderColor: C.borderBlue, padding: 6, marginBottom: 20 },
    tabBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
    tabBtnActive: { backgroundColor: C.accentYellow },
    tabText: { fontSize: 12, fontWeight: '700', color: C.blue300, letterSpacing: 1 },
    tabTextActive: { color: C.primaryDark },

    // Threat Tab
    panicCard: { backgroundColor: C.cardBlue, borderWidth: 1, borderColor: C.borderBlue, borderRadius: 16, padding: 16 },
    panicIconWrap: { width: 36, height: 36, borderRadius: 12, backgroundColor: C.accentYellow, alignItems: 'center', justifyContent: 'center' },
    guardrailBadge: { backgroundColor: C.cardBlueLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: C.borderBlue },
    guardrailText: { fontSize: 10, fontWeight: '600', fontFamily: 'monospace', color: C.blue200 },
    panicFoot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.cardBlueLight },
    isolationBadge: { backgroundColor: C.primaryDark, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: C.borderBlue },
    isolationText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.accentYellow, letterSpacing: 0.5 },
    metricCard: { flex: 1, backgroundColor: C.cardBlue, borderWidth: 1, borderColor: C.borderBlue, borderRadius: 12, padding: 12, alignItems: 'center' },
    metricCardYellow: { flex: 1, backgroundColor: C.accentYellowHover, borderWidth: 1, borderColor: C.accentYellow, borderRadius: 12, padding: 12, alignItems: 'center' },
    metricLabel: { fontSize: 10, fontWeight: '600', fontFamily: 'monospace', color: C.blue200, textTransform: 'uppercase', marginBottom: 4 },
    metricLabelDark: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark, textTransform: 'uppercase', marginBottom: 4 },
    metricValueWhite: { fontSize: 24, fontWeight: '700', fontFamily: 'monospace', color: C.white, marginBottom: 6 },
    metricValueDark: { fontSize: 24, fontWeight: '900', fontFamily: 'monospace', color: C.primaryDark, marginBottom: 6 },
    metricSubRed: { backgroundColor: C.red600, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    metricSubRedText: { fontSize: 9, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    metricSubDark: { backgroundColor: C.primaryDark, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    metricSubDarkText: { fontSize: 9, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    metricSubYellow: { backgroundColor: C.accentYellow, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    metricSubYellowText: { fontSize: 9, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark },
    incidentsCount: { backgroundColor: C.accentYellowHover, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
    incidentsCountText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark },
    incidentCard: { backgroundColor: C.cardBlue, borderRadius: 12, borderWidth: 1, overflow: 'hidden', flexDirection: 'row' },
    incidentStripe: { width: 6 },
    incidentInner: { flex: 1, padding: 16 },
    criticalBadge: { backgroundColor: C.red600, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
    criticalBadgeText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    warnBadge: { backgroundColor: C.accentYellowHover, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
    warnBadgeText: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark },
    dangerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: C.red600, paddingVertical: 12, borderRadius: 8, marginTop: 12, borderTopWidth: 1, borderTopColor: C.cardBlueLight },
    dangerBtnText: { fontSize: 12, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    btnOutline: { flex: 1, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: C.borderBlue, borderRadius: 8, backgroundColor: C.cardBlueLight },
    btnOutlineText: { fontSize: 12, fontWeight: '600', color: C.white },
    btnWarning: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, backgroundColor: C.accentYellowHover, borderRadius: 8 },
    btnWarningText: { fontSize: 12, fontWeight: '700', color: C.primaryDark },

    // Logs Tab
    searchWrap: { backgroundColor: C.cardBlue, padding: 12, borderRadius: 16, borderWidth: 2, borderColor: C.borderBlue },
    searchInputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 12, paddingHorizontal: 12 },
    searchInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, fontSize: 13, color: C.primaryDark },
    filterPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 2 },
    filterPillActiveYellow: { backgroundColor: C.accentYellow, borderColor: '#fcd34d' },
    filterPillActiveGreen: { backgroundColor: C.emerald700, borderColor: C.emerald500 },
    filterPillActiveRed: { backgroundColor: C.red800, borderColor: C.red500 },
    filterPillInactive: { backgroundColor: C.cardBlue, borderColor: C.borderBlue },
    filterPillInactiveBordered: { backgroundColor: C.cardBlue, borderColor: C.borderBlue },
    filterPillText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace' },
    filterPillCount: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
    filterPillCountText: { fontSize: 10, fontWeight: '700', color: C.white },

    logWrap: { borderRadius: 16, borderWidth: 2, borderLeftWidth: 8, padding: 16 },
    logWrapYellow: { backgroundColor: '#fef08a', borderColor: C.accentYellow, borderLeftColor: C.emerald500 },
    logWrapBlue: { backgroundColor: C.cardBlue, borderColor: C.borderBlue, borderLeftColor: C.emerald500 },
    logWrapRed: { backgroundColor: C.cardBlue, borderColor: C.red500, borderLeftColor: C.red500 },
    logId: { fontSize: 12, fontWeight: '900', fontFamily: 'monospace', color: C.blue200 },
    logBadgeGreen: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.emerald700, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: '#065f46' },
    logBadgeRed: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.red600, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: C.red800 },
    logEmail: { fontSize: 14, fontWeight: '700', color: C.white },
    ipTag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
    agentTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    errorReason: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.accentYellowHover, padding: 10, borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: '#fcd34d' },
    logFoot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTopWidth: 1 },
    logBtnSm: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: C.cardBlue, borderRadius: 8, borderWidth: 1, borderColor: C.borderBlue },
    logBtnSmText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    logBtnPrimary: { paddingHorizontal: 14, paddingVertical: 6, backgroundColor: C.borderBlueDark, borderRadius: 8 },
    logBtnPrimaryText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white },

    bottomNav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#0f1d4a', borderTopWidth: 2, borderTopColor: C.borderBlue, paddingVertical: 10 },
    bottomNavItem: { alignItems: 'center', flex: 1 },
    bottomNavText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', textTransform: 'uppercase', marginTop: 4, letterSpacing: 1 },
});
