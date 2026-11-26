import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../services/auth";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const THEME = {
  bg: "#eef2f7",
  card: "#ffffff",
  primaryBlue: "#2563eb",
  primaryBlueDark: "#1d4ed8",
  primaryYellow: "#facc15",
  textDark: "#0f172a",
  textMedium: "#334155",
  textMuted: "#64748b",
  textLight: "#ffffff",
  shadowDark: "#a8b4c8",
  shadowLight: "#ffffff",
  borderSubtle: "#e2e8f0",
  inputBg: "#f1f5f9",
  dangerRed: "#ef4444",
};

const SHADOWS = {
  subtle: {
    shadowColor: THEME.shadowDark,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: THEME.shadowDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  deep: {
    shadowColor: THEME.shadowDark,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  inner: {
    shadowColor: THEME.shadowLight,
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 0,
  },
  innerDeep: {
    shadowColor: THEME.shadowLight,
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 0,
  },
};

const animate = (anim, toValue, duration = 150) => {
  Animated.timing(anim, {
    toValue,
    duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: false,
  }).start();
};

export default function LoginScreen({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pressAnim = useRef(new Animated.Value(1)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const errorShake = useRef(new Animated.Value(0)).current;

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi");
      Animated.sequence([
        Animated.timing(errorShake, { toValue: -6, duration: 50, useNativeDriver: false }),
        Animated.timing(errorShake, { toValue: 6, duration: 50, useNativeDriver: false }),
        Animated.timing(errorShake, { toValue: -4, duration: 50, useNativeDriver: false }),
        Animated.timing(errorShake, { toValue: 4, duration: 50, useNativeDriver: false }),
        Animated.timing(errorShake, { toValue: 0, duration: 50, useNativeDriver: false }),
      ]).start();
      return;
    }

    setLoading(true);
    animate(pressAnim, 0.97, 60);
    try {
      const user = await auth.login({ email, password });
      onLogin(user);
    } catch (err) {
      console.log("[LOGIN ERROR]", err.name, err.message);
      const isNetworkError =
        err.name === "TypeError" ||
        (err.message &&
          (err.message.toLowerCase().includes("network") ||
            err.message.toLowerCase().includes("fetch") ||
            err.message.toLowerCase().includes("failed to fetch") ||
            err.message.toLowerCase().includes("connection")));
      if (isNetworkError) {
        setError("Terjadi kesalahan pada sistem");
      } else {
        setError("Maaf Username dan password salah");
      }
    } finally {
      animate(pressAnim, 1, 120);
      setLoading(false);
    }
  };

  useEffect(() => {
    Animated.sequence([
      Animated.delay(50),
      Animated.timing(logoAnim, { toValue: 1, duration: 900, useNativeDriver: false }),
      Animated.delay(100),
      Animated.timing(cardAnim, { toValue: 1, duration: 800, useNativeDriver: false }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <Animated.ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.logoWrap,
              {
                opacity: logoAnim,
                transform: [
                  { translateY: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) },
                  { scale: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) },
                ],
              },
            ]}
          >
            <View style={styles.logoRing}>
              <View style={styles.logoCenter}>
                <Image
                  source={require("../../assets/images/logo2.png")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.logoShadow} />
          </Animated.View>

          <Animated.View
            style={[
              styles.cardWrap,
              {
                opacity: cardAnim,
                transform: [
                  { translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) },
                  { scale: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) },
                ],
              },
            ]}
          >
            <View style={styles.card}>
              <View style={styles.headerText}>
                <Text style={styles.title}>Akuan</Text>
                <Text style={styles.subtitle}>Masuk ke akun anda</Text>
              </View>

              {error && (
                <Animated.View style={[styles.errorBox, { transform: [{ translateX: errorShake }] }]}>
                  <Text style={styles.errorText}>{error}</Text>
                </Animated.View>
              )}

              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="masukkan email anda"
                    placeholderTextColor={THEME.textMuted}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCompleteType="email"
                  />
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor={THEME.textMuted}
                    secureTextEntry
                    autoCompleteType="password"
                  />
                </View>
              </View>

              <Animated.View
                style={[styles.btnWrap, { transform: [{ scale: pressAnim }] }]}
              >
                <TouchableOpacity
                  style={styles.btn}
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={1}
                  onPressIn={() => animate(pressAnim, 0.97, 60)}
                  onPressOut={() => animate(pressAnim, 1, 100)}
                  onPressEnd={() => animate(pressAnim, 1, 100)}
                >
                  {loading ? (
                    <ActivityIndicator color={THEME.textLight} size="small" />
                  ) : (
                    <Text style={styles.btnText}>OTENTIKASI</Text>
                  )}
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ATAU</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={onRegister}
                activeOpacity={0.85}
              >
                <Text style={styles.secondaryBtnText}>Buat Akun Baru</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>apiSEC Admin</Text>
          </View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrap: { alignItems: "center", marginBottom: 24 },
  logoRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: THEME.card,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.deep,
    borderWidth: 2,
    borderColor: THEME.primaryYellow,
  },
  logoCenter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: THEME.bg,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.innerDeep,
  },
  logoImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  logoShadow: {
    position: "absolute",
    bottom: -12,
    left: "50%",
    marginLeft: -30,
    width: 60,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.primaryYellow,
    opacity: 0.2,
  },
  cardWrap: { width: "100%", maxWidth: 420 },
  card: {
    backgroundColor: THEME.card,
    borderRadius: 26,
    padding: 24,
    ...SHADOWS.deep,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
    overflow: "hidden",
  },
  headerText: { alignItems: "center", marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: THEME.textDark,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: THEME.textMuted,
    textAlign: "center",
    marginTop: 6,
    fontWeight: "500",
  },
  errorBox: {
    backgroundColor: "rgba(239,68,68,0.1)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.3)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 4,
    ...SHADOWS.subtle,
  },
  errorText: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.dangerRed,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  field: { marginBottom: 14 },
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: THEME.textMedium,
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    alignSelf: "flex-start",
    marginLeft: 2,
  },
  inputWrap: {
    backgroundColor: THEME.inputBg,
    borderRadius: 16,
    ...SHADOWS.inner,
    borderWidth: 1,
    borderColor: THEME.borderSubtle,
    overflow: "hidden",
  },
  input: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 15,
    fontWeight: "600",
    color: THEME.textDark,
    backgroundColor: "transparent",
  },
  btnWrap: { marginBottom: 16 },
  btn: {
    backgroundColor: THEME.primaryBlue,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    ...SHADOWS.medium,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "900",
    color: THEME.textLight,
    letterSpacing: 1,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: THEME.borderSubtle,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: "800",
    color: THEME.textMuted,
    letterSpacing: 1.5,
  },
  secondaryBtn: {
    backgroundColor: THEME.primaryYellow,
    borderWidth: 2,
    borderColor: THEME.primaryBlue,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    ...SHADOWS.subtle,
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: "900",
    color: THEME.primaryBlue,
    letterSpacing: 0.8,
  },
  footer: { marginTop: 20, paddingVertical: 12 },
  footerText: {
    fontSize: 11,
    fontWeight: "700",
    color: THEME.textMuted,
    letterSpacing: 0.8,
  },
});