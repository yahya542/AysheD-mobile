import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { C, s } from './styles/loginScreenStyles';
import { auth } from '../services/auth';

export default function LoginScreen({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const user = await auth.login({ email, password });
      onLogin(user);
    } catch (err) {
      // Debug: log error untuk diagnosis
      console.log('[LOGIN ERROR]', err.name, err.message);

      // Jika error jaringan / server tidak terhubung
      // TypeError = fetch gagal (network error)
      // Jika pesan mengandung 'Network', 'fetch', atau 'Failed to fetch'
      const isNetworkError = err.name === 'TypeError' ||
        (err.message && (
          err.message.toLowerCase().includes('network') ||
          err.message.toLowerCase().includes('fetch') ||
          err.message.toLowerCase().includes('failed to fetch') ||
          err.message.toLowerCase().includes('connection')
        ));

      if (isNetworkError) {
        setError("Terjadi kesalahan pada sistem");
      } else {
        // Jika kredensial tidak valid (401 dari backend) atau error lain
        setError("Maaf Username dan password salah");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={s.container}>
          {/* Header Logos */}
          <View style={s.logoContainer}>
            <View style={s.shieldIconWrap}>
              <View style={s.imageGridRow}>
                
                <Image
                  source={require("../../assets/images/logo4.png")}
                  style={s.logo}
                />
                <Image
                  source={require("../../assets/images/logo2.png")}
                  style={s.logo2}
                />
                <Image
                  source={require("../../assets/images/logo3.png")}
                  style={s.logo}
                />
              </View>
            </View>
          </View>

           {/* Login Card */}
          <View style={s.card}>
            {error ? (
              <View style={s.loginErrorBox}>
                <Text style={s.loginErrorText}>Maaf Username dan password salah</Text>
                {/* <Text style={s.errorText}>{error}</Text> */}
              </View>
            ) : null}

            <View style={s.inputWrap}>
              <Text style={s.inputLabel}>Email</Text>
              <TextInput
                style={s.input}
                value={email}
                onChangeText={setEmail}
                placeholder="masukkan email anda disini"
                placeholderTextColor={C.blue300}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={s.inputWrap}>
              <Text style={s.inputLabel}>Password</Text>
              <TextInput
                style={s.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={C.blue300}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={s.loginBtn}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={C.primaryDark} size="small" />
              ) : (
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Text style={s.loginBtnText}>OTENTIKASI</Text>
                 {/*  <Text style={{ fontSize: 16 }}>🔒</Text> */}
                </View>
              )}
            </TouchableOpacity>

            <View style={s.serverStatus}>
              <TouchableOpacity onPress={onRegister}>
              <Text> Belum punya akun ? </Text>
                <Text style={s.linkText}>Registrasi di sini </Text>
              </TouchableOpacity>
              
             {/*  <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: C.green500,
                }}
              /> */}
{/*               <Text style={s.serverStatusText}>
                Gateway Server Aktif • Latensi 14ms
              </Text> */}
            </View>
          
            
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
