import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from '../../services/authService';

export default function ProfileSettings() {
    const [notifications, setNotifications] = React.useState(true);
    const router = useRouter();

    async function handleLogout() {
        Alert.alert(
            'Sair',
            'Deseja sair da sua conta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        await signOut();
                        router.replace('/login/Screens/loginScreen');
                    },
                },
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Notificações</Text>
                <Switch value={notifications} onValueChange={setNotifications} />
            </View>

            <View style={styles.info}>
                <Text style={{ color: '#666' }}>Configurações relacionadas ao aplicativo e perfil.</Text>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutText}>Sair da conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    label: { fontSize: 16 },
    info: { marginTop: 12 },
    logoutBtn: {
        marginTop: 28,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: '#EF4444',
        fontWeight: '700',
    },
});