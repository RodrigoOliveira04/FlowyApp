// ...existing code...
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  if (Platform.OS === 'web') {
    return <View style={styles.bar}>{children}</View>;
  }
  return <RNSafeAreaView edges={['bottom']} style={styles.bar}>{children}</RNSafeAreaView>;
};

export default function BottomNav() {
  const path = usePathname() ?? '';
  const router = useRouter();

  const isActive = (route: string) => path.startsWith(route);

  const btnStyle = (route: string, extra?: keyof typeof styles) => {
    const base = { ...styles.btn };
    if (isActive(route)) Object.assign(base, styles.active);
    if (extra) Object.assign(base, styles[extra]);
    return base;
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.push('/exercicio/exercicio')}
          style={btnStyle('/exercicio')}
          accessibilityLabel="Exercícios"
        >
          <Text style={styles.icon}>🏃‍♂️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/diary/diary')}
          style={btnStyle('/diary', 'middle')}
          accessibilityLabel="Diário"
        >
          <Text style={styles.icon}>📔</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/profile/profile')}
          style={btnStyle('/profile')}
          accessibilityLabel="Perfil"
        >
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
}

const SIZE = 52;        // reduzido
const BAR_HEIGHT = 84;  // altura do fundo do bottom bar

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F6F8FF', // cor fixa do fundo do bar
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'visible',
  },
  container: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', // espaça os botões uniformemente
    paddingHorizontal: 18,
    paddingBottom: Platform.select({ ios: 12, android: 12, default: 12 }),
  },
  btn: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6,
  },
  middle: {
    // ligeiro deslocamento se precisar
  },
  active: {
    backgroundColor: '#4F46E5',
    transform: [{ scale: 1.06 }],
  },
  icon: {
    fontSize: 20,
  },
});