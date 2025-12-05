import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import Avatar from '../../components/Profile/Avatar';
import ProfileCard from '../../components/Profile/ProfileCard';
import { getUser } from '../../services/userService';
import { User } from '../../api/types/user';

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
            let active = true;
            setLoading(true);
            getUser().then(u => {
                if (!active) return;
                setUser(u);
                setLoading(false);
            });
            return () => { active = false; };
        }, [])
    );

    useEffect(() => {
        let mounted = true;
        getUser().then(u => {
            if (mounted) {
                setUser(u);
                setLoading(false);
            }
        });
        return () => { mounted = false; };
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.center}>
                <Text>Usuário não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avatar uri={user.avatar} size={96} />
                <View style={{ marginLeft: 16 }}>
                    <Text style={styles.name}>{user.Username}</Text>
                    <Text style={styles.email}>{user.Email}</Text>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <ProfileCard bio={user.infoPerfil} progress={user.qtdXp} />
            </View>

            <View style={styles.actions}>
                <Link href="/profile/edit" asChild>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionText}>Editar Perfil</Text>
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: '#ddd' }]}
                    onPress={() => router.push('/profile/settings')}
                >
                    <Text style={[styles.actionText, { color: '#111' }]}>Configurações</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center' },
    name: { fontSize: 20, fontWeight: '700' },
    email: { color: '#666' },
    actions: { marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' },
    actionBtn: { backgroundColor: '#4F46E5', padding: 12, borderRadius: 8, flex: 1, marginRight: 8 },
    actionText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});