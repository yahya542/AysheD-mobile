import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../services/auth";

export default function RegisterScreen({ onBack, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi");
      return;
    }
    setLoading(true);
    try {
      await auth.register({
        email,
        password,
        full_name: fullName || null,
        birth_place: birthPlace || null,
        birth_date: birthDate || null,
      });
      setSuccess("Registrasi berhasil");
    } catch (err) {
      setError(err.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e3a8a" }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ color: "#facc15", fontSize: 18, fontWeight: "700", marginBottom: 16 }}>Registrasi</Text>
          {error ? <Text style={{ color: "#ef4444", marginBottom: 8 }}>{error}</Text> : null}
          {success ? <Text style={{ color: "#22c55e", marginBottom: 8 }}>{success}</Text> : null}
          <TextInput style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <TextInput style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <TextInput style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }} placeholder="Nama Lengkap" value={fullName} onChangeText={setFullName} />
          <TextInput style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }} placeholder="Tempat Lahir" value={birthPlace} onChangeText={setBirthPlace} />
          <TextInput style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }} placeholder="Tanggal Lahir (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} />
          <TouchableOpacity style={{ backgroundColor: "#facc15", padding: 14, borderRadius: 8, alignItems: "center" }} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#1e3a8a" /> : <Text style={{ color: "#1e3a8a", fontWeight: "700" }}>DAFTAR</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={onBack} style={{ marginTop: 12 }}>
            <Text style={{ color: "#bfdbfe" }}>Kembali</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
