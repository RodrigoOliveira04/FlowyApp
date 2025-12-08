import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PHASES = [
  { name: "Inspire", seconds: 4 },
  { name: "Segure", seconds: 4 },
  { name: "Expire", seconds: 6 },
];

export default function Respiracao() {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].seconds);

  const scale = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;

    // start cycle
    const tick = () => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // next phase
          const next = (phaseIndex + 1) % PHASES.length;
          setPhaseIndex(next);
          return PHASES[next].seconds;
        }
        return prev - 1;
      });
    };

    timerRef.current = setInterval(tick, 1000) as unknown as number;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phaseIndex]);

  // Animate circle when phase changes
  useEffect(() => {
    const phase = PHASES[phaseIndex];
    // scale values: inspire -> grow, segure -> hold, expire -> shrink
    const toValue =
      phase.name === "Inspire" ? 1.4 : phase.name === "Segure" ? 1.4 : 0.8;
    Animated.timing(scale, {
      toValue,
      duration: phase.seconds * 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [phaseIndex, scale]);

  const toggle = () => {
    if (running) {
      setRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setRunning(true);
      setPhaseIndex(0);
      setTimeLeft(PHASES[0].seconds);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Respiração guiada</Text>
      <Text style={styles.subtitle}>
        Siga o círculo. Inspire. Segure. Expire.
      </Text>

      <View style={styles.centerArea}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ scale }],
            },
          ]}
        />
        <View style={styles.phaseBox}>
          <Text style={styles.phaseText}>{PHASES[phaseIndex].name}</Text>
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={toggle} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>
            {running ? "Parar" : "Começar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#DCEBFF",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "700", color: "#07294d" },
  subtitle: { marginTop: 6, color: "#6b7a90" },
  centerArea: { marginTop: 28, alignItems: "center", justifyContent: "center" },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 180,
    backgroundColor: "#d7e8ff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  phaseBox: { position: "absolute", alignItems: "center" },
  phaseText: { fontSize: 18, fontWeight: "700", color: "#07294d" },
  timerText: { marginTop: 6, color: "#5f6f86" },
  controls: { marginTop: 28 },
  controlButton: {
    backgroundColor: "#e9f1ff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  controlButtonText: { fontWeight: "600", color: "#07294d" },
});
