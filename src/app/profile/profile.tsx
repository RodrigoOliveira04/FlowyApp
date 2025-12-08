import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
    Dimensions } from 'react-native';
import { useEntries, EntriesProvider } from "@/src/contexts/diary/EntriesContext";
import { BarChart } from "react-native-chart-kit";
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
    const { entries } = useEntries();

    // Contar frequência dos valores de humor
    const moodCounts: Record<string, number> = {};
    entries.forEach(entry => {
        if (entry.mood) {
            moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
        }
    });

    // Preparar dados para o gráfico
    const moods = Object.keys(moodCounts);
    const counts = moods.map(mood => moodCounts[mood]);
    const mostFrequentMood = moods.length > 0
        ? moods[counts.indexOf(Math.max(...counts))]
        : null;

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

             {moods.length > 0 && (
                <View style={{ marginTop: 32 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8, textAlign: "center", color:"#2D5D9F" }}>
                        Humor mais frequente: {mostFrequentMood}
                    </Text>
                    <BarChart
                        data={{
                            labels: moods,
                            datasets: [{ data: counts }],
                        }}
                        width={Dimensions.get("window").width - 40}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#e9eef8",
                            backgroundGradientTo: "#e9eef8",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                            style: { borderRadius: 16 },
                        }}
                        style={{ borderRadius: 16 }}
                        fromZero
                        showValuesOnTopOfBars
                    />
                </View>
            )}

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
    container: { flex: 1, padding: 20, paddingTop: 75, backgroundColor: "#DCEBFF" },
    header: { flexDirection: 'row', alignItems: 'center' },
    name: { fontSize: 20, fontWeight: '700' },
    email: { color: '#666' },
    actions: { marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' },
    actionBtn: { backgroundColor: '#4F46E5', padding: 12, borderRadius: 8, flex: 1, marginRight: 8 },
    actionText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});