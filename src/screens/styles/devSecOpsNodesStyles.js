import { StyleSheet } from 'react-native';
import { R } from '../../tokens';

export const PURPLE_BG = '#140d21';
export const PURPLE_SURFACE = '#231738';
export const PURPLE_BORDER = '#442c69';
export const PURPLE_TEXT = '#d8b4fe';
export const PURPLE_ACCENT = '#c084fc';
export const TEXT_PRIMARY = '#f3ecfb';
export const TEXT_MUTED = '#cbbbdc';
export const EMERALD = '#10B981';
export const AMBER = '#f59e0b';
export const WHITE = '#FFFFFF';
export const CARD_BG = '#FFFFFF';
export const CARD_BORDER = '#E5DDD0';

export const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: PURPLE_BG },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: 'rgba(20,13,33,0.85)', borderBottomWidth: 1, borderBottomColor: 'rgba(218,180,255,0.12)' },
    logoBadge: { width: 40, height: 40, borderRadius: R.xl, backgroundColor: PURPLE_SURFACE, borderWidth: 1, borderColor: PURPLE_BORDER, alignItems: 'center', justifyContent: 'center' },
    logoName: { fontSize: 17, fontWeight: '600', color: WHITE, letterSpacing: -0.3 },
    logoSub: { fontSize: 11, fontWeight: '500', color: PURPLE_ACCENT, letterSpacing: 1 },
    countdownPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 5, backgroundColor: PURPLE_SURFACE, borderRadius: R.full, borderWidth: 1, borderColor: PURPLE_BORDER },
    pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: EMERALD },
    countdownText: { fontFamily: 'monospace', fontSize: 11, fontWeight: '600', color: '#e9d5ff' },
    keyBtn: { width: 36, height: 36, borderRadius: R.full, backgroundColor: PURPLE_SURFACE, borderWidth: 1, borderColor: PURPLE_BORDER, alignItems: 'center', justifyContent: 'center' },
    scroll: { padding: 20, gap: 16 },
    clusterCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
    clusterIcon: { width: 44, height: 44, borderRadius: R.lg, backgroundColor: '#F3F0FF', borderWidth: 1, borderColor: '#DDD5FE', alignItems: 'center', justifyContent: 'center' },
    clusterLabel: { fontSize: 11, fontWeight: '600', color: '#7C3AED', textTransform: 'uppercase', letterSpacing: 1.2 },
    clusterName: { fontSize: 16, fontWeight: '700', color: '#1C1917' },
    switchBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#F3F0FF', borderRadius: R.lg, borderWidth: 1, borderColor: '#DDD5FE' },
    switchBtnText: { fontSize: 12, fontWeight: '600', color: '#5B21B6' },
    metricsRow: { flexDirection: 'row', gap: 14 },
    metricCard: { flex: 1, backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, padding: 16, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, elevation: 3 },
    metricHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    metricLabel: { fontFamily: 'monospace', fontSize: 11, fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 },
    greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: EMERALD, borderWidth: 2, borderColor: '#D1FAE5' },
    metricValue: { fontSize: 24, fontWeight: '700', color: '#1C1917', lineHeight: 28 },
    metricUnit: { fontSize: 12, fontWeight: '600', color: '#7C3AED', marginLeft: 2 },
    metricSub: { fontSize: 11, color: '#64748B', marginTop: 4 },
    sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, marginBottom: 12 },
    sectionTitle: { fontSize: 12, fontWeight: '700', color: TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 1.5 },
    countBadge: { paddingHorizontal: 10, paddingVertical: 3, backgroundColor: '#2b1a47', borderRadius: R.full, borderWidth: 1, borderColor: '#4a2e78' },
    countBadgeText: { fontSize: 11, fontWeight: '600', color: WHITE },
    nodeCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
    nodeIcon: { width: 40, height: 40, borderRadius: R.lg, backgroundColor: '#F3F0FF', borderWidth: 1, borderColor: '#DDD5FE', alignItems: 'center', justifyContent: 'center' },
    nodeName: { fontSize: 14, fontWeight: '700', color: '#1C1917' },
    nodeSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
    nodeBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 3, borderRadius: R.full, borderWidth: 1, borderColor: '#A7F3D0' },
    nodeBadgeText: { fontFamily: 'monospace', fontSize: 11, fontWeight: '600', color: '#065F46' },
    statusDot: { width: 10, height: 10, borderRadius: 5 },
    healthCard: { backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, padding: 18, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4, gap: 12 },
    healthBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 3, borderRadius: R.full, borderWidth: 1, borderColor: '#A7F3D0' },
    healthBadgeText: { fontFamily: 'monospace', fontSize: 11, fontWeight: '600', color: '#065F46' },
    healthInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFc', borderRadius: R.lg, borderWidth: 1, borderColor: '#E2E8F0', padding: 14 },
    healthInfoText: { fontSize: 12, color: '#475569', flex: 1 },
    healthInfoTimer: { fontSize: 11, fontWeight: '700', color: '#7C3AED' },
    actionTitle: { fontSize: 12, fontWeight: '700', color: TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 1.5, paddingHorizontal: 4, marginBottom: 12 },
    actionGrid: { flexDirection: 'row', gap: 12 },
    actionBtn: { flex: 1, minWidth: '45%', paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: CARD_BG, borderRadius: R.xl, borderWidth: 1, borderColor: CARD_BORDER, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
    actionBtnDanger: { borderColor: '#FECACA', backgroundColor: '#FFF5F5' },
    actionLabel: { fontSize: 12, fontWeight: '600', color: '#1C1917' },
    actionLabelDanger: { color: '#DC2626' },
    navBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: CARD_BG, borderTopWidth: 1, borderTopColor: CARD_BORDER, paddingVertical: 8, paddingBottom: 12 },
    navItem: { alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: R.xl },
    navItemActive: { backgroundColor: '#F3F0FF', borderWidth: 1, borderColor: '#DDD5FE' },
    navLabel: { fontFamily: 'monospace', fontSize: 11, color: '#78716C', marginTop: 2 },
    navLabelActive: { fontWeight: '700', color: '#5B21B6' },
});
