import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../api/types/user';
import { signIn, getCurrentUser } from './authService';

const KEY = 'current_user';

export async function getUser(): Promise<User | null> {
  // retorna o usuário salvo pelo authService (persistente)
  return await getCurrentUser();
}

/**
 * Atualiza o usuário persistente e notifica o authService para atualizar o estado global.
 * O signIn já salva no AsyncStorage e notifica subscribers; mantemos também a gravação direta
 * por redundância compatível com implementações anteriores.
 */
export async function updateUser(user: User): Promise<void> {
  await signIn(user); // grava e notifica
  // grava redundante (não estritamente necessário, mas seguro)
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(user));
  } catch (err) {
    // silencioso em produção; pode logar durante desenvolvimento
    console.warn('userService: failed to persist user directly', err);
  }
}