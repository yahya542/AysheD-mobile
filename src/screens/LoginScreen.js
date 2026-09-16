import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    KeyboardAvoidingView, Platform, ScrollView, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, T, R, S } from '../tokens';

export default function LoginScreen({ onLogin }) {
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('user@ayshed.app');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);

    const switchRole = (r) => {
        setRole(r);
        setEmail(r === 'user' ? 'user@ayshed.app' : 'admin.ops@ayshed.security');
    };

    const handleLogin = () => {
        const finalRole = role === 'admin' ? 'superadmin' : 'user';
        onLogin({ identifier: email, role: finalRole });
    };

    return (
        <SafeAreaView style={s.root}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

                    {/* Top Bar */}
                    <View style={s.topBar}>
                        <View style={s.logoWrap}>
                            <Text style={s.logoIcon}>🛡</Text>
                        </View>
                        <View>
                            <Text style={s.logoName}>AysheD</Text>
                            <Text style={s.logoSub}>Finance</Text>
                        </View>
                        <View style={s.sovereignBadge}>
                            <View style={s.greenDot} />
                            <Text style={s.sovereignText}>SOVEREIGN</Text>
                        </View>
                    </View>

                    {/* Hero */}
                    <View style={s.hero}>
                        <View style={s.fingerprintWrap}>
                            <Text style={{ fontSize: 34 }}>👆</Text>
                            <View style={s.greenDotAbs} />
                        </View>
                        <View style={s.heroBadge}>
                            <View style={s.greenDot} />
                            <Text style={s.heroBadgeText}>Zero-Trust Sovereign Gateway</Text>
                        </View>
                        <Text style={s.heroTitle}>Private Portal Access</Text>
                        <Text style={s.heroSub}>Encrypted Financial Ledger & Core Infrastructure</Text>
                    </View>

                    {/* Role Selector */}
                    <View style={s.roleCard}>
                        <View style={s.roleHeader}>
                            <Text style={s.roleHeaderLabel}>Session Context</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <View style={s.greenDot} />
                                <Text style={s.roleActiveText}>{role === 'user' ? 'FIN_LEDGER ACTIVE' : 'SOC_TERMINAL ACTIVE'}</Text>
                            </View>
                        </View>
                        <View style={s.roleToggleWrap}>
                            <TouchableOpacity
                                style={[s.roleBtn, role === 'user' && s.roleBtnActive]}
                                onPress={() => switchRole('user')}
                            >
                                <Text style={{ fontSize: 16 }}>👛</Text>
                                <Text style={[s.roleBtnText, role === 'user' && s.roleBtnTextActive]}>[role: user]</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[s.roleBtn, role === 'admin' && s.roleBtnActive]}
                                onPress={() => switchRole('admin')}
                            >
                                <Text style={{ fontSize: 16 }}>💻</Text>
                                <Text style={[s.roleBtnText, role === 'admin' && s.roleBtnTextActive]}>[role: admin]</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Auth Form Card */}
                    <View style={s.formCard}>
                        {/* Email */}
                        <View style={s.fieldWrap}>
                            <View style={s.fieldLabelRow}>
                                <Text style={s.fieldLabel}>Client Identity</Text>
                                <View style={s.mtlsBadge}>
                                    <View style={s.greenDotSm} />
                                    <Text style={s.mtlsText}>mTLS VALIDATED</Text>
                                </View>
                            </View>
                            <View style={s.inputWrap}>
                                <Text style={s.inputIcon}>@</Text>
                                <TextInput
                                    style={s.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor="#A8A29E"
                                />
                            </View>
                        </View>

                        {/* Password */}
                        <View style={s.fieldWrap}>
                            <View style={s.fieldLabelRow}>
                                <Text style={s.fieldLabel}>ED25519 Cipher Phrase</Text>
                                <Text style={s.recoverKey}>RECOVER KEY</Text>
                            </View>
                            <View style={s.inputWrap}>
                                <Text style={s.inputIcon}>🔑</Text>
                                <TextInput
                                    style={[s.input, { flex: 1, fontFamily: 'monospace', letterSpacing: 2 }]}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPw}
                                    placeholder="Cipher passkey"
                                    placeholderTextColor="#A8A29E"
                                />
                                <TouchableOpacity onPress={() => setShowPw(!showPw)} style={{ paddingHorizontal: 10 }}>
                                    <Text style={{ color: C.charcoalMuted, fontSize: 16 }}>{showPw ? '🙈' : '👁'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Biometric */}
                        <TouchableOpacity style={s.biometricBtn}>
                            <Text style={{ fontSize: 20 }}>👆</Text>
                            <Text style={s.biometricText}>Biometric WebAuthn Passthrough</Text>
                        </TouchableOpacity>

                        {/* CTA */}
                        <TouchableOpacity style={s.ctaBtn} onPress={handleLogin}>
                            <Text style={{ fontSize: 18 }}>🔓</Text>
                            <Text style={s.ctaText}>Masuk</Text>
                            <View style={s.ctaRouteTag}>
                                <Text style={s.ctaRouteText}>→ {role === 'user' ? 'LEDGER' : 'SOC TERMINAL'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={s.footer}>
                        <Text style={s.footerLine}>✅ Client AES-256-GCM Secure Enclave</Text>
                        <Text style={s.footerSubs}>TLS 1.3 MESH  •  SHA-512  •  NODE ID-JKT-01</Text>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.canvasBg },
    scroll: { paddingHorizontal: 24, paddingBottom: 40 },
    topBar: { flexDirection: 'row', alignItems: 'center', paddingTop: 16, paddingBottom: 20, gap: 12 },
    logoWrap: { width: 36, height: 36, borderRadius: 12, backgroundColor: C.white, borderWidth: 1, borderColor: C.champagneBorder, alignItems: 'center', justifyContent: 'center' },
    logoIcon: { fontSize: 18 },
    logoName: { fontSize: 15, fontWeight: '700', color: C.charcoal },
    logoSub: { fontSize: 9, fontWeight: '500', color: C.charcoalMuted, letterSpacing: 1.5, textTransform: 'uppercase' },
    sovereignBadge: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: C.white, borderRadius: R.full, borderWidth: 1, borderColor: C.champagneBorder },
    sovereignText: { fontFamily: 'monospace', fontSize: 10, color: '#059669', fontWeight: '600', letterSpacing: 1 },
    greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' },
    greenDotSm: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#10B981' },
    greenDotAbs: { position: 'absolute', bottom: -2, right: -2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#10B981', borderWidth: 2, borderColor: C.white },
    hero: { alignItems: 'center', marginBottom: 28 },
    fingerprintWrap: { width: 76, height: 76, borderRadius: 24, backgroundColor: C.white, borderWidth: 1, borderColor: C.champagneBorder, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: C.white, borderRadius: R.full, borderWidth: 1, borderColor: C.champagneBorder, marginBottom: 12 },
    heroBadgeText: { fontFamily: 'monospace', fontSize: 10, color: C.charcoalMuted, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
    heroTitle: { fontSize: 26, fontWeight: '700', color: C.charcoal, letterSpacing: -0.5, textAlign: 'center' },
    heroSub: { fontSize: 13, color: C.charcoalMuted, textAlign: 'center', marginTop: 6 },
    roleCard: { backgroundColor: C.white, borderRadius: R['3xl'], borderWidth: 1, borderColor: C.champagneBorder, padding: 12, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
    roleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, paddingBottom: 10 },
    roleHeaderLabel: { fontFamily: 'monospace', fontSize: 9, color: C.charcoalMuted, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: '600' },
    roleActiveText: { fontFamily: 'monospace', fontSize: 11, color: '#059669', fontWeight: '600' },
    roleToggleWrap: { flexDirection: 'row', gap: 8, backgroundColor: '#FAF7F2', padding: 6, borderRadius: R.xl, borderWidth: 1, borderColor: C.champagneBorder },
    roleBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 10, borderRadius: R.lg, borderWidth: 1, borderColor: 'transparent' },
    roleBtnActive: { backgroundColor: C.white, borderColor: C.champagneBorder, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
    roleBtnText: { fontFamily: 'monospace', fontSize: 11, fontWeight: '500', color: C.charcoalMuted },
    roleBtnTextActive: { fontWeight: '700', color: C.charcoal },
    formCard: { backgroundColor: C.white, borderRadius: R['3xl'], borderWidth: 1, borderColor: C.champagneBorder, padding: 24, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, elevation: 2, gap: 16 },
    fieldWrap: { gap: 6 },
    fieldLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    fieldLabel: { fontFamily: 'monospace', fontSize: 10, fontWeight: '600', color: C.charcoalMuted, letterSpacing: 1.5, textTransform: 'uppercase' },
    mtlsBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: R.full, borderWidth: 1, borderColor: '#D1FAE5' },
    mtlsText: { fontFamily: 'monospace', fontSize: 9, color: '#059669', fontWeight: '500' },
    recoverKey: { fontFamily: 'monospace', fontSize: 10, color: C.goldAccent, fontWeight: '600', letterSpacing: 1 },
    inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAF8F5', borderRadius: R.lg, borderWidth: 1, borderColor: C.champagneBorder },
    inputIcon: { paddingLeft: 14, fontSize: 16, color: C.charcoalMuted },
    input: { flex: 1, paddingHorizontal: 10, paddingVertical: 12, fontSize: 14, color: C.charcoal, fontWeight: '500' },
    biometricBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 14, backgroundColor: '#FAF8F5', borderRadius: R.lg, borderWidth: 1, borderColor: C.champagneBorder },
    biometricText: { fontSize: 14, fontWeight: '500', color: C.charcoal, letterSpacing: 0.3 },
    ctaBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 52, backgroundColor: C.charcoal, borderRadius: R.lg, gap: 8 },
    ctaText: { fontSize: 15, fontWeight: '600', color: '#fff', letterSpacing: 0.5 },
    ctaRouteTag: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: R.sm },
    ctaRouteText: { fontFamily: 'monospace', fontSize: 10, color: '#F2ECE1', textTransform: 'uppercase', letterSpacing: 1 },
    footer: { alignItems: 'center', gap: 6, paddingTop: 24 },
    footerLine: { fontFamily: 'monospace', fontSize: 11, color: C.charcoalMuted, fontWeight: '500' },
    footerSubs: { fontFamily: 'monospace', fontSize: 9, color: '#A8A29E', letterSpacing: 1.5, textTransform: 'uppercase' },
});
