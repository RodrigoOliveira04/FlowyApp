import { Slot, Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { EntriesProvider } from "../contexts/diary/EntriesContext"; // sobe uma pasta pra src

//Isso aqui serve como um layout global, onde todos os componentes vao ser renderizados dentro do <Slot />
//Basicamente, da pra usar como header/footer que aparece em todas as telas
export default function RootLayout() {
  return (
    <EntriesProvider>
      <View style={styles.root}>
        <View style={styles.header}>
          {/* Aqui pode ser um header fixo*/}
        </View>
        <Slot />
      </View>
    </EntriesProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#b4dde9',
  },
  header: {
    // opcional styling de header
  },
});

//Layour das tabs e o style sheet
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: tabStyles.tabBar,

        tabBarLabelStyle: tabStyles.tabLabel,

        tabBarActiveTintColor: "#7CB6FF",
        tabBarInactiveTintColor: "#2D5D9F",
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="diary"
        options={{
          title: "Diário",
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercícios",
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#F9FBFF", // igual ao card
    borderTopWidth: 1,
    borderTopColor: "#BFD8FF", // tom azul suave
    height: 65,
    paddingBottom: 8,
    paddingTop: 8,
  },

  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D5D9F", // seu azul escuro principal
  },

  tabLabelFocused: {
    color: "#7CB6FF", // azul claro do botão
  },
});


