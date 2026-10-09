import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.margin,
        justifyContent: 'center',
    },
    header: {
        ...theme.typography.headlineLg,
        color: theme.colors.obsidian,
        marginBottom: theme.spacing.lg,
        textAlign: 'center',
    },
    card: {
        backgroundColor: theme.colors.surfaceContainerLowest,
        borderRadius: theme.rounded.xl,
        padding: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.boneBorder,
    },
    label: {
        ...theme.typography.labelSm,
        color: theme.colors.obsidian,
        marginBottom: theme.spacing.xs,
    },
    input: {
        ...theme.typography.bodyMd,
        color: theme.colors.obsidian,
        borderWidth: 1,
        borderColor: theme.colors.boneBorder,
        borderRadius: theme.rounded.DEFAULT,
        padding: theme.spacing.sm,
        marginBottom: theme.spacing.md,
        backgroundColor: theme.colors.background,
    },
    primaryButton: {
        backgroundColor: theme.colors.obsidian,
        padding: theme.spacing.md,
        borderRadius: theme.rounded.DEFAULT,
        alignItems: 'center',
        marginTop: theme.spacing.sm,
    },
    primaryButtonText: {
        ...theme.typography.labelMd,
        color: theme.colors.onPrimary,
    },
});
