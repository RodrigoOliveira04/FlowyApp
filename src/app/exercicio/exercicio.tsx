import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ActivityItem = {
  key: string;
  title: string;
  subtitle: string;
  route: string;
};

const activities: ActivityItem[] = [
  {
    key: "respiracao",
    title: "Respiração guiada",
    subtitle: "Exercício para acalmar e regular o ritmo respiratório",
    route: "./atividades/Respiracao",
  },
  {
    key: "meditacao",
    title: "Meditação curta",
    subtitle: "Sessão guiada de atenção plena (mindfulness)",
    route: "./atividades/Meditacao",
  },
  {
    key: "alongamento",
    title: "Alongamento leve",
    subtitle: "Sequência simples para soltar o corpo",
    route: "./atividades/Alongamento",
  },
];

export default function Exercicios() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.header}>Exercícios</Text>

        <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
          {activities.map((a) => (
            <TouchableOpacity
              key={a.key}
              style={styles.activityCard}
              onPress={() => router.push(a.route)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>{a.title}</Text>
                <Text style={styles.activitySubtitle}>{a.subtitle}</Text>
              </View>

              <View style={styles.openButton}>
                <Text style={styles.openButtonText}>Abrir</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f7ff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
  },
  cardContainer: {
    flex: 1,
    width: "92%",
    maxHeight: "88%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0b3a66",
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f0f5ff",
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#07294d",
  },
  activitySubtitle: {
    fontSize: 13,
    color: "#6b7a90",
    marginTop: 4,
  },
  openButton: {
    backgroundColor: "#e0eaff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  openButtonText: {
    fontWeight: "600",
    color: "#0b3a66",
  },
});
