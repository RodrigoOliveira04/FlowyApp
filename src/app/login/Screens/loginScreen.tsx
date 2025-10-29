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

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (user === "user example" && email === "user@example.com" 
        && password === "senha123"){
            router.replace("");
        } 
        else {
            setError("Email ou senha inválidos");
        }

        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
        style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Bem Vindo {user}</Text>

                <TextInput
                    placeholder="nome de usuário"
                    value={user}
                    onChangeText={setUser}
                    style={styles.input}
                    keyboardType="default"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="senha"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.button, loading && {opacity: 0.6}]}
                    disabled={loading}>

                    {loading ? (
                    <ActivityIndicator color="#fff" />
                                    ) : (
                    <Text style={styles.buttonText}>Log In</Text>
                  )}
                    
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#dfedff",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: "85%",
      backgroundColor: "#fff",
      padding: 24,
      borderRadius: 12,
      elevation: 4,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 24,
      textAlign: "center",
      color: "#333",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    button: {
      backgroundColor: "#007AFF",
      padding: 15,
      borderRadius: 8,
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: 10,
    },
  });