import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Flowy</Text>
            <Link href="/profile/profile" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Ir ao perfil</Text>
                </TouchableOpacity>
            </Link>
            <View style={{ height: 16 }} /> {/* Espaço vertical */}
            <Link href="/diary/diary" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Ir ao diário</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
    title: { fontSize: 22, marginBottom: 20 },
    button: { backgroundColor: '#4F46E5', padding: 12, borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: '600' },
});