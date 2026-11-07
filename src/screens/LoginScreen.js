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
import { login as performLogin } from '../services/auth';

export default function LoginScreen({ onLogin }) {
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
      const user = await performLogin({ email, password });
      onLogin(user);
    } catch (err) {
      setError(err.message || "Otentikasi gagal. Periksa kredensial Anda.");
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
              <View style={s.errorBox}>
                <Text style={{ fontSize: 14 }}>⚠️</Text>
                <Text style={s.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={s.inputWrap}>
              <Text style={s.inputLabel}>IDENTIFIER PENGGUNA</Text>
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
              <Text style={s.inputLabel}>KUNCI KRIPTOGRAFIS (KATA SANDI)</Text>
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
                  <Text style={{ fontSize: 16 }}>🔒</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={s.serverStatus}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: C.green500,
                }}
              />
              <Text style={s.serverStatusText}>
                Gateway Server Aktif • Latensi 14ms
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
            {/* <View style={{ alignItems: 'center', marginTop: 12 }}>
                            <Text style={s.title}>SENTINEL VANGUARD</Text>
                            <View style={s.authBadge}>
                                <View style={s.authDot} />
                                <Text style={s.authBadgeText}>SECURE AUTHENTICATION</Text>
                            </View>
                        </View> */}
          </View>

           {/* Login Card */}
          <View style={s.card}>
            {error ? (
              <View style={s.errorBox}>
                <Text style={{ fontSize: 14 }}>⚠️</Text>
                <Text style={s.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={s.inputWrap}>
              <Text style={s.inputLabel}>IDENTIFIER PENGGUNA</Text>
              <TextInput
                style={s.input}
                value={email}
                onChangeText={setEmail}
                placeholder="masukkan email anda disini"
                placeholderTextColor={C.blue300}
                autoCapitalize="none"
              />
            </View>

            <View style={s.inputWrap}>
              <Text style={s.inputLabel}>KUNCI KRIPTOGRAFIS (KATA SANDI)</Text>
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
                  <Text style={{ fontSize: 16 }}>🔒</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={s.serverStatus}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: C.green500,
                }}
              />
              <Text style={s.serverStatusText}>
                Gateway Server Aktif • Latensi 14ms
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
