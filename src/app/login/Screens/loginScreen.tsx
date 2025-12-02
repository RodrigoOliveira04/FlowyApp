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

export default function LoginScreen() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!user || !email || !password) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Digite um email válido.");
      setLoading(false);
      return;
    }

    try {
      const saved = await AsyncStorage.getItem("user_data");

      if (!saved) {
        setError("Nenhuma conta encontrada. Crie uma conta primeiro.");
        setLoading(false);
        return;
      }

      const storedUser = JSON.parse(saved);

      if (
        storedUser.username === user &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        router.replace("/diary/diary");
      } else {
        setError("Usuário, email ou senha incorretos.");
      }
    } catch (err) {
      setError("Erro ao acessar dados. Tente novamente.");
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bem vindo {user}</Text>

        <TextInput
          placeholder="Nome de usuário"
          value={user}
          onChangeText={setUser}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, loading && { opacity: 0.6 }]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login/Screens/register")}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login/Screens/forgot-password")}
        >
          <Text style={styles.link}>Esqueceu a senha?</Text>
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

  success: {
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 10,
  },
});
