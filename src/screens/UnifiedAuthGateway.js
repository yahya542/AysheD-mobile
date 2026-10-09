import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import { auth } from '../services/auth';
import { styles } from './styles/unifiedAuthGatewayStyles';

export default function UnifiedAuthGateway({ onLoginSuccess }) {
    const [email, setEmail] = useState('superadmin@ayshed.biz.id');
    const [password, setPassword] = useState('superadmin123');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Login', 'Email dan password wajib diisi');
            return;
        }
        setLoading(true);
        try {
            const user = await auth.login({ email, password });
            onLoginSuccess(user);
        } catch (error) {
            Alert.alert('Login gagal', error.message || 'Cek email/password atau koneksi ke apiSEC');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>AysheD Authentication</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="user@example.com"
                    placeholderTextColor="#A8A29E"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#A8A29E"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.colors.onPrimary} />
                    ) : (
                        <Text style={styles.primaryButtonText}>MASUK</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
