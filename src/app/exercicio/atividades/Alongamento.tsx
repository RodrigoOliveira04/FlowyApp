import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const alongGif = require("../../../../assets/images/Alongamento.gif");
const alongOmbroGif = require("../../../../assets/images/AlongamentoOmbro.gif");
const alongPernaGif = require("../../../../assets/images/AlongamentoPerna.gif");



const ROUTINE = [
  {
    name: "Pescoço suave",
    description: "Com as costas direitas, coloque as mãos atrás da cabeça (ou pode fazer sem as mãos, se preferir) e leve o queixo em direção ao peito. Aqui, vai sentir alongar os músculos da parte de trás do pescoço e começo da coluna. Mantenha a posição por 15 a 30 segundos nesta e depois eleve o queixo em direção ao teto e mantenha por mais 20 segundos.",
    seconds: 20,
    image: alongGif,
  },
  {
    name: "Ombros",
    description: "Levante o braço direito para cima e dobre-o para trás, tocando as costas com a mão. Utilize a mão esquerda para segurar o cotovelo direito. Mantenha essa posição por 15 a 30 segundos, mantendo uma postura ereta. Repita o mesmo procedimento com o braço esquerdo. Com o tempo, este alongamento contribuirá para aumentar a flexibilidade dos ombros e reduzir a tensão na parte superior das costas.",
    seconds: 25,
    image: alongOmbroGif,
  },
  {
    name: "Pernas",
    description: "em pé, leve o pé atrás e segure com a mão correspondente, puxando suavemente o calcanhar em direção aos glúteos. Mantenha essa posição por 15 a 30 segundos e depois repita o mesmo com a outra perna. Este alongamento foca-se nos músculos da parte da frente da coxa, ajudando a esticá-los. Isto alivia a tensão na parte inferior das costas e previne dores musculares.",
    seconds: 30,
    image: alongPernaGif,
  },
];

export default function Alongamento() {
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ROUTINE[0].seconds);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          const next = idx + 1;
          if (next >= ROUTINE.length) {
            clearInterval(timerRef.current as number);
            setRunning(false);
            return 0;
          }
          setIdx(next);
          return ROUTINE[next].seconds;
        }
        return t - 1;
      });
    }, 1000) as unknown as number;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, idx]);

  const start = () => {
    setIdx(0);
    setTimeLeft(ROUTINE[0].seconds);
    setRunning(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alongamento leve</Text>
      <Text style={styles.subtitle}>Sequência rápida para soltar o corpo</Text>

      <View style={styles.card}>
        <Image source={ROUTINE[idx].image} style={styles.gif} />

        <Text style={styles.moveTitle}>{ROUTINE[idx].name}</Text>
        <Text style={styles.moveDesc}>{ROUTINE[idx].description}</Text>
        <Text style={styles.moveTimer}>{timeLeft}s</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={start} style={styles.controlButton}>
          <Text style={styles.controlText}>Iniciar rotina</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// -- styles mantidos (o teu mesmo) --
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#fbfdff",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "700", color: "#07294d" },
  subtitle: { marginTop: 6, color: "#6b7a90" },
  card: {
    marginTop: 28,
    width: "86%",
    borderRadius: 12,
    padding: 18,
    backgroundColor: "#eef6ff",
    alignItems: "center",
  },
  gif: {
    width: 180,
    height: 180,
    marginBottom: 16,
    borderRadius: 12,
  },
  moveTitle: { fontSize: 18, fontWeight: "700", color: "#07294d" },
  moveDesc: { marginTop: 8, color: "#5f6f86", textAlign: "center" },
  moveTimer: {
    marginTop: 12,
    fontWeight: "700",
    color: "#07294d",
    fontSize: 22,
  },
  controls: { marginTop: 24 },
  controlButton: {
    backgroundColor: "#e9f1ff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  controlText: { fontWeight: "600", color: "#07294d" },
});
