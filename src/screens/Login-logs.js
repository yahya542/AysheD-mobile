import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../services/auth';
import { C, s } from './styles/loginLogsStyles';

function normalizeLog(raw) {
    const id = raw?.id ?? raw?.log_id ?? raw?.attempt_id ?? raw?.attemptId ?? null;
    const email = raw?.email ?? raw?.username ?? raw?.user_email ?? raw?.user ?? '';
    const ip = raw?.ip_address ?? raw?.ipAddress ?? raw?.ip ?? '';
    const agent = raw?.user_agent ?? raw?.userAgent ?? raw?.agent ?? '';
    const date = raw?.date ?? raw?.timestamp ?? raw?.created_at ?? raw?.createdAt ?? raw?.time ?? '';
    const reason = raw?.failure_reason ?? raw?.reason ?? raw?.reason_message ?? raw?.message ?? '';
    const statusCode = raw?.status_code ?? raw?.statusCode ?? null;

    let success;
    if (typeof raw?.success === 'boolean') success = raw.success;
    else if (typeof raw?.is_success === 'boolean') success = raw.is_success;
    else if (typeof raw?.succeeded === 'boolean') success = raw.succeeded;
    else if (typeof raw?.status === 'boolean') success = raw.status;
    else success = String(raw?.status ?? '').toLowerCase() === 'success';

    return {
        id,
        email,
        ip,
        agent,
        date,
        reason,
        statusCode,
        success: !!success,
    };
}

function extractLogs(result) {
    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.data)) return result.data;
    if (Array.isArray(result?.logs)) return result.logs;
    if (Array.isArray(result?.items)) return result.items;
    return [];
}

export default function LoginLogs({ user, onLogout }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadLogs = useCallback(async () => {
        try {
            const result = await auth.getLoginLogs();
            const rawLogs = extractLogs(result);

            let processedLogs = rawLogs.map(normalizeLog);
            processedLogs.sort((a, b) => Number(b.id) - Number(a.id));

            const top20Logs = processedLogs.slice(0, 20);

            setLogs(top20Logs);
        } catch (err) {
            console.error('Gagal memuat log login:', err);
            setLogs([]);
        }
    }, []);

    useEffect(() => {
        let mounted = true;
        const init = async () => {
            setLoading(true);
            await loadLogs();
            if (mounted) setLoading(false);
        };
        init();
        return () => { mounted = false; };
    }, [loadLogs]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadLogs();
        setRefreshing(false);
    }, [loadLogs]);

    const totalLogs = logs.length;
    const successCount = logs.filter((l) => l.success).length;
    const failedCount = totalLogs - successCount;
    const successPercent = totalLogs ? Math.round((successCount / totalLogs) * 100) : 0;

    const latestLoginAttemptId = [...logs]
        .map((l) => l.id)
        .filter((id) => id !== null && id !== undefined)
        .sort((a, b) => Number(b) - Number(a))[0] ?? null;

    const searchedLogs = logs.filter((l) => {
        if (!search.trim()) return true;
        const term = search.toLowerCase();
        return (
            String(l.email ?? '').toLowerCase().includes(term) ||
            String(l.ip ?? '').toLowerCase().includes(term) ||
            String(l.agent ?? '').toLowerCase().includes(term)
        );
    });

    const filteredLogs = searchedLogs.filter((l) => {
        if (filter === 'all') return true;
        if (filter === 'success') return l.success;
        if (filter === 'failed') return !l.success;
        return true;
    });

    const filterCounts = {
        all: totalLogs,
        success: successCount,
        failed: failedCount,
    };

    const renderLog = (log) => {
        const isLatest = log.id === latestLoginAttemptId;
        const success = log.success;

        const cardStyle = success
            ? (isLatest ? s.logCardYellow : s.logCardBlue)
            : s.logCardRed;

        const idStyle = success ? (isLatest ? s.logIdDark : s.logIdLight) : s.logIdRed;
        const dateStyle = success ? (isLatest ? s.logDateDark : s.logDateLight) : s.logDateRed;
        const emailStyle = success ? (isLatest ? s.logEmailDark : s.logEmailWhite) : s.logEmailWhite;
        const badgeStyle = success ? s.logBadgeGreen : s.logBadgeRed;
        const badgeDot = success ? '#34d399' : C.white;
        const ipTagStyle = success ? (isLatest ? s.ipTagWhite : s.ipTagBlueDk) : s.ipTagRed;
        const ipLabelStyle = success ? (isLatest ? s.ipTagLabelDark : s.ipTagLabelLight) : s.ipTagLabelRed;
        const ipValueStyle = success ? (isLatest ? s.ipTagValueDark : s.ipTagValueYellow) : s.ipTagValueWhite;
        const agentTagStyle = success ? s.agentTagBrown : s.agentTagYellow;
        const agentTextStyle = success ? s.agentTagTextWhite : s.agentTagTextDark;
        const footStyle = success ? (isLatest ? s.logFootYellow : s.logFootBlue) : s.logFootRed;
        const copyBtnStyle = success ? (isLatest ? s.copyBtnWhite : s.copyBtnBlue) : s.copyBtnBlue;
        const inspectBtnStyle = success ? (isLatest ? s.inspectBtnBlue : s.inspectBtnYellow) : s.inspectBtnYellow;
        const inspectLabelStyle = { fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: success ? C.white : C.primaryDark };
        const authLabel = success ? (isLatest ? s.authLabelDark : s.authLabelLight) : s.authLabelRed;
        const authValueColor = success ? (isLatest ? C.headerBg : C.yellowLight) : '#fb7185';
        const authValue = success ? (log.agent?.toLowerCase().includes('android') || log.agent?.toLowerCase().includes('okhttp') ? 'Basic Auth' : 'Token Bearer') : `Status: ${log.statusCode ?? 'Gagal'}`;

        return (
            <View key={String(log.id ?? Math.random())} style={cardStyle}>
                <View style={s.logHead}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={idStyle}>{log.id != null ? `#${log.id}` : '#'}</Text>
                        <View style={badgeStyle}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: badgeDot }} />
                            <Text style={s.logBadgeTextWhite}>{success ? 'Sukses' : 'Gagal'}</Text>
                        </View>
                    </View>
                    <Text style={dateStyle}>{log.date ?? '-'}</Text>
                </View>
                <Text style={emailStyle}>{log.email || 'unknown'}</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                    <View style={ipTagStyle}>
                        <Text style={ipLabelStyle}>IP: </Text>
                        <Text style={ipValueStyle}>{log.ip || '-'}</Text>
                        {!success && (
                            <View style={{ backgroundColor: C.red500, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 6 }}><Text style={{ fontSize: 9, fontWeight: '700', color: C.white }}>Alert</Text></View>
                        )}
                        {success && log.ip === '127.0.0.1' && (
                            <View style={{ backgroundColor: C.emerald500, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 6 }}><Text style={{ fontSize: 9, fontWeight: '700', color: C.white }}>Localhost</Text></View>
                        )}
                    </View>
                    {log.agent ? (
                        <View style={agentTagStyle}><Text style={agentTextStyle}>{`🤖 ${log.agent}`}</Text></View>
                    ) : null}
                </View>

                {!success && log.reason ? (
                    <View style={s.reasonBox}>
                        <Text style={{ fontSize: 18 }}>⚠️</Text>
                        <Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.primaryDark }}>Alasan: <Text style={{ color: C.red900 }}>{`"${log.reason}"`}</Text></Text>
                    </View>
                ) : null}

                <View style={footStyle}>
                    <Text style={authLabel}>Auth: <Text style={{ color: authValueColor, fontWeight: '700' }}>{authValue}</Text></Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <View style={copyBtnStyle}><Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: success ? C.primaryDark : C.white }}>Salin IP</Text></View>
                        {!success ? (
                            <View style={s.blockBtnRed}><Text style={{ fontSize: 11, fontWeight: '700', fontFamily: 'monospace', color: C.white }}>Block IP</Text></View>
                        ) : (
                            <View style={inspectBtnStyle}><Text style={inspectLabelStyle}>Inspect</Text></View>
                        )}
                    </View>
                </View>
            </View>
        );
    };

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
                    <TouchableOpacity style={s.tuneBtn} onPress={onRefresh} disabled={refreshing}>
                        {refreshing ? <ActivityIndicator size="small" color={C.white} /> : <Text style={{ fontSize: 20 }}>⚙️</Text>}
                    </TouchableOpacity>
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
                            <Text style={s.metricValueWhite}>{totalLogs}</Text>
                            <Text style={s.metricSubLight}>Sesi Tercatat</Text>
                        </View>
                    </View>

                    <View style={s.metricCardGreen}>
                        <Text style={s.metricLabelGreen}>BERHASIL</Text>
                        <View style={{ marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Text style={s.metricValueWhite}>{successCount}</Text>
                                <View style={s.percBadgeWhite}><Text style={s.percTextGreen}>{successPercent}%</Text></View>
                            </View>
                            <Text style={s.metricSubGreen}>Tingkat Normal</Text>
                        </View>
                    </View>

                    <View style={s.metricCardYellow}>
                        <Text style={s.metricLabelDark}>GAGAL / ALERT</Text>
                        <View style={{ marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Text style={s.metricValueAlert}>{failedCount}</Text>
                                <View style={s.percBadgeRed}><Text style={s.percTextWhite}>! Alert</Text></View>
                            </View>
                            <Text style={s.metricSubDark}>{failedCount} Anomali</Text>
                        </View>
                    </View>
                </View>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
                    <TouchableOpacity style={[s.filterPill, filter === 'all' ? s.filterPillActiveYellow : s.filterPillBlue]} onPress={() => setFilter('all')}>
                        <Text style={[s.filterText, filter === 'all' && { color: C.primaryDark }]}>Semua</Text>
                        <View style={[s.filterCount, { backgroundColor: C.headerBg }]}><Text style={s.filterCountText}>{filterCounts.all}</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[s.filterPill, filter === 'success' ? s.filterPillActiveGreen : s.filterPillBlueBorder]} onPress={() => setFilter('success')}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#34d399' }} />
                        <Text style={[s.filterText, { color: C.emerald500 }]}>Sukses</Text>
                        <View style={[s.filterCount, { backgroundColor: C.emerald700 }]}><Text style={s.filterCountText}>{filterCounts.success}</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[s.filterPill, filter === 'failed' ? s.filterPillActiveRed : s.filterPillBlueBorder]} onPress={() => setFilter('failed')}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.red500 }} />
                        <Text style={[s.filterText, { color: '#fda4af' }]}>Gagal</Text>
                        <View style={[s.filterCount, { backgroundColor: C.red800 }]}><Text style={s.filterCountText}>{filterCounts.failed}</Text></View>
                    </TouchableOpacity>
                </ScrollView>

                {/* Logs */}
                {loading ? (
                    <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                        <ActivityIndicator size="large" color={C.white} />
                        <Text style={{ color: C.blue200, marginTop: 12, fontFamily: 'monospace' }}>Memuat log login...</Text>
                    </View>
                ) : filteredLogs.length === 0 ? (
                    <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                        <Text style={{ color: C.blue200, fontFamily: 'monospace' }}>Tidak ada log yang ditemukan</Text>
                    </View>
                ) : (
                    <View style={{ gap: 14, marginTop: 4 }}>
                        {filteredLogs.map(renderLog)}
                    </View>
                )}

                {/* Pagination Summary */}
                <View style={s.summaryBar}>
                    <Text style={{ fontSize: 11, fontWeight: '600', fontFamily: 'monospace', color: C.blue200 }}>Menampilkan {filteredLogs.length} dari {totalLogs} log</Text>
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

