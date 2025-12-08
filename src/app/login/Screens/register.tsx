import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { signIn } from '../../../services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  async function handleRegister() {
    setError(null);

    // validações síncronas antes de ativar loading (evita estados presos)
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Preencha todos os campos.');
      return;
    }
    if (!validateEmail(email.trim())) {
      setError('Email inválido.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem('users');
      const users: any[] = raw ? JSON.parse(raw) : [];

      const maxId = users.reduce((m, u) => Math.max(m, Number(u.Id) || 0), 0);
      const nextId = (maxId + 1) || (users.length + 1);

      const newUser = {
        Id: String(nextId),
        codDiarioUsuario: String(nextId),
        idPerfil: String(nextId),
        Token: '',
        Username: username.trim(),
        Email: email.trim(),
        PasswordString: password,
        PasswordHash: '',
        PasswordSalt: '',
        infoPerfil: 'Bem vindo, novo usuário! Clique em editar perfil para adicionar mais informações.',
        qtdXp: 0,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      // persiste usuário atual e notifica subscribers (mantendo serviços intactos)
      //await signIn(newUser);

      // compatibilidade legada (opcional)
      await AsyncStorage.setItem('user_data', JSON.stringify(newUser)).catch(() => {});

      router.replace('/login/Screens/loginScreen');
    } catch (err) {
      console.error('register error', err);
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Criar conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login/Screens/loginScreen')}>
          <Text style={styles.link}>Já possui conta? Fazer login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEBFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  card: {
    width: "85%",
    backgroundColor: "#F9FBFF",
    padding: 24,
    borderRadius: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D5D9F",
    marginBottom: 24,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#BFD8FF",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    color: "#2D5D9F",
  },

  button: {
    backgroundColor: "#7CB6FF",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  link: {
    color: "#5A96E8",
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
  },

  error: {
    color: "#E57373",
    textAlign: "center",
    marginBottom: 10,
  },
});