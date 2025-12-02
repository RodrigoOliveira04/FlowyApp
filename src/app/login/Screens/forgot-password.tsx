import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // --- Função chamada ao clicar no botão "Enviar Instruções"
  const handleSendInstructions = () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, informe seu email.");
      return;
    }

    // Aqui você chamaria sua API ou lógica de recuperação de senha
    Alert.alert(
      "Email enviado",
      "Se esse email existir em nossa base, enviaremos instruções de recuperação."
    );

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar senha</Text>

      <Text style={styles.description}>
        Digite o email associado à sua conta e enviaremos instruções para redefinir sua senha.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Seu email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSendInstructions}>
        <Text style={styles.buttonText}>Enviar instruções</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backToLogin}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    backgroundColor: "#DCEBFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D5D9F", 
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
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
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backToLogin: {
    color: "#5A96E8",
    fontSize: 16,
    textAlign: "center",
  },
});
