import React, { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EntriesProvider } from "../contexts/diary/EntriesContext"; // sobe uma pasta pra src,
import { Slot } from 'expo-router';
import BottomNav from '../components/Nav/BottomNav';
import { onAuthStateChanged } from '../services/authService';
import { User } from '../api/types/user';



export default function RootLayout() {
    const [user, setUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(u => {
      console.debug('auth state changed ->', u);
      setUser(u);
      setInitializing(false);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  return (
    <EntriesProvider>
      <SafeAreaProvider style={styles.root}>
        <Slot />
        {/* Só mostra depois de inicializar e quando houver usuário */}
        {!initializing && user && <BottomNav />}
      </SafeAreaProvider>
    </EntriesProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#DCEBFF',
  },
  header: {
    // opcional styling de header
  },
});

