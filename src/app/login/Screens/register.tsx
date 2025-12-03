import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    if (!user || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Digite um email válido.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    const newUser = {
      username: user,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem("user_data", JSON.stringify(newUser));

    setLoading(false);

    router.replace("/login/Screens/loginScreen");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          placeholder="Nome de usuário"
          value={user}
          onChangeText={setUser}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TextInput
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          style={[styles.button, loading && { opacity: 0.6 }]}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login/Screens/loginScreen")}>
          <Text style={styles.link}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: "#DCEBFF", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  card: { width: "85%", 
    backgroundColor: "#F9FBFF", 
    padding: 24, 
    borderRadius: 12, 
    elevation: 4 
  },
  title: { fontSize: 28, 
    fontWeight: "bold", 
     color: "#2D5D9F", 
    marginBottom: 24, 
    textAlign: "center" 
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
  button: { backgroundColor: "#7CB6FF", 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 10 
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  error: { color: "red", 
    textAlign: "center", 
    marginBottom: 10 
  },
  link: { color: "#007AFF", 
    textAlign: "center", 
    marginTop: 10 
  },
});
