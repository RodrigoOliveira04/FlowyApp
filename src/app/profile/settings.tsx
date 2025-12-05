import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function ProfileSettings() {
    const [notifications, setNotifications] = React.useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Notificações</Text>
                <Switch value={notifications} onValueChange={setNotifications} />
            </View>

            <View style={styles.info}>
                <Text style={{ color: '#666' }}>Configurações relacionadas ao aplicativo e perfil.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    label: { fontSize: 16 },
    info: { marginTop: 12 },
});