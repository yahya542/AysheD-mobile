import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, T, R, S } from '../tokens';

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

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.canvasBg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12, backgroundColor: 'rgba(242,237,228,0.95)', borderBottomWidth: 1, borderBottomColor: C.champagneBorder },
    logoCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.white, borderWidth: 1, borderColor: C.champagneBorder, alignItems: 'center', justifyContent: 'center' },
    logoName: { fontSize: 15, fontWeight: '600', color: C.charcoal },
    logoSub: { fontSize: 10, color: C.charcoalSub, letterSpacing: 1, textTransform: 'uppercase' },
    aesChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: C.white, borderRadius: R.full, borderWidth: 1, borderColor: C.champagneBorder },
    aesText: { fontFamily: 'monospace', fontSize: 11, color: C.charcoalMuted },
    keyBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.white, borderWidth: 1, borderColor: C.champagneBorder, alignItems: 'center', justifyContent: 'center' },
    greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' },
    scroll: { padding: 20 },
    heroCard: { backgroundColor: C.white, borderRadius: R['3xl'], borderWidth: 1, borderColor: C.champagneBorder, padding: 28, marginBottom: 16 },
    heroCardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    heroLabel: { fontSize: 11, fontWeight: '600', color: C.champagneGold, textTransform: 'uppercase', letterSpacing: 1.5 },
    vaultPill: { paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#F3EDE0', borderRadius: R.full, borderWidth: 1, borderColor: C.champagneBorder },
    vaultPillText: { fontFamily: 'monospace', fontSize: 10, color: C.charcoalSub, textTransform: 'uppercase', letterSpacing: 1 },
    currency: { fontSize: 20, fontWeight: '300', color: C.champagneGold },
    balance: { fontSize: 40, fontWeight: '600', color: C.charcoal, letterSpacing: -1 },
    growthText: { fontSize: 13, fontWeight: '500', color: C.emerald },
    subCards: { flexDirection: 'row', gap: 14, marginTop: 24, marginBottom: 24 },
    subCard: { flex: 1, padding: 16, backgroundColor: C.champagneLight, borderRadius: R.xl, borderWidth: 1, borderColor: C.champagneBorder },
    subCardLabel: { fontSize: 11, fontWeight: '500', color: C.charcoalSub },
    subCardAmount: { fontFamily: 'monospace', fontSize: 15, fontWeight: '600', color: C.charcoal },
    budgetSection: { paddingTop: 20, borderTopWidth: 1, borderTopColor: C.champagneBorder },
    budgetRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    budgetTitle: { fontSize: 11, fontWeight: '600', color: C.charcoalMuted, textTransform: 'uppercase', letterSpacing: 1.5 },
    budgetSub: { fontSize: 10, color: C.charcoalSub },
    budgetLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    budgetItemLabel: { fontSize: 13, fontWeight: '500', color: C.charcoal },
    budgetItemAmt: { fontFamily: 'monospace', fontSize: 12, color: C.charcoalMuted },
    budgetItemMax: { fontWeight: '400', color: C.charcoalSub },
    bar: { height: 8, backgroundColor: '#F3EDE0', borderRadius: R.full, overflow: 'hidden' },
    barFill: { height: '100%', borderRadius: R.full },
    alertCard: { backgroundColor: C.white, borderRadius: R['3xl'], borderWidth: 1, borderColor: C.champagneBorder, padding: 24, marginBottom: 16 },
    alertIcon: { width: 40, height: 40, borderRadius: R.xl, backgroundColor: C.crimsonSubtle, borderWidth: 1, borderColor: '#FECACA', alignItems: 'center', justifyContent: 'center' },
    alertGoldLabel: { fontSize: 11, fontWeight: '600', color: C.champagneGold, textTransform: 'uppercase', letterSpacing: 1.5 },
    alertPct: { backgroundColor: C.crimsonSubtle, paddingHorizontal: 10, paddingVertical: 3, borderRadius: R.full, borderWidth: 1, borderColor: '#FECACA' },
    alertPctText: { fontFamily: 'monospace', fontSize: 10, color: C.crimson, fontWeight: '700' },
    alertTitle: { fontSize: 15, fontWeight: '600', color: C.charcoal },
    alertBody: { fontSize: 12, color: C.charcoalMuted, lineHeight: 18, marginBottom: 16 },
    alertFoot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTopWidth: 1, borderTopColor: C.champagneBorder },
    hapticBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 6, backgroundColor: C.champagneLight, borderRadius: R.full, borderWidth: 1, borderColor: C.champagneBorder },
    hapticText: { fontSize: 12, color: C.charcoalMuted, fontWeight: '500' },
    adjustLink: { fontSize: 12, fontWeight: '600', color: C.charcoal },
    section: { marginBottom: 16 },
    sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, marginBottom: 12 },
    sectionTitle: { fontSize: 12, fontWeight: '700', color: C.charcoal, textTransform: 'uppercase', letterSpacing: 1.5 },
    sectionSub: { fontFamily: 'monospace', fontSize: 10, color: C.champagneGold, letterSpacing: 1.5, textTransform: 'uppercase' },
    lihatLink: { fontSize: 11, fontWeight: '600', color: C.champagneGold },
    actionGrid: { flexDirection: 'row', gap: 12 },
    actionTile: { flex: 1, alignItems: 'center', padding: 14, backgroundColor: C.white, borderRadius: R.xl, borderWidth: 1, borderColor: C.champagneBorder },
    actionIconWrap: { width: 40, height: 40, borderRadius: R.lg, backgroundColor: C.champagneLight, borderWidth: 1, borderColor: C.champagneBorder, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
    actionIconAccent: { backgroundColor: C.champagneGold },
    actionLabel: { fontSize: 11, fontWeight: '500', color: C.charcoalMuted },
    actionLabelAccent: { fontWeight: '600', color: C.charcoal },
    txItem: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, backgroundColor: C.white, borderRadius: R.xl, borderWidth: 1, borderColor: C.champagneBorder },
    txIcon: { width: 44, height: 44, borderRadius: R.lg, backgroundColor: C.champagneLight, borderWidth: 1, borderColor: C.champagneBorder, alignItems: 'center', justifyContent: 'center' },
    txTitle: { fontSize: 14, fontWeight: '600', color: C.charcoal },
    txSub: { fontSize: 11, color: C.charcoalSub, marginTop: 2 },
    txAmount: { fontFamily: 'monospace', fontSize: 14, fontWeight: '700' },
    txStatus: { fontFamily: 'monospace', fontSize: 10, fontWeight: '600' },
    navDock: { position: 'absolute', bottom: 16, left: 20, right: 20 },
    navInner: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: C.white, borderRadius: R.xl, borderWidth: 1, borderColor: C.champagneBorder, paddingVertical: 8, paddingHorizontal: 12, shadowColor: '#1C1917', shadowOpacity: 0.06, shadowRadius: 16, elevation: 6 },
    navItem: { alignItems: 'center', paddingHorizontal: 16, paddingVertical: 6, borderRadius: R.lg },
    navItemActive: { backgroundColor: C.champagneLight, borderWidth: 1, borderColor: C.champagneBorder },
    navLabel: { fontSize: 10, fontWeight: '500', color: C.charcoalSub, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
    navLabelActive: { fontWeight: '700', color: C.charcoal },
});
