import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = {
    royalBg: '#1e40af',
    primaryDark: '#0f172a',
    headerBg: '#172554',
    cardBlue: '#172554',
    accentYellow: '#fbbf24',
    yellowLight: '#fef08a',
    yellowDark: '#b45309',
    borderBlue: '#3b82f6',
    white: '#ffffff',
    slate700: '#334155',
    slate500: '#64748b',
    slate100: '#f1f5f9',
    blue200: '#bfdbfe',
    blue300: '#93c5fd',
    emerald500: '#10b981',
    emerald700: '#047857',
    red500: '#ef4444',
    red600: '#dc2626',
    red800: '#991b1b',
    red900: '#7f1d1d',
};

export default function LoginLogs({ user, onLogout }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'success', 'failed'

    return (
        <SafeAreaView style={s.root}>
            {/* Header */}
            <View style={s.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={s.shieldIconWrap}><Text style={{ fontSize: 22 }}>🛡️</Text></View>
                    <View>
                        <Text style={s.headerTitle}>Audit Logs</Text>
                        <Text style={s.headerSubtitle}>SECOPS EXECUTIVE</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={s.liveBadge}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.white }} />
                        <Text style={s.liveText}>Live</Text>
                    </View>
                    <TouchableOpacity style={s.tuneBtn}><Text style={{ fontSize: 20 }}>⚙️</Text></TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                {/* Search */}
                <View style={s.searchCard}>
                    <View style={s.searchWrap}>
                        <Text style={{ fontSize: 20 }}>🔍</Text>
                        <TextInput
                            style={s.searchInput}
                            placeholder="Cari IP, Pengguna..."
                            placeholderTextColor={C.slate500}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>

                {/* Metrics Grid */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={s.metricCardBlue}>
                        <Text style={s.metricLabelLight}>TOTAL UPAYA</Text>
                        <View style={{ marginTop: 8 }}>
                            <Text style={s.metricValueWhite}>10</Text>
                            <Text style={s.metricSubLight}>Sesi Tercatat</Text>
                        </View>
                    </View>

                    <View style={s.metricCardGreen}>
                        <Text style={s.metricLabelGreen}>BERHASIL</Text>
                        <View style={{ marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Text style={s.metricValueWhite}>8</Text>
                                <View style={s.percBadgeWhite}><Text style={s.percTextGreen}>80%</Text></View>
                            </View>
                            <Text style={s.metricSubGreen}>Tingkat Normal</Text>
                        </View>
                    </View>

                    <View style={s.metricCardYellow}>
                        <Text style={s.metricLabelDark}>GAGAL / ALERT</Text>
                        <View style={{ marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Text style={s.metricValueAlert}>2</Text>
                                <View style={s.percBadgeRed}><Text style={s.percTextWhite}>! Alert</Text></View>
                            </View>
                            <Text style={s.metricSubDark}>2 Anomali</Text>
                        </View>
                    </View>
                </View>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
                    <TouchableOpacity style={[s.filterPill, filter === 'all' ? s.filterPillActiveYellow : s.filterPillBlue]} onPress={() => setFilter('all')}>
                        <Text style={[s.filterText, filter === 'all' && { color: C.primaryDark }]}>Semua</Text>
                        <View style={[s.filterCount, filter === 'all' ? { backgroundColor: C.headerBg } : { backgroundColor: C.headerBg }]}><Text style={s.filterCountText}>10</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[s.filterPill, filter === 'success' ? s.filterPillActiveGreen : s.filterPillBlueBorder]} onPress={() => setFilter('success')}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#34d399' }} />
                        <Text style={[s.filterText, filter === 'success' ? { color: C.emerald500 } : { color: C.emerald500 }]}>Sukses</Text>
                        <View style={[s.filterCount, { backgroundColor: C.emerald700 }]}><Text style={s.filterCountText}>8</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[s.filterPill, filter === 'failed' ? s.filterPillActiveRed : s.filterPillBlueBorder]} onPress={() => setFilter('failed')}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.red500 }} />
                        <Text style={[s.filterText, filter === 'failed' ? { color: '#fda4af' } : { color: '#fda4af' }]}>Gagal</Text>
                        <View style={[s.filterCount, { backgroundColor: C.red800 }]}><Text style={s.filterCountText}>2</Text></View>
                    </TouchableOpacity>
                </ScrollView>

                {/* Logs */}
                <View style={{ gap: 14, marginTop: 4 }}>
                    {/* Card 10 (Yellow bg) */}
                    <View style={s.logCardYellow}>
                        <View style={s.logHead}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Text style={s.logIdDark}>#10</Text>
                                <View style={s.logBadgeGreen}>
                                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#34d399' }} />
                                    <Text style={s.logBadgeTextWhite}>Sukses</Text>
                                </View>
                            </View>
                            <Text style={s.logDateDark}>19 Sep 2026, 10:47:13</Text>
                        </View>
                        <Text style={s.logEmailDark}>superadmin@ayshed.biz.id</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                            <View style={s.ipTagWhite}>
                                <Text style={s.ipTagLabelDark}>IP: </Text>
                                <Text style={s.ipTagValueDark}>127.0.0.1</Text>
                                <View style={{ backgroundColor: C.emerald500, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 6 }}><Text style={{ fontSize: 9, fontWeight: '700', color: C.white }}>Localhost</Text></View>
                            </View>
                            <View style={s.agentTagBrown}><Text style={s.agentTagTextWhite}>🚀 Postman 7.39.1</Text></View>
                        </View>
                        <View style={s.logFootYellow}>
                            <Text style={s.authLabelDark}>Auth: <Text style={{ color: C.headerBg, fontWeight: '700' }}>Token Bearer</Text></Text>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <View style={s.copyBtnWhite}><Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark }}>Salin IP</Text></View>
                                <View style={s.inspectBtnBlue}><Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white }}>Inspect</Text></View>
                            </View>
                        </View>
                    </View>

                    {/* Card 9 (Blue bg) */}
                    <View style={s.logCardBlue}>
                        <View style={s.logHead}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Text style={s.logIdLight}>#9</Text>
                                <View style={s.logBadgeGreen}>
                                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#34d399' }} />
                                    <Text style={s.logBadgeTextWhite}>Sukses</Text>
                                </View>
                            </View>
                            <Text style={s.logDateLight}>19 Sep 2026, 10:36:30</Text>
                        </View>
                        <Text style={s.logEmailWhite}>superadmin@ayshed.biz.id</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                            <View style={s.ipTagBlueDk}>
                                <Text style={s.ipTagLabelLight}>IP: </Text>
                                <Text style={s.ipTagValueYellow}>10.154.197.250</Text>
                            </View>
                            <View style={s.agentTagYellow}><Text style={s.agentTagTextDark}>🤖 OkHttp/Android 4.12.0</Text></View>
                        </View>
                        <View style={s.logFootBlue}>
                            <Text style={s.authLabelLight}>Auth: <Text style={{ color: C.yellowLight, fontWeight: '700' }}>Basic Auth</Text></Text>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <View style={s.copyBtnBlue}><Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white }}>Salin IP</Text></View>
                                <View style={s.inspectBtnYellow}><Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark }}>Inspect</Text></View>
                            </View>
                        </View>
                    </View>

                    {/* Card 3 (Red alert) */}
                    <View style={s.logCardRed}>
                        <View style={s.logHead}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Text style={s.logIdRed}>#3</Text>
                                <View style={s.logBadgeRed}>
                                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.white }} />
                                    <Text style={s.logBadgeTextWhite}>Gagal</Text>
                                </View>
                            </View>
                            <Text style={s.logDateRed}>18 Sep 2026, 14:41:52</Text>
                        </View>
                        <Text style={s.logEmailWhite}>superadmin@ayshed.biz.id</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                            <View style={s.ipTagRed}>
                                <Text style={s.ipTagLabelRed}>IP: </Text>
                                <Text style={s.ipTagValueWhite}>172.25.159.164</Text>
                            </View>
                            <View style={s.agentTagYellow}><Text style={s.agentTagTextDark}>🤖 OkHttp/Android 4.12.0</Text></View>
                        </View>
                        <View style={s.reasonBox}>
                            <Text style={{ fontSize: 18 }}>⚠️</Text>
                            <Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark }}>Alasan: <Text style={{ color: C.red900 }}>"Invalid credentials"</Text></Text>
                        </View>
                        <View style={s.logFootRed}>
                            <Text style={s.authLabelRed}>Status: 401 Unauthorized</Text>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <View style={s.copyBtnBlue}><Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white }}>Salin IP</Text></View>
                                <View style={s.blockBtnRed}><Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white }}>Block IP</Text></View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Pagination Summary */}
                <View style={s.summaryBar}>
                    <Text style={{ fontSize: 11, fontWeight: '600', fontFamily: 'monospace', color: C.blue200 }}>Menampilkan 10 dari 10 log</Text>
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                        <View style={s.pageBtn}><Text style={{ color: C.blue200 }}>{'<'}</Text></View>
                        <View style={s.pageBtnActive}><Text style={{ color: C.primaryDark, fontWeight: '900' }}>1</Text></View>
                        <View style={s.pageBtn}><Text style={{ color: C.blue200 }}>{'>'}</Text></View>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Visual Nav */}
            <View style={s.bottomNav}>
                <View style={{ flex: 1, alignItems: 'center', gap: 2, opacity: 0.7 }}>
                    <Text style={{ fontSize: 24 }}>🛡️</Text>
                    <Text style={{ fontSize: 11, fontWeight: '500', color: C.blue300, letterSpacing: 0.5 }}>Threats</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
                    <Text style={{ fontSize: 24 }}>🧾</Text>
                    <Text style={{ fontSize: 11, fontWeight: '900', color: '#facc15', letterSpacing: 0.5 }}>Audit Logs</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.royalBg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.headerBg, borderBottomWidth: 2, borderBottomColor: '#1e3a8a', paddingHorizontal: 16, paddingVertical: 14, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
    shieldIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: C.accentYellow, borderWidth: 1, borderColor: '#f59e0b', alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 16, fontWeight: '700', color: C.white, letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.yellowLight, letterSpacing: 1, marginTop: 2 },
    liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.emerald500, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#059669' },
    liveText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    tuneBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#1e3a8a', alignItems: 'center', justifyContent: 'center' },
    scroll: { padding: 14, gap: 14 },

    searchCard: { backgroundColor: C.cardBlue, padding: 12, borderRadius: 16, borderWidth: 2, borderColor: C.borderBlue, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e2e8f0' },
    searchInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, fontSize: 13, color: C.primaryDark },

    metricCardBlue: { flex: 1, backgroundColor: C.cardBlue, borderWidth: 2, borderColor: C.borderBlue, borderRadius: 16, padding: 14, justifyContent: 'space-between' },
    metricLabelLight: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.blue200, letterSpacing: 1 },
    metricValueWhite: { fontSize: 24, fontWeight: '700', color: C.white },
    metricSubLight: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: C.blue300, marginTop: 4 },

    metricCardGreen: { flex: 1, backgroundColor: C.emerald700, borderWidth: 2, borderColor: '#34d399', borderRadius: 16, padding: 14, justifyContent: 'space-between' },
    metricLabelGreen: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: '#d1fae5', letterSpacing: 1 },
    percBadgeWhite: { backgroundColor: C.white, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    percTextGreen: { fontSize: 9, fontWeight: '900', fontFamily: 'monospace', color: C.emerald700 },
    metricSubGreen: { fontSize: 10, fontWeight: '600', fontFamily: 'monospace', color: '#a7f3d0', marginTop: 4 },

    metricCardYellow: { flex: 1, backgroundColor: '#f59e0b', borderWidth: 2, borderColor: C.accentYellow, borderRadius: 16, padding: 14, justifyContent: 'space-between' },
    metricLabelDark: { fontSize: 10, fontWeight: '900', fontFamily: 'monospace', color: C.primaryDark, letterSpacing: 1 },
    metricValueAlert: { fontSize: 24, fontWeight: '900', color: C.red900 },
    percBadgeRed: { backgroundColor: C.red800, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    percTextWhite: { fontSize: 9, fontWeight: '900', fontFamily: 'monospace', color: C.white },
    metricSubDark: { fontSize: 10, fontWeight: '700', fontFamily: 'monospace', color: '#451a03', marginTop: 4 },

    filterPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, borderWidth: 2, ...Platform.select({ ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2 }, android: { elevation: 2 } }) },
    filterPillActiveYellow: { backgroundColor: C.accentYellow, borderColor: '#fcd34d' },
    filterPillBlue: { backgroundColor: C.headerBg, borderColor: C.borderBlue },
    filterPillActiveGreen: { backgroundColor: C.emerald700, borderColor: C.emerald500 },
    filterPillBlueBorder: { backgroundColor: C.headerBg, borderColor: C.borderBlue },
    filterPillActiveRed: { backgroundColor: C.red800, borderColor: C.red500 },
    filterText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace' },
    filterCount: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
    filterCountText: { fontSize: 10, fontWeight: '700', color: C.white },

    logCardYellow: { backgroundColor: C.yellowLight, borderWidth: 2, borderColor: '#facc15', borderLeftWidth: 8, borderLeftColor: C.emerald500, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    logCardBlue: { backgroundColor: C.headerBg, borderWidth: 2, borderColor: C.borderBlue, borderLeftWidth: 8, borderLeftColor: C.emerald500, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    logCardRed: { backgroundColor: C.headerBg, borderWidth: 2, borderColor: C.red500, borderLeftWidth: 8, borderLeftColor: C.red500, borderRadius: 16, padding: 16 },

    logHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    logIdDark: { fontSize: 12, fontWeight: '900', fontFamily: 'monospace', color: C.slate700 },
    logIdLight: { fontSize: 12, fontWeight: '900', fontFamily: 'monospace', color: C.blue300 },
    logIdRed: { fontSize: 12, fontWeight: '900', fontFamily: 'monospace', color: '#fda4af' },
    logBadgeGreen: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.emerald700, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8, borderWidth: 1, borderColor: '#065f46' },
    logBadgeRed: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.red600, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8, borderWidth: 1, borderColor: C.red900 },
    logBadgeTextWhite: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    logDateDark: { fontSize: 11, fontWeight: '600', fontFamily: 'monospace', color: C.slate700 },
    logDateLight: { fontSize: 11, fontWeight: '500', fontFamily: 'monospace', color: C.blue200 },
    logDateRed: { fontSize: 11, fontWeight: '600', fontFamily: 'monospace', color: '#fecdd3' },
    logEmailDark: { fontSize: 14, fontWeight: '700', color: C.primaryDark, marginTop: 10 },
    logEmailWhite: { fontSize: 14, fontWeight: '700', color: C.white, marginTop: 10 },

    ipTagWhite: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#fcd34d' },
    ipTagBlueDk: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e3a8a', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: C.borderBlue },
    ipTagRed: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7f1d1d', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: C.red600 },
    ipTagLabelDark: { fontSize: 11, fontFamily: 'monospace', color: C.slate500 },
    ipTagLabelLight: { fontSize: 11, fontFamily: 'monospace', color: C.blue300, fontWeight: '600' },
    ipTagLabelRed: { fontSize: 11, fontFamily: 'monospace', color: '#fda4af', fontWeight: '700' },
    ipTagValueDark: { fontSize: 11, fontFamily: 'monospace', color: C.primaryDark, fontWeight: '600' },
    ipTagValueYellow: { fontSize: 11, fontFamily: 'monospace', color: '#fcd34d', fontWeight: '700' },
    ipTagValueWhite: { fontSize: 11, fontFamily: 'monospace', color: C.white, fontWeight: '700' },

    agentTagBrown: { backgroundColor: C.yellowDark, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    agentTagYellow: { backgroundColor: C.accentYellow, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    agentTagTextWhite: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white },
    agentTagTextDark: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark },

    reasonBox: { backgroundColor: C.accentYellow, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, marginTop: 10, borderWidth: 2, borderColor: '#fcd34d' },

    logFootYellow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#fcd34d' },
    logFootBlue: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#1e3a8a' },
    logFootRed: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(153,27,27,0.6)' },
    authLabelDark: { fontSize: 11, fontWeight: '600', fontFamily: 'monospace', color: C.slate700 },
    authLabelLight: { fontSize: 11, fontWeight: '500', fontFamily: 'monospace', color: C.blue200 },
    authLabelRed: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: '#fb7185' },

    copyBtnWhite: { backgroundColor: C.white, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1' },
    copyBtnBlue: { backgroundColor: '#1e3a8a', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: C.borderBlue },
    inspectBtnBlue: { backgroundColor: '#1d4ed8', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
    inspectBtnYellow: { backgroundColor: C.accentYellow, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
    blockBtnRed: { backgroundColor: C.red600, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },

    summaryBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.cardBlue, padding: 14, borderRadius: 16, borderWidth: 2, borderColor: C.borderBlue },
    pageBtn: { width: 32, height: 32, borderRadius: 12, backgroundColor: '#1e3a8a', borderWidth: 1, borderColor: C.borderBlue, alignItems: 'center', justifyContent: 'center' },
    pageBtnActive: { width: 32, height: 32, borderRadius: 12, backgroundColor: C.accentYellow, alignItems: 'center', justifyContent: 'center' },

    bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: C.headerBg, borderTopWidth: 2, borderTopColor: '#1e3a8a', paddingVertical: 10, paddingBottom: 16 }
});
