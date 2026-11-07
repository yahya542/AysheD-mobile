import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { auth } from '../services/auth';

export default function SuperAdminDashboard({ user, onLogout }) {
    const email = user?.identifier || 'superadmin@ayshed.biz.id';

    const [suspendModalVisible, setSuspendModalVisible] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [suspendLoading, setSuspendLoading] = useState(false);
    const [suspendMessage, setSuspendMessage] = useState('');

    const openSuspendModal = async () => {
        setSuspendMessage('');
        setSelectedUserId(null);
        setSuspendModalVisible(true);
        try {
            const users = await auth.getUsers();
            setUsersList(users || []);
        } catch (err) {
            setSuspendMessage('Gagal memuat daftar user: ' + (err.message || 'Unknown error'));
        }
    };

    const handleSuspend = async () => {
        if (!selectedUserId) {
            setSuspendMessage('Pilih user terlebih dahulu');
            return;
        }
        setSuspendLoading(true);
        setSuspendMessage('');
        try {
            const result = await auth.suspendUser(selectedUserId);
            setSuspendMessage(result?.message || 'User berhasil di-suspend');
        } catch (err) {
            setSuspendMessage('Gagal suspend: ' + (err.message || 'Unknown error'));
        } finally {
            setSuspendLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
            <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1e293b' }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>SecOps Executive</Text>
                    <Text style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{email}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity style={{ backgroundColor: '#ef4444', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }} onPress={openSuspendModal}>
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>SUSPEND</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#334155', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }} onPress={onLogout}>
                        <Text style={{ color: '#e2e8f0', fontSize: 12, fontWeight: '700' }}>KELUAR</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                <Text style={{ fontSize: 14, color: '#94a3b8', textAlign: 'center' }}>
                    Dashboard SuperAdmin — fitur ancaman dan audit log sedang dalam pengembangan.
                </Text>
            </View>

            <Modal
                visible={suspendModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setSuspendModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '90%', backgroundColor: '#1e293b', borderRadius: 12, padding: 20, maxHeight: '70%' }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 12 }}>Suspend Akun</Text>

                        {suspendLoading && <ActivityIndicator color="#facc15" style={{ marginBottom: 12 }} />}

                        {suspendMessage ? (
                            <Text style={{ color: suspendMessage.includes('Gagal') ? '#ef4444' : '#22c55e', marginBottom: 12, fontSize: 13 }}>
                                {suspendMessage}
                            </Text>
                        ) : null}

                        <ScrollView style={{ maxHeight: 200, marginBottom: 12 }}>
                            {usersList.map((u) => (
                                <TouchableOpacity
                                    key={u.id}
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                        marginBottom: 6,
                                        backgroundColor: selectedUserId === u.id ? '#facc15' : '#334155',
                                    }}
                                    onPress={() => setSelectedUserId(u.id)}
                                >
                                    <Text style={{ color: selectedUserId === u.id ? '#0f172a' : '#e2e8f0', fontWeight: '600', fontSize: 13 }}>
                                        {u.email}
                                    </Text>
                                    <Text style={{ color: selectedUserId === u.id ? '#0f172a' : '#94a3b8', fontSize: 11, marginTop: 2 }}>
                                        Role: {u.role} | Status: {u.is_active ? 'Aktif' : 'Suspended'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity
                                style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#334155', alignItems: 'center' }}
                                onPress={() => setSuspendModalVisible(false)}
                            >
                                <Text style={{ color: '#e2e8f0', fontWeight: '600' }}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#ef4444', alignItems: 'center', opacity: suspendLoading ? 0.5 : 1 }}
                                onPress={handleSuspend}
                                disabled={suspendLoading}
                            >
                                <Text style={{ color: '#fff', fontWeight: '700' }}>Suspend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
