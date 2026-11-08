import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
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
    const [chartData, setChartData] = useState({ daily: [], weekly: [], monthly: [] });
    const [chartRange, setChartRange] = useState('daily');
    const [chartLogs, setChartLogs] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await auth.getChartSummary();
                setChartData(data || { daily: [], weekly: [], monthly: [] });
            } catch (e) {
                console.log('CHART ERR', e.message);
            }
            try {
                const logs = await auth.getLoginLogs();
                setChartLogs(Array.isArray(logs) ? logs : []);
            } catch {}
        })();
    }, []);

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

    const handleUnsuspend = async () => {
        if (!selectedUserId) {
            setSuspendMessage('Pilih user terlebih dahulu');
            return;
        }
        setSuspendLoading(true);
        setSuspendMessage('');
        try {
            const result = await auth.unsuspendUser(String(selectedUserId));
            setSuspendMessage(result?.message || 'User berhasil diaktifkan');
        } catch (err) {
            setSuspendMessage('Gagal aktifkan: ' + (err.message || 'Unknown error'));
        } finally {
            setSuspendLoading(false);
        }
    };
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
                <Text style={{ fontSize: 12, color: '#fcfdff', marginTop: 2 }}>{email}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#ec0a0a', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }} onPress={onLogout}>
                <Text style={{ color: '#f3f0e5', fontSize: 12, fontWeight: '700' }}>KELUAR</Text>
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
        <View style={{ width: '100%', backgroundColor: '#ffffff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#bfdbfe' }}>
            <Text style={{ color: '#1e3a8a', fontWeight: '700', marginBottom: 8 }}>Grafik Login</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                {['daily','weekly','monthly'].map(r => (
                    <TouchableOpacity key={r} onPress={() => setChartRange(r)} style={{ padding: 6, backgroundColor: chartRange===r?'#facc15':'#dbeafe', borderRadius: 6 }}>
                        <Text style={{ color: '#1e3a8a', fontSize: 11, fontWeight: '700' }}>{r}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <LineChart
                data={{
                    labels: (chartData[chartRange] || []).map(d => d.x),
                    datasets: [
                        { data: (chartData[chartRange] || []).map(d => d.y || 0), color: () => '#22c55e', strokeWidth: 2 },
                    ],
                }}
                width={Dimensions.get('window').width - 64}
                height={180}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                    labelColor: () => '#1e3a8a',
                }}
                bezier
                style={{ borderRadius: 12 }}
            />
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
                    onPress={() => setView('logs')}>
                        <Text style={{ fontSize: 28 }}>📜</Text  >
                    <Text style={{ color: '#1e3a8a', fontSize: 13, fontWeight: '700' }}>Pantau Logs</Text>
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
                                style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#22c55e', alignItems: 'center', opacity: suspendLoading ? 0.5 : 1 }}
                                onPress={handleUnsuspend}
                                disabled={suspendLoading}
                            >
                                <Text style={{ color: '#ffffff', fontWeight: '700' }}>Aktifkan</Text>
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
