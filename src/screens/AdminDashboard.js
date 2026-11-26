import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { auth } from "../services/auth";
import * as ScreenOrientation from "expo-screen-orientation";
import UfwLogs from "./Login-logs";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const THEME = {
  bg: "#e8ecf1",
  card: "#ffffff",
  primaryBlue: "#2563eb",
  primaryBlueLight: "#3b82f6",
  primaryYellow: "#facc15",
  primaryYellowDark: "#eab308",
  primaryYellowLight: "#fde047",
  successGreen: "#22c55e",
  successGreenLight: "#4ade80",
  dangerRed: "#ef4444",
  dangerRedLight: "#f87171",
  textDark: "#0f172a",
  textMedium: "#334155",
  textMuted: "#64748b",
  textLight: "#ffffff",
  shadowDark: "#a8b4c8",
  shadowLight: "#ffffff",
  borderSubtle: "#e2e8f0",
  accent: "#facc15",
};

const SHADOWS = {
  subtle: {
    shadowColor: THEME.shadowDark,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: THEME.shadowDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  deep: {
    shadowColor: THEME.shadowDark,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  pressed: {
    shadowColor: THEME.shadowDark,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
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

export default function AdminDashboard({ user, onLogout }) {
  const email = user?.identifier || "admin";

  const [view, setView] = useState("dashboard");
  const [suspendModalVisible, setSuspendModalVisible] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [suspendLoading, setSuspendLoading] = useState(false);
  const [suspendMessage, setSuspendMessage] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [listUsersLoading, setListUsersLoading] = useState(false);
  const [chartData, setChartData] = useState({ daily: [], weekly: [], monthly: [] });
  const [chartRange, setChartRange] = useState("daily");
  const [chartLogs, setChartLogs] = useState([]);
  const [landscape, setLandscape] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const pressAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  const headerAnim = useRef(new Animated.Value(1)).current;

  const onRefresh = async () => {
    setRefreshing(true);
    animate(headerAnim, 0.95, 100);
    try {
      const data = await auth.getChartSummary();
      setChartData(data || { daily: [], weekly: [], monthly: [] });
    } catch (e) {
      console.log("CHART ERR", e.message);
    }
    try {
      const logs = await auth.getLoginLogs();
      setChartLogs(Array.isArray(logs) ? logs : []);
    } catch {}
    animate(headerAnim, 1, 200);
    setRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      try {
        if (landscape) {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
      } catch {}
    })();
  }, [landscape]);

  useEffect(() => {
    (async () => {
      try {
        const data = await auth.getChartSummary();
        setChartData(data || { daily: [], weekly: [], monthly: [] });
      } catch (e) {
        console.log("CHART ERR", e.message);
      }
      try {
        const logs = await auth.getLoginLogs();
        setChartLogs(Array.isArray(logs) ? logs : []);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (suspendModalVisible) {
      animate(modalAnim, 1, 300);
    } else {
      animate(modalAnim, 0, 200);
    }
  }, [suspendModalVisible]);

  const openSuspendModal = async () => {
    setSuspendMessage("");
    setSelectedUserId(null);
    setSuspendModalVisible(true);
    try {
      const users = await auth.getUsers();
      setUsersList(users || []);
    } catch (err) {
      setSuspendMessage("Gagal memuat daftar user: " + (err.message || "Unknown error"));
    }
  };

  const handleSuspend = async () => {
    if (!selectedUserId) {
      setSuspendMessage("Pilih user terlebih dahulu");
      return;
    }
    setSuspendLoading(true);
    setSuspendMessage("");
    try {
      const result = await auth.suspendUser(String(selectedUserId));
      setSuspendMessage(result?.message || "User berhasil di-suspend");
    } catch (err) {
      setSuspendMessage("Gagal suspend: " + (err.message || "Unknown error"));
    } finally {
      setSuspendLoading(false);
    }
  };

  const handleUnsuspend = async () => {
    if (!selectedUserId) {
      setSuspendMessage("Pilih user terlebih dahulu");
      return;
    }
    setSuspendLoading(true);
    setSuspendMessage("");
    try {
      const result = await auth.unsuspendUser(String(selectedUserId));
      setSuspendMessage(result?.message || "User berhasil diaktifkan");
    } catch (err) {
      setSuspendMessage("Gagal aktifkan: " + (err.message || "Unknown error"));
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

  const deleteUsers = async (userId) => {
    try {
      const result = await auth.deleteUser(userId);
      console.log("DELETE RESULT", result);
      alert(result?.message || "User berhasil dihapus");
      loadListUsers();
    } catch (err) {
      console.log("DELETE ERROR", err.message);
      alert("Gagal hapus user: " + (err.message || "Unknown error"));
    }
  };

  const StatCard = ({ label, value, bgColor, bgGradient, icon, pressScale }) => (
    <Animated.View
      style={[
        styles.statCard,
        { backgroundColor: bgColor },
        pressScale ? { transform: [{ scale: pressScale }] } : {},
      ]}
    >
      <View style={styles.statCardInner}>
        {icon && <Text style={styles.statIcon}>{icon}</Text>}
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <View style={[styles.statGlow, { backgroundColor: bgColor }]} />
    </Animated.View>
  );

  const MenuCard = ({ label, icon, iconType = "emoji", onPress, style, disabled }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const onPressIn = () => animate(scale, 0.96, 80);
    const onPressOut = () => animate(scale, 1, 120);

    return (
      <Animated.View
        style={[styles.menuCard, style, { transform: [{ scale }] }]}
      >
        <TouchableOpacity
          style={styles.menuCardTouch}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPressEnd={onPressOut}
          activeOpacity={1}
          disabled={disabled}
        >
          <View style={styles.menuCardContent}>
            <View style={styles.menuIconWrapper}>
              {iconType === "image" ? (
                <Image source={icon} style={styles.menuIconImg} />
              ) : (
                <Text style={styles.menuIcon}>{icon}</Text>
              )}
            </View>
            <Text style={styles.menuLabel}>{label}</Text>
          </View>
          <View style={styles.menuCardHighlight} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const RangeTab = ({ label, active, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const onPressIn = () => animate(scale, 0.94, 60);
    const onPressOut = () => animate(scale, 1, 100);

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          style={[
            styles.rangeTab,
            active && styles.rangeTabActive,
            !active && styles.rangeTabInactive,
          ]}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={1}
        >
          <Text style={[
            styles.rangeTabText,
            active && styles.rangeTabTextActive,
            !active && styles.rangeTabTextInactive,
          ]}>
            {label}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderHeader = () => (
    <Animated.View
      style={[styles.headerContainer, { transform: [{ scale: headerAnim }] }]}
    >
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <Text style={styles.headerEmail}>{email}</Text>
      </View>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={onLogout}
        activeOpacity={0.85}
      >
        <Text style={styles.logoutBtnText}>KELUAR</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderBackButton = () => (
    <TouchableOpacity style={styles.backBtn} onPress={() => setView("dashboard")} activeOpacity={0.8}>
      <Text style={styles.backBtnText}>← Kembali</Text>
    </TouchableOpacity>
  );

  const renderGrid = () => (
    <View style={styles.gridContainer}>
      <View style={styles.mainCard}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Text style={styles.cardTitle}>Overview</Text>
            <View style={styles.cardBadge}>
              <Text style={styles.cardBadgeText}>LIVE</Text>
            </View>
          </View>
          <View style={styles.cardHeaderRight}>
            <Text style={styles.cardSubtitle}>{new Date().toLocaleDateString("id-ID")}</Text>
          </View>
        </View>

        <View style={styles.statRow}>
          <StatCard
            label="TOTAL"
            value={chartLogs.length}
            bgColor={THEME.primaryBlue}
            icon="📊"
          />
          <StatCard
            label="SUKSES"
            value={chartLogs.filter((log) => log.success).length}
            bgColor={THEME.successGreen}
            icon="✓"
          />
          <StatCard
            label="GAGAL"
            value={chartLogs.filter((log) => !log.success).length}
            bgColor={THEME.dangerRed}
            icon="✕"
          />
        </View>

        <View style={styles.chartHeader}>
          <View style={styles.chartHeaderLeft}>
            <Text style={styles.chartTitle}>Grafik Login</Text>
            <Text style={styles.chartSubtitle}>7 hari terakhir</Text>
          </View>
          <TouchableOpacity
            style={[styles.landscapeBtn, landscape && styles.landscapeBtnActive]}
            onPress={() => setLandscape((v) => !v)}
            activeOpacity={0.85}
          >
            <Text style={[
              styles.landscapeBtnText,
              landscape && styles.landscapeBtnTextActive,
            ]}>
              {landscape ? "Potret" : "Landscape"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rangeTabs}>
          {["daily", "weekly", "monthly"].map((r) => (
            <RangeTab
              key={r}
              label={r}
              active={chartRange === r}
              onPress={() => setChartRange(r)}
            />
          ))}
        </View>

        <View style={styles.chartCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartWrapper}>
            <LineChart
              data={{
                labels: (chartData[chartRange] || []).map((d) => d.x),
                datasets: [
                  {
                    data: (chartData[chartRange] || []).map((d) => d.success || 0),
                    color: () => THEME.successGreen,
                    strokeWidth: landscape ? 4 : 2.5,
                  },
                  {
                    data: (chartData[chartRange] || []).map((d) => d.fail || 0),
                    color: () => THEME.dangerRed,
                    strokeWidth: landscape ? 4 : 2.5,
                  },
                ],
              }}
              width={landscape ? SCREEN_HEIGHT - 64 : Math.max(SCREEN_WIDTH - 48, (chartData[chartRange] || []).length * 26)}
              height={landscape ? SCREEN_WIDTH - 140 : 150}
              chartConfig={{
                backgroundColor: THEME.card,
                backgroundGradientFrom: THEME.card,
                backgroundGradientTo: THEME.card,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                labelColor: () => THEME.textDark,
                propsForDots: {
                  r: landscape ? 6 : 3,
                  strokeWidth: 2,
                  strokeColor: THEME.card,
                },
                gridColor: THEME.borderSubtle,
              }}
              bezier
              style={styles.lineChart}
            />
          </ScrollView>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.menuGrid}>
          <MenuCard
            label="Suspend"
            icon={require("../../assets/images/menu/suspend.png")}
            iconType="image"
            onPress={openSuspendModal}
          />
          <MenuCard
            label="List User"
            icon="👥"
            onPress={() => { setView("listUser"); loadListUsers(); }}
          />
          <MenuCard
            label="Pantau Logs"
            icon="📜"
            onPress={() => setView("logs")}
          />
        </View>
      </View>
    </View>
  );

  const renderListUser = () => (
    <View style={styles.listContainer}>
      {renderBackButton()}
      <ScrollView
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {listUsersLoading ? (
          <View style={styles.loadingCenter}>
            <ActivityIndicator color={THEME.primaryYellow} size="large" />
            <Text style={styles.loadingText}>Memuat users...</Text>
          </View>
        ) : listUsers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>👤</Text>
            <Text style={styles.emptyTitle}>Tidak ada user</Text>
            <Text style={styles.emptySubtitle}>Belum ada user terdaftar</Text>
          </View>
        ) : (
          listUsers.map((u, i) => (
            <Animated.View
              key={u.id}
              style={[styles.userCard, { opacity: 1 }]}
              entering={styles.userCardEnter}
            >
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>{u.email.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userEmail}>{u.email}</Text>
                <View style={styles.userMetaRow}>
                  <View style={[styles.userBadge, u.is_active ? styles.badgeActive : styles.badgeInactive]}>
                    <Text style={styles.userBadgeText}>
                      {u.is_active ? "● Aktif" : "● Suspended"}
                    </Text>
                  </View>
                  <View style={styles.userBadgeRole}>
                    <Text style={styles.userBadgeRoleText}>{u.role}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.deleteBtn, styles.deleteBtnNeumorphic]}
                onPress={() => deleteUsers(u.id)}
                activeOpacity={0.85}
                disabled={suspendLoading}
              >
                <Text style={styles.deleteBtnText}>Hapus</Text>
              </TouchableOpacity>
            </Animated.View>
          ))
        )}
      </ScrollView>
    </View>
  );

  const ModalContent = () => (
    <Animated.View
      style={[
        styles.modalCard,
        { opacity: modalAnim, transform: [{ scale: modalAnim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] },
      ]}
    >
      <View style={styles.modalHandle} />
      <Text style={styles.modalTitle}>Suspend Akun</Text>
      <Text style={styles.modalSubtitle}>Pilih user untuk di-suspend atau diaktifkan</Text>

      {suspendLoading && (
        <View style={styles.modalLoaderWrap}>
          <ActivityIndicator color={THEME.primaryYellow} size="large" />
          <Text style={styles.modalLoaderText}>Memproses...</Text>
        </View>
      )}

      {suspendMessage ? (
        <View style={[
          styles.modalAlert,
          suspendMessage.includes("Gagal") ? styles.modalAlertError : styles.modalAlertSuccess,
        ]}>
          <Text style={styles.modalAlertText}>{suspendMessage}</Text>
        </View>
      ) : null}

      <ScrollView style={styles.modalList} contentContainerStyle={styles.modalListContent}>
        {usersList.map((u) => (
          <TouchableOpacity
            key={u.id}
            style={[
              styles.modalUserItem,
              selectedUserId === u.id && styles.modalUserItemSelected,
            ]}
            onPress={() => setSelectedUserId(u.id)}
            activeOpacity={0.85}
          >
            <View style={[
              styles.modalUserAvatar,
              selectedUserId === u.id && styles.modalUserAvatarSelected,
            ]}>
              <Text style={styles.modalUserAvatarText}>{u.email.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.modalUserInfo}>
              <Text style={[
                styles.modalUserEmail,
                selectedUserId === u.id && styles.modalUserEmailSelected,
              ]}>
                {u.email}
              </Text>
              <View style={styles.modalUserMetaRow}>
                <Text style={[
                  styles.modalUserMeta,
                  selectedUserId === u.id && styles.modalUserMetaSelected,
                ]}>
                  {u.role}
                </Text>
                <View style={[
                  styles.modalUserStatus,
                  u.is_active ? styles.modalUserStatusActive : styles.modalUserStatusInactive,
                ]}>
                  <Text style={styles.modalUserStatusText}>
                    {u.is_active ? "Aktif" : "Suspended"}
                  </Text>
                </View>
              </View>
            </View>
            {selectedUserId === u.id && (
              <View style={styles.modalCheckMark}>
                <Text style={styles.modalCheckMarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.modalActions}>
        <TouchableOpacity
          style={[styles.modalBtn, styles.modalBtnSecondary]}
          onPress={() => setSuspendModalVisible(false)}
          activeOpacity={0.85}
          disabled={suspendLoading}
        >
          <Text style={styles.modalBtnSecondaryText}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modalBtn,
            styles.modalBtnPrimary,
            suspendLoading && styles.modalBtnDisabled,
          ]}
          onPress={handleUnsuspend}
          activeOpacity={0.85}
          disabled={suspendLoading}
        >
          <Text style={styles.modalBtnPrimaryText}>Aktifkan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modalBtn,
            styles.modalBtnDanger,
            suspendLoading && styles.modalBtnDisabled,
          ]}
          onPress={handleSuspend}
          activeOpacity={0.85}
          disabled={suspendLoading}
        >
          <Text style={styles.modalBtnDangerText}>Suspend</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={styles.backgroundDecor} />
      {renderHeader()}
      {view === "dashboard" && (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
        >
          {renderGrid()}
        </ScrollView>
      )}
      {view === "listUser" && renderListUser()}
      {view === "logs" && <UfwLogs onBack={() => setView("dashboard")} />}
      {view === "listContainer" && (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Container Management</Text>
          <Text style={styles.placeholderSub}>Coming Soon</Text>
        </View>
      )}

      <Modal
        visible={suspendModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuspendModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ModalContent />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  backgroundDecor: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: THEME.primaryYellow,
    opacity: 0.03,
    zIndex: 0,
  },
  headerContainer: {
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: THEME.primaryYellow,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    ...SHADOWS.deep,
    zIndex: 10,
  },
  headerLeft: { flex: 1 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: THEME.textDark,
    letterSpacing: 0.2,
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerEmail: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 3,
    fontWeight: "600",
  },
  logoutBtn: {
    backgroundColor: THEME.dangerRed,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    ...SHADOWS.medium,
  },
  logoutBtnText: {
    color: THEME.textLight,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  backBtn: {
    padding: 16,
    paddingLeft: 20,
  },
  backBtnText: {
    color: THEME.primaryYellow,
    fontSize: 15,
    fontWeight: "800",
    textShadowColor: "rgba(250,204,21,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  gridContainer: {
    padding: 16,
    paddingBottom: 28,
    zIndex: 1,
  },
  mainCard: {
    backgroundColor: THEME.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    ...SHADOWS.deep,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardHeaderRight: {},
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: THEME.textDark,
    letterSpacing: 0.1,
  },
  cardSubtitle: {
    fontSize: 11,
    color: THEME.textMuted,
    fontWeight: "600",
    textAlign: "right",
  },
  cardBadge: {
    backgroundColor: THEME.successGreen,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 16,
    ...SHADOWS.subtle,
  },
  cardBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: THEME.textLight,
    letterSpacing: 0.4,
  },
  statRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    minHeight: 78,
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    ...SHADOWS.medium,
  },
  statCardInner: {
    alignItems: "center",
    zIndex: 2,
  },
  statIcon: {
    fontSize: 16,
    marginBottom: 3,
  },
  statLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  statValue: {
    color: THEME.textLight,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 3,
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  statGlow: {
    position: "absolute",
    bottom: -14,
    left: "50%",
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: -30,
    opacity: 0.3,
    ...SHADOWS.inner,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  chartHeaderLeft: {
    gap: 4,
  },
  chartHeaderRight: {},
  chartTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: THEME.textDark,
  },
  chartSubtitle: {
    fontSize: 10,
    color: THEME.textMuted,
  },
  landscapeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: THEME.bg,
    borderRadius: 8,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: THEME.borderSubtle,
  },
  landscapeBtnActive: {
    backgroundColor: THEME.primaryBlue,
    borderColor: THEME.primaryBlue,
  },
  landscapeBtnText: {
    fontSize: 10,
    fontWeight: "700",
    color: THEME.primaryBlue,
  },
  landscapeBtnTextActive: {
    color: THEME.textLight,
  },
  rangeTabs: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  rangeTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: THEME.bg,
    borderRadius: 8,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: THEME.borderSubtle,
  },
  rangeTabInactive: {},
  rangeTabActive: {
    backgroundColor: THEME.primaryYellow,
    borderColor: THEME.primaryYellowDark,
    ...SHADOWS.medium,
  },
  rangeTabText: {
    fontSize: 10,
    fontWeight: "700",
  },
  rangeTabTextInactive: {
    color: THEME.textMuted,
  },
  rangeTabTextActive: {
    color: THEME.textDark,
  },
  chartCard: {
    backgroundColor: THEME.bg,
    borderRadius: 16,
    padding: 3,
    ...SHADOWS.innerDeep,
  },
  chartWrapper: {
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: THEME.card,
    ...SHADOWS.inner,
  },
  lineChart: {
    borderRadius: 14,
  },
  menuSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: THEME.textDark,
    marginBottom: 10,
    marginLeft: 2,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  menuCard: {
    minWidth: 96,
    maxWidth: 96,
    borderRadius: 16,
    overflow: "hidden",
    ...SHADOWS.medium,
  },
  menuCardTouch: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 16,
    position: "relative",
    backgroundColor: THEME.primaryYellow,
    borderWidth: 2,
    borderColor: THEME.primaryBlue,
  },
  menuCardContent: { alignItems: "center", gap: 6, zIndex: 2 },
  menuIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.primaryBlue,
    ...SHADOWS.subtle,
  },
  menuIconImg: {
    width: 20,
    height: 20,
    tintColor: THEME.textLight,
  },
  menuIcon: {
    fontSize: 16,
    color: THEME.textLight,
  },
  menuLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: THEME.textDark,
    letterSpacing: 0.1,
    textAlign: "center",
  },
  menuCardHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "45%",
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  listContainer: { flex: 1 },
  listContent: { padding: 16, gap: 12, paddingBottom: 40 },
  loadingCenter: { paddingVertical: 60, alignItems: "center", gap: 12 },
  loadingText: { fontSize: 13, color: THEME.textMuted },
  emptyState: { paddingVertical: 80, alignItems: "center", gap: 12 },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: THEME.textMedium },
  emptySubtitle: { fontSize: 13, color: THEME.textMuted },
  userCard: {
    backgroundColor: THEME.card,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.primaryBlue,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.subtle,
  },
  userAvatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: THEME.textLight,
  },
  userInfo: { flex: 1, gap: 6 },
  userEmail: {
    fontSize: 15,
    fontWeight: "700",
    color: THEME.textDark,
    letterSpacing: 0.1,
  },
  userMetaRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  userBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    ...SHADOWS.subtle,
  },
  badgeActive: { backgroundColor: "rgba(34,197,94,0.12)" },
  badgeInactive: { backgroundColor: "rgba(239,68,68,0.12)" },
  userBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  userBadgeRole: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: THEME.bg,
    ...SHADOWS.inner,
  },
  userBadgeRoleText: {
    fontSize: 10,
    fontWeight: "700",
    color: THEME.primaryBlue,
  },
  deleteBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    ...SHADOWS.subtle,
  },
  deleteBtnNeumorphic: {
    backgroundColor: THEME.bg,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.3)",
  },
  deleteBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: THEME.dangerRed,
    letterSpacing: 0.3,
  },
  scrollContent: { flexGrow: 1, paddingBottom: 24 },
  placeholder: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  placeholderText: { fontSize: 18, fontWeight: "700", color: THEME.textMedium },
  placeholderSub: { fontSize: 13, color: THEME.textMuted },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15,23,42,0.6)",
  },
  modalCard: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: THEME.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 24,
    ...SHADOWS.deep,
  },
  modalHandle: {
    width: 44,
    height: 5,
    backgroundColor: THEME.borderSubtle,
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: THEME.textDark,
    textAlign: "center",
    marginBottom: 4,
    paddingHorizontal: 20,
  },
  modalSubtitle: {
    fontSize: 13,
    color: THEME.textMuted,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  modalLoaderWrap: { alignItems: "center", gap: 8, marginBottom: 16, paddingVertical: 10 },
  modalLoaderText: { fontSize: 12, color: THEME.textMuted },
  modalAlert: {
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    ...SHADOWS.subtle,
  },
  modalAlertSuccess: { backgroundColor: "rgba(34,197,94,0.12)", borderWidth: 1, borderColor: "rgba(34,197,94,0.3)" },
  modalAlertError: { backgroundColor: "rgba(239,68,68,0.12)", borderWidth: 1, borderColor: "rgba(239,68,68,0.3)" },
  modalAlertText: { fontSize: 13, textAlign: "center", fontWeight: "600" },
  modalList: { maxHeight: 260, marginHorizontal: 12, marginBottom: 16 },
  modalListContent: { gap: 8 },
  modalUserItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: THEME.bg,
    ...SHADOWS.inner,
    borderWidth: 1,
    borderColor: THEME.borderSubtle,
  },
  modalUserItemSelected: {
    backgroundColor: THEME.primaryYellow,
    borderColor: THEME.primaryYellowDark,
    ...SHADOWS.medium,
  },
  modalUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.primaryBlue,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.subtle,
  },
  modalUserAvatarSelected: { backgroundColor: THEME.primaryBlueLight },
  modalUserAvatarText: { fontSize: 15, fontWeight: "800", color: THEME.textLight },
  modalUserInfo: { flex: 1, gap: 4 },
  modalUserEmail: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.textDark,
  },
  modalUserEmailSelected: { color: THEME.textDark },
  modalUserMetaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  modalUserMeta: {
    fontSize: 11,
    fontWeight: "600",
    color: THEME.textMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: THEME.card,
    borderRadius: 8,
    ...SHADOWS.inner,
  },
  modalUserMetaSelected: { color: THEME.textDark },
  modalUserStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    ...SHADOWS.subtle,
  },
  modalUserStatusActive: { backgroundColor: "rgba(34,197,94,0.15)" },
  modalUserStatusInactive: { backgroundColor: "rgba(239,68,68,0.15)" },
  modalUserStatusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  modalCheckMark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: THEME.successGreen,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.medium,
  },
  modalCheckMarkText: { fontSize: 12, fontWeight: "800", color: THEME.textLight },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    ...SHADOWS.medium,
  },
  modalBtnSecondary: {
    backgroundColor: THEME.bg,
    borderWidth: 1,
    borderColor: THEME.borderSubtle,
  },
  modalBtnSecondaryText: {
    fontSize: 13,
    fontWeight: "800",
    color: THEME.primaryBlue,
  },
  modalBtnPrimary: { backgroundColor: THEME.successGreen },
  modalBtnDanger: { backgroundColor: THEME.dangerRed },
  modalBtnPrimaryText: {
    fontSize: 13,
    fontWeight: "800",
    color: THEME.textLight,
  },
  modalBtnDangerText: {
    fontSize: 13,
    fontWeight: "800",
    color: THEME.textLight,
  },
  modalBtnDisabled: { opacity: 0.5 },
  userCardEnter: {
    opacity: 1,
    translateY: 0,
  },
});

export { THEME, SHADOWS };