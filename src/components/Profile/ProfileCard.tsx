import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = { bio?: string; progress?: number };

export default function ProfileCard({ bio, progress = 0 }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Sobre</Text>
            <Text style={styles.bio}>{bio ?? 'Nenhuma bio adicionada.'}</Text>

            <Text style={[styles.title, { marginTop: 12 }]}>Progresso de nível</Text>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min(Math.max(progress, 0), 100)}%` }]} />
            </View>
            <Text style={styles.percent}>{progress}%</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { padding: 16, borderRadius: 12, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, elevation: 2 },
    title: { fontWeight: '700', marginBottom: 6 },
    bio: { color: '#444' },
    progressBar: { height: 10, backgroundColor: '#eef2ff', borderRadius: 10, overflow: 'hidden', marginTop: 8 },
    progressFill: { height: '100%', backgroundColor: '#4F46E5' },
    percent: { marginTop: 8, color: '#666' },
});