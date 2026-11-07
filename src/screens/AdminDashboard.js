import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { auth } from '../services/auth';

export default function AdminDashboard({ user, onLogout }) {
    const email = user?.identifier || 'admin@ayshed.biz.id';

    // Navigation state: 'dashboard' | 'suspend' | 'listUser' | 'listContainer'
    const [view, setView] = useState('dashboard');

    // Suspend modal state
    const [suspendModalVisible, setSuspendModalVisible] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [suspendLoading, setSuspendLoading] = useState(false);
    const [suspendMessage, setSuspendMessage] = useState('');

    // List user state
    const [listUsers, setListUsers] = useState([]);
    const [listUsersLoading, setListUsersLoading] = useState(false);

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

    const loadListUsers = async () => {
        setListUsersLoading(true);
        try {
            const users = await auth.getUsers();
            setListUsers(users || []);
        } catch (err) {
            setListUsers([]);
        } finally {
            setListUsersLoading(false);
        }
    };

    const renderHeader = () => (
        <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1e293b' }}>
            <View>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Admin Dashboard</Text>
                <Text style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{email}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#334155', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }} onPress={onLogout}>
                <Text style={{ color: '#e2e8f0', fontSize: 12, fontWeight: '700' }}>KELUAR</Text>
            </TouchableOpacity>
        </View>
    );

    const renderBackButton = () => (
        <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8 }}
            onPress={() => setView('dashboard')}
        >
            <Text style={{ color: '#facc15', fontSize: 16, fontWeight: '700' }}>← Kembali</Text>
        </TouchableOpacity>
    );

    const renderGrid = () => (
        <View style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                <TouchableOpacity
                    style={{ flex: 1, minWidth: '45%', backgroundColor: '#1e293b', borderRadius: 12, padding: 20, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#334155' }}
                    onPress={openSuspendModal}
                >
                    <Text style={{ fontSize: 28 }}>🚫</Text>
                    <Text style={{ color: '#e2e8f0', fontSize: 13, fontWeight: '700' }}>Suspend</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1, minWidth: '45%', backgroundColor: '#1e293b', borderRadius: 12, padding: 20, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#334155' }}
                    onPress={() => { setView('listUser'); loadListUsers(); }}
                >
                    <Text style={{ fontSize: 28 }}>👥</Text>
                    <Text style={{ color: '#e2e8f0', fontSize: 13, fontWeight: '700' }}>List User</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1, minWidth: '45%', backgroundColor: '#1e293b', borderRadius: 12, padding: 20, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#334155' }}
                    onPress={() => setView('listContainer')}
                >
                    <Text style={{ fontSize: 28 }}>📦</Text>
                    <Text style={{ color: '#e2e8f0', fontSize: 13, fontWeight: '700' }}>List Container</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderListUser = () => (
        <View style={{ flex: 1 }}>
            {renderBackButton()}
            <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
                {listUsersLoading ? (
                    <ActivityIndicator color="#facc15" />
                ) : listUsers.length === 0 ? (
                    <Text style={{ color: '#94a3b8', textAlign: 'center', marginTop: 24 }}>Tidak ada user</Text>
                ) : (
                    listUsers.map((u) => (
                        <View key={u.id} style={{ backgroundColor: '#1e293b', borderRadius: 10, padding: 14, borderWidth: 1, borderColor: '#334155' }}>
                            <Text style={{ color: '#e2e8f0', fontWeight: '600', fontSize: 13 }}>{u.email}</Text>
                            <Text style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>Role: {u.role} | Status: {u.is_active ? 'Aktif' : 'Suspended'}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );

    const renderListContainer = () => (
        <View style={{ flex: 1 }}>
            {renderBackButton()}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                <Text style={{ fontSize: 14, color: '#94a3b8', textAlign: 'center' }}>
                    Fitur List Container sedang dalam pengembangan.
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
            {renderHeader()}
            {view === 'dashboard' && (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {renderGrid()}
                </ScrollView>
            )}
            {view === 'listUser' && renderListUser()}
            {view === 'listContainer' && renderListContainer()}

            {/* Suspend Modal */}
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
