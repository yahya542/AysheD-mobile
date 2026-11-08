import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { auth } from '../services/auth';
import UfwLogs from './Login-logs';

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
            const result = await auth.suspendUser(String(selectedUserId));
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
        <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#2563eb',  backgroundColor: '#facc15'}}>
            <View>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#070707', marginTop: 20, }}>Admin Dashboard</Text>
                <Text style={{ fontSize: 12, color: '#bfdbfe', marginTop: 2 }}>{email}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#dbeafe', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }} onPress={onLogout}>
                <Text style={{ color: '#facc15', fontSize: 12, fontWeight: '700' }}>KELUAR</Text>
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
        <View style={{ padding: 16, alignItems: 'center'  }}>
            <View style={{ width: 280, height: 280, borderRadius: 25, backgroundColor: '#ffffff', padding: 16, justifyContent: 'center', borderWidth: 1, borderColor: '#bfdbfe', width: '100%' }}>
           
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' , marginTop: 24 }}>
                <TouchableOpacity
                    style={{ flex: 1, minWidth: '45%', backgroundColor: '#facc15', borderRadius: 12, padding: 20, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#eab308' }}
                    onPress={openSuspendModal}
                >
                    <Text style={{ fontSize: 28 }}>🚫</Text>
                    <Text style={{ color: '#1e3a8a', fontSize: 13, fontWeight: '700' }}>Suspend</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1, minWidth: '45%', backgroundColor: '#facc15', borderRadius: 12, padding: 20, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#eab308' }}
                    onPress={() => { setView('listUser'); loadListUsers(); }}
                >
                    <Text style={{ fontSize: 28 }}>👥</Text>
                    <Text style={{ color: '#1e3a8a', fontSize: 13, fontWeight: '700' }}>List User</Text>
                </TouchableOpacity>
                 <TouchableOpacity
                    style={{ flex: 1, minWidth: '45%', backgroundColor: '#facc15', borderRadius: 12, padding: 20, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#eab308' }}
                    onPress={() => setView('logs')}
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
                    <Text style={{ color: '#bfdbfe', textAlign: 'center', marginTop: 24 }}>Tidak ada user</Text>
                ) : (
                    listUsers.map((u) => (
                        <View key={u.id} style={{ backgroundColor: '#ffffff', borderRadius: 10, padding: 14, borderWidth: 1, borderColor: '#bfdbfe' }}>
                            <Text style={{ color: '#1e3a8a', fontWeight: '600', fontSize: 13 }}>{u.email}</Text>
                            <Text style={{ color: '#bfdbfe', fontSize: 11, marginTop: 2 }}>Role: {u.role} | Status: {u.is_active ? 'Aktif' : 'Suspended'}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1e3a8a' }}>
            {renderHeader()}
            {view === 'dashboard' && (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {renderGrid()}
                </ScrollView>
            )}
            {view === 'listUser' && renderListUser()}
            {view === 'logs' && <UfwLogs onBack={() => setView('dashboard')} />}
            {view === 'listContainer' && renderListContainer()}

            {/* Suspend Modal */}
            <Modal
                visible={suspendModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setSuspendModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <View style={{ width: '90%', backgroundColor: '#ffffff', borderRadius: 12, padding: 20, maxHeight: '70%' }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#1e3a8a', marginBottom: 12 }}>Suspend Akun</Text>

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
                                        backgroundColor: selectedUserId === u.id ? '#facc15' : '#dbeafe',
                                    }}
                                    onPress={() => setSelectedUserId(u.id)}
                                >
                                    <Text style={{ color: selectedUserId === u.id ? '#1e3a8a' : '#1e3a8a', fontWeight: '600', fontSize: 13 }}>
                                        {u.email}
                                    </Text>
                                    <Text style={{ color: selectedUserId === u.id ? '#1e3a8a' : '#64748b', fontSize: 11, marginTop: 2 }}>
                                        Role: {u.role} | Status: {u.is_active ? 'Aktif' : 'Suspended'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity
                                style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#dbeafe', alignItems: 'center' }}
                                onPress={() => setSuspendModalVisible(false)}
                            >
                                <Text style={{ color: '#1e3a8a', fontWeight: '600' }}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#ef4444', alignItems: 'center', opacity: suspendLoading ? 0.5 : 1 }}
                                onPress={handleSuspend}
                                disabled={suspendLoading}
                            >
                                <Text style={{ color: '#1e3a8a', fontWeight: '700' }}>Suspend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
