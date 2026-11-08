import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../services/auth';

function formatLog(l) {
  let dateStr = '-';
  let timeStr = '-';
  try {
    const d = new Date(l.timestamp);
    dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  } catch {}
  return { dateStr, timeStr };
}

export default function LoginLogs({ onBack }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await auth.getUfwLogs();
      const arr = Array.isArray(res) ? res : Array.isArray(res?.logs) ? res.logs : [];
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
        <Text style={{ color: '#facc15', fontSize: 16, fontWeight: '700' }}>Login Logs</Text>
        {onBack ? <Text style={{ color: '#bfdbfe' }} onPress={onBack}>Kembali</Text> : null}
      </View>
      {loading ? (
        <ActivityIndicator color="#facc15" style={{ marginTop: 24 }} />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
          {logs.length === 0 ? (
            <Text style={{ color: '#bfdbfe', textAlign: 'center' }}>Tidak ada log</Text>
          ) : (
            logs.map((l, i) => {
              const { dateStr, timeStr } = formatLog(l);
              const ok = !!l.success;
              return (
                <View key={i} style={{ backgroundColor: ok ? '#facc15' : '#ef4444', borderRadius: 10, padding: 12, gap: 4 }}>
                  <Text style={{ color: '#1e3a8a', fontWeight: '700', fontSize: 12 }}>IP: {l.ip_address || '-'}</Text>
                  <Text style={{ color: ok ? '#1e3a8a' : '#ffffff', fontSize: 11, fontWeight: '600' }}>Status: {ok ? 'Sukses' : 'Gagal'}</Text>
                  <Text style={{ color: ok ? '#1e3a8a' : '#ffffff', fontSize: 11 }}>Tanggal: {dateStr}</Text>
                  <Text style={{ color: ok ? '#1e3a8a' : '#ffffff', fontSize: 11 }}>Jam: {timeStr}</Text>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
