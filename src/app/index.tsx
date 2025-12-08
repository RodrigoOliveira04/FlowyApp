import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getCurrentUser } from '../services/authService';

const LOGO = require('../../assets/images/flowy.png');

export default function Home() {
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const user = await getCurrentUser();
      if (!mounted) return;
      if (user) {
        router.replace('/profile/profile');
      } else {
        setChecking(false);
      }
    })();
    return () => { mounted = false; };
  }, [router]);

  if (checking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={LOGO} style={[styles.logo, { width: Math.min(220, width * 0.6) }]} resizeMode="contain" />
          <Text style={styles.appName}>Flowy</Text>
          <Text style={styles.subtitle}>Bem‑vindo — cuide do seu dia a dia com leveza</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/login/Screens/loginScreen')}>
            <Text style={styles.primaryText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/login/Screens/register')}>
            <Text style={styles.secondaryText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} Flowy</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#DCEBFF' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 28 },
  logo: { height: 96, marginBottom: 8 },
  appName: { fontSize: 28, fontWeight: '800', color: '#123E6B' },
  subtitle: { fontSize: 14, color: '#3b556e', marginTop: 6, textAlign: 'center', maxWidth: 320 },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 6,
  },

  primaryBtn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#E6EEFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryText: { color: '#4F46E5', fontWeight: '700', fontSize: 15 },

  footer: { marginTop: 18, color: '#7b8fa6', fontSize: 12 },
});
