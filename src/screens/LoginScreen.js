import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const C = {
  royalBg: "#1e3a8a",
  primaryDark: "#0f172a",
  cardBlue: "#172554",
  cardBlueLight: "#1e40af",
  accentYellow: "#fbbf24",
  accentYellowHover: "#f59e0b",
  borderBlue: "#2563eb",
  white: "#ffffff",
  slate500: "#64748b",
  blue200: "#bfdbfe",
  blue300: "#93c5fd",
  red500: "#ef4444",
  green500: "#10b981",
};

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("admin");

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock login logic
      if (email.includes("superadmin")) {
        onLogin({ id: 1, identifier: email, role: "superadmin" });
      } else {
        onLogin({ id: 2, identifier: email, role: "user" });
      }
    }, 1200);
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
                  source={require("../../assets/images/logo.png")}
                  style={s.logo}
            
                  
                />
                <Image
                  source={require("../../assets/images/logo2.png")}
                  style={s.logo2}
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
            {/* Role Tabs */}
            <View style={s.tabWrap}>
              <TouchableOpacity
                style={[s.tabBtn, activeTab === "admin" && s.tabBtnActive]}
                onPress={() => {
                  setActiveTab("admin");
                  setEmail("superadmin@ayshed.biz.id");
                }}
              >
                <Text style={{ fontSize: 16, marginRight: 6 }}>🔑</Text>
                <Text
                  style={[s.tabText, activeTab === "admin" && s.tabTextActive]}
                >
                  EXECUTIVE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.tabBtn, activeTab === "user" && s.tabBtnActive]}
                onPress={() => {
                  setActiveTab("user");
                  setEmail("user.node@ayshed.biz.id");
                }}
              >
                <Text style={{ fontSize: 16, marginRight: 6 }}>👥</Text>
                <Text
                  style={[s.tabText, activeTab === "user" && s.tabTextActive]}
                >
                  STANDARD
                </Text>
              </TouchableOpacity>
            </View>

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

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.royalBg },
  container: { flex: 1, padding: 24, justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 32 },
  shieldIconWrap: {
    width: 1080,
    height: 30,
    borderRadius: 40,
    backgroundColor: C.accentYellow,
    borderWidth: 4,
    borderColor: C.accentYellowHover,
    alignItems: "center",
    justifyContent: "center",

  },
  title: { fontSize: 24, fontWeight: "900", color: C.white, letterSpacing: 1 },
  authBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.primaryDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: C.borderBlue,
  },
  authDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.accentYellow,
  },
  authBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    color: C.accentYellow,
    letterSpacing: 2,
  },

  card: {
    backgroundColor: C.cardBlue,
    borderWidth: 2,
    borderColor: C.borderBlue,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  tabWrap: {
    flexDirection: "row",
    backgroundColor: "#0f1d4a",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: C.borderBlue,
  },
  tabBtn: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  tabBtnActive: { backgroundColor: C.accentYellow },
  tabText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    color: C.blue200,
    letterSpacing: 1,
  },
  tabTextActive: { color: C.primaryDark },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#7f1d1d",
    borderWidth: 1,
    borderColor: "#ef4444",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: { fontSize: 12, fontWeight: "600", color: "#fca5a5" },

  inputWrap: { marginBottom: 20 },
  inputLabel: {
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    color: C.accentYellow,
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: C.primaryDark,
    borderWidth: 2,
    borderColor: C.cardBlueLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: C.white,
    fontWeight: "600",
  },

  loginBtn: {
    backgroundColor: C.accentYellow,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: C.accentYellowHover,
    marginTop: 8,
  },
  loginBtnText: {
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "monospace",
    color: C.primaryDark,
    letterSpacing: 1.5,
  },

  serverStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: C.borderBlue,
  },
  serverStatusText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "monospace",
    color: C.blue300,
  },
  logo: { width: 100, height: 100, resizeMode: "contain" },
    imageGridRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: -10, // Jarak kecil antara logo 1 dan logo 2
    },
     logo2: { width: 150, height: 150, resizeMode: "contain" },
    imageGridRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: -10, // Jarak kecil antara logo 1 dan logo 2
    },
});
