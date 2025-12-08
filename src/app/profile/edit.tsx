import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { User } from '../../api/types/user';
import { getUser, updateUser } from '../../services/userService';

export default function EditProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [Username, setUsername] = useState('');
    const [infoPerfil, setinfoPerfil] = useState('');
    const router = useRouter();

    useEffect(() => {
        getUser().then(u => {
            setUser(u);
            setUsername(u?.Username ?? '');
            setinfoPerfil(u?.infoPerfil ?? '');
        });
    }, []);

    async function save() {
        if (!user) return;
        const updated = { ...user, Username, infoPerfil };
        await updateUser(updated);
        Alert.alert('Perfil salvo');
        router.back();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} value={Username} onChangeText={setUsername} />

            <Text style={styles.label}>Bio</Text>
            <TextInput style={[styles.input, { height: 100 }]} value={infoPerfil} onChangeText={setinfoPerfil} multiline />

            <TouchableOpacity style={styles.saveBtn} onPress={save}>
                <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50 },
    label: { marginTop: 12, marginBottom: 6, color: '#333' },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, backgroundColor: '#fff' },
    saveBtn: { marginTop: 20, backgroundColor: '#4F46E5', padding: 12, borderRadius: 8 },
    saveText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});