import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C } from '../tokens';
import { EMERALD, AMBER, s } from './styles/devSecOpsNodesStyles';

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

