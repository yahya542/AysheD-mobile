import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../services/auth';

export default function UfwLogs({ onBack }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await auth.getUfwLogs();
      const arr = Array.isArray(res?.logs) ? res.logs : Array.isArray(res) ? res : [];
      setLogs(arr.slice(0, 25));
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1e3a8a' }}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#facc15', fontSize: 16, fontWeight: '700' }}>UFW Logs</Text>
        {onBack ? <Text style={{ color: '#bfdbfe' }} onPress={onBack}>Kembali</Text> : null}
      </View>
      {loading ? (
        <ActivityIndicator color="#facc15" style={{ marginTop: 24 }} />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
          {logs.length === 0 ? (
            <Text style={{ color: '#bfdbfe', textAlign: 'center' }}>Tidak ada log</Text>
          ) : (
            logs.map((l, i) => (
              <View key={i} style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 12 }}>
                <Text style={{ color: '#1e3a8a', fontWeight: '600', fontSize: 12 }}>{l.email || 'unknown'}</Text>
                <Text style={{ color: '#64748b', fontSize: 11 }}>IP: {l.ip_address || '-'} | {l.success ? 'Sukses' : 'Gagal'} | {l.timestamp}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
