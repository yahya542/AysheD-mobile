import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, T, R, S } from '../tokens';
import { s } from './styles/financialLedgerStyles';

export default function FinancialLedger({ user, onLogout }) {
    const [haptic, setHaptic] = useState(true);

    return (
        <SafeAreaView style={s.root}>
            {/* Header */}
            <View style={s.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={s.logoCircle}><Text style={{ fontSize: 17 }}>🛡</Text></View>
                    <View>
                        <Text style={s.logoName}>AysheD</Text>
                        <Text style={s.logoSub}>Finance</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <View style={s.aesChip}><View style={s.greenDot} /><Text style={s.aesText}>AES-256</Text></View>
                    <TouchableOpacity style={s.keyBtn}><Text>🔑</Text></TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                {/* Balance Hero Card */}
                <View style={s.heroCard}>
                    <View style={s.heroCardRow}>
                        <Text style={s.heroLabel}>Saldo Terkonsolidasi</Text>
                        <View style={s.vaultPill}><Text style={s.vaultPillText}>Private Vault</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginBottom: 10 }}>
                        <Text style={s.currency}>Rp</Text>
                        <Text style={s.balance}>18.450.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text>📈</Text>
                        <Text style={s.growthText}>+8.4% rasio simpanan bulan ini</Text>
                    </View>

                    {/* Sub cards */}
                    <View style={s.subCards}>
                        <View style={s.subCard}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                <Text style={{ color: C.emerald, fontSize: 14 }}>↓</Text>
                                <Text style={s.subCardLabel}>Pemasukan</Text>
                            </View>
                            <Text style={s.subCardAmount}>Rp 12.000.000</Text>
                        </View>
                        <View style={s.subCard}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                <Text style={{ color: C.crimson, fontSize: 14 }}>↑</Text>
                                <Text style={s.subCardLabel}>Pengeluaran</Text>
                            </View>
                            <Text style={s.subCardAmount}>Rp 5.820.000</Text>
                        </View>
                    </View>

                    {/* Budget */}
                    <View style={s.budgetSection}>
                        <View style={s.budgetRow}>
                            <Text style={s.budgetTitle}>Alokasi Anggaran</Text>
                            <Text style={s.budgetSub}>Batas Aman 60%</Text>
                        </View>
                        <View style={{ marginBottom: 12 }}>
                            <View style={s.budgetLabelRow}>
                                <Text style={s.budgetItemLabel}>Kebutuhan Pokok</Text>
                                <Text style={s.budgetItemAmt}>Rp 3,1M <Text style={s.budgetItemMax}>/ 5M</Text></Text>
                            </View>
                            <View style={s.bar}><View style={[s.barFill, { width: '62%', backgroundColor: C.champagneGold }]} /></View>
                        </View>
                        <View>
                            <View style={s.budgetLabelRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.crimson }} />
                                    <Text style={[s.budgetItemLabel, { color: C.crimson }]}>Hiburan & Gaya Hidup</Text>
                                </View>
                                <Text style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: '700', color: C.crimson }}>121% <Text style={{ fontWeight: '400', color: C.charcoalSub }}>(Kritis)</Text></Text>
                            </View>
                            <View style={s.bar}><View style={[s.barFill, { width: '100%', backgroundColor: C.crimson }]} /></View>
                        </View>
                    </View>
                </View>

                {/* Alert Card */}
                <View style={s.alertCard}>
                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                        <View style={s.alertIcon}><Text style={{ fontSize: 20 }}>🔔</Text></View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                <Text style={s.alertGoldLabel}>Deteksi Impulsif</Text>
                                <View style={s.alertPct}><Text style={s.alertPctText}>23.5% Rasio</Text></View>
                            </View>
                            <Text style={s.alertTitle}>Pengeluaran Hiburan Melebihi Batas Toleransi</Text>
                        </View>
                    </View>
                    <Text style={s.alertBody}>Model on-device mendeteksi 3 transaksi beruntun melampaui ambang batas 20% penghasilan bulanan.</Text>
                    <View style={s.alertFoot}>
                        <TouchableOpacity style={s.hapticBtn} onPress={() => setHaptic(!haptic)}>
                            <Text style={{ color: C.champagneGold, fontSize: 16 }}>📳</Text>
                            <Text style={s.hapticText}>Haptic: {haptic ? 'Aktif' : 'Senyap'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text style={s.adjustLink}>Sesuaikan Limit</Text>
                            <Text style={{ color: C.charcoal }}>→</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={s.section}>
                    <View style={s.sectionHead}>
                        <Text style={s.sectionTitle}>Aksi Cepat</Text>
                        <Text style={s.sectionSub}>Enkripsi SHA-256</Text>
                    </View>
                    <View style={s.actionGrid}>
                        {[
                            { icon: '➕', label: 'Catat', accent: true },
                            { icon: '🔐', label: 'Budget' },
                            { icon: '🔒', label: 'Kunci DB' },
                            { icon: '☁️', label: 'Sinkron' },
                        ].map((a) => (
                            <TouchableOpacity key={a.label} style={s.actionTile}>
                                <View style={[s.actionIconWrap, a.accent && s.actionIconAccent]}>
                                    <Text style={{ fontSize: 20 }}>{a.icon}</Text>
                                </View>
                                <Text style={[s.actionLabel, a.accent && s.actionLabelAccent]}>{a.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Transactions */}
                <View style={s.section}>
                    <View style={s.sectionHead}>
                        <Text style={s.sectionTitle}>Transaksi Terbaru</Text>
                        <Text style={s.lihatLink}>Lihat Semua</Text>
                    </View>
                    <View style={{ gap: 10 }}>
                        <TxItem icon="☕" title="Specialty Cold Brew Double" sub="Kopi & Kuliner • 14:32" amount="-Rp 45.000" status="Tersimpan" />
                        <TxItem icon="☁️" title="FastAPI Enterprise Cluster Sync" sub="Langganan Cloud • Kemarin" amount="-Rp 275.000" status="Tersimpan" />
                        <TxItem icon="🎮" title="Mechanical Keyboard Switches" sub="Belanja Hiburan • Terdeteksi Impulsif" amount="-Rp 1.500.000" status="Perhatian" danger />
                        <TxItem icon="💸" title="Payroll Direct Deposit" sub="Gaji • 01 Nov" amount="+Rp 12.000.000" status="Berhasil" income />
                    </View>
                </View>

                <View style={{ height: 80 }} />
            </ScrollView>

            {/* Bottom Nav */}
            <BottomNav active="ledger" onLogout={onLogout} />
        </SafeAreaView>
    );
}

function TxItem({ icon, title, sub, amount, status, danger, income }) {
    const amtColor = income ? C.emerald : danger ? C.crimson : C.charcoal;
    return (
        <View style={[s.txItem, danger && { borderColor: 'rgba(220,38,38, 0.4)' }]}>
            <View style={[s.txIcon, danger && { backgroundColor: C.crimsonSubtle, borderColor: '#FECACA' }, income && { backgroundColor: C.emeraldSubtle, borderColor: '#D1FAE5' }]}>
                <Text style={{ fontSize: 20 }}>{icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={s.txTitle}>{title}</Text>
                <Text style={[s.txSub, danger && { color: C.crimson }, income && { color: C.emerald }]}>{sub}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={[s.txAmount, { color: amtColor }]}>{amount}</Text>
                <Text style={[s.txStatus, { color: amtColor }]}>{status}</Text>
            </View>
        </View>
    );
}

function BottomNav({ active, onLogout }) {
    const items = [
        { id: 'ledger', icon: '👛', label: 'Ledger' },
        { id: 'threats', icon: '📡', label: 'Threats' },
        { id: 'nodes', icon: '🔗', label: 'Nodes' },
        { id: 'security', icon: '🛡', label: 'Security' },
    ];
    return (
        <View style={s.navDock}>
            <View style={s.navInner}>
                {items.map(item => (
                    <TouchableOpacity key={item.id} style={[s.navItem, active === item.id && s.navItemActive]}>
                        <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                        <Text style={[s.navLabel, active === item.id && s.navLabelActive]}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

