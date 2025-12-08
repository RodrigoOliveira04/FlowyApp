import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Meditacao() {
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60 * 3); // 3 minutos por padrão
  const opacity = useRef(new Animated.Value(0.6)).current;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current as number);
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000) as unknown as number;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      Animated.timing(opacity, {
        toValue: 0.6,
        duration: 400,
        useNativeDriver: true,
      }).start();
    };
  }, [running, opacity]);

  const toggle = () => {
    if (running) {
      setRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setSecondsLeft(60 * 3);
      setRunning(true);
    }
  };

  const mm = Math.floor(secondsLeft / 60);
  const ss = secondsLeft % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditação</Text>
      <Text style={styles.subtitle}>
        Foque na respiração. Observe sem julgar.
      </Text>

      <Animated.View style={[styles.meditArea, { opacity }]}>
        <Text style={styles.timerLarge}>{`${mm.toString().padStart(2, "0")}:${ss
          .toString()
          .padStart(2, "0")}`}</Text>
        <Text style={styles.prompt}>
          Respire fundo. Volte ao presente quando perceber a mente vagando.
        </Text>
      </Animated.View>

      <TouchableOpacity onPress={toggle} style={styles.controlButton}>
        <Text style={styles.controlText}>
          {running ? "Parar" : "Iniciar 3 min"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#DCEBFF",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "700", color: "#07294d" },
  subtitle: { marginTop: 6, color: "#6b7a90" },
  meditArea: {
    marginTop: 28,
    width: "86%",
    borderRadius: 12,
    padding: 18,
    backgroundColor: "#eef6ff",
    alignItems: "center",
  },
  timerLarge: { fontSize: 34, fontWeight: "700", color: "#07294d" },
  prompt: { marginTop: 10, textAlign: "center", color: "#5f6f86" },
  controlButton: {
    marginTop: 26,
    backgroundColor: "#e9f1ff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  controlText: { fontWeight: "600", color: "#07294d" },
});
