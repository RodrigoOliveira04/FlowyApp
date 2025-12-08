import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../api/types/user';

const KEY = 'current_user';
const subscribers = new Set<(u: User | null) => void>();

export async function signIn(user: User) {
  await AsyncStorage.setItem(KEY, JSON.stringify(user));
  console.debug('authService.signIn -> stored current_user', user);
  await notify();
}

export async function signOut() {
  await AsyncStorage.removeItem(KEY);
  console.debug('authService.signOut -> removed current_user');
  await notify();
}

export async function getCurrentUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(KEY);
  try {
    const parsed = raw ? (JSON.parse(raw) as User) : null;
    console.debug('authService.getCurrentUser ->', parsed);
    return parsed;
  } catch (err) {
    console.warn('authService: failed parsing current_user', err);
    return null;
  }
}

export async function isSignedIn(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEY)) != null;
}

export function onAuthStateChanged(cb: (u: User | null) => void) {
  subscribers.add(cb);
  // envia estado atual imediatamente
  getCurrentUser().then(u => cb(u));
  return () => subscribers.delete(cb);
}

async function notify() {
  const u = await getCurrentUser();
  console.debug('authService.notify -> broadcasting auth state', u);
  subscribers.forEach(cb => {
    try { cb(u); } catch (e) { console.warn('authService subscriber error', e); }
  });
}

/**
 * Migration helper (executar uma vez durante desenvolvimento se o registro
 * salvou no "user_data" em vez de "current_user")
 */
export async function migrateUserDataIfNeeded() {
  try {
    const saved = await AsyncStorage.getItem('user_data');
    const current = await AsyncStorage.getItem(KEY);
    if (saved && !current) {
      await AsyncStorage.setItem(KEY, saved);
      console.debug('authService.migrateUserDataIfNeeded -> migrated user_data to current_user');
      await notify();
    }
  } catch (err) {
    console.warn('authService.migrateUserDataIfNeeded error', err);
  }
}