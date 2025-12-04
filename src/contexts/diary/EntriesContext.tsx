// src/contexts/diary/EntriesContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type EntryType = {
  id: string;
  createdAt: string;      // ISO date
  mood: "happy" | "neutral" | "sad" | "angry" | "anxious";
  text: string;
};

type EntriesContextType = {
  entries: EntryType[];
  loaded: boolean;
  addEntry: (entry: Omit<EntryType, "id">) => Promise<void>;
};

const EntriesContext = createContext<EntriesContextType>({
  entries: [],
  loaded: false,
  addEntry: async () => {},
});

// ENTRADAS PADRÃO DO DIÁRIO (NEUTRAS)
const DEFAULT_PLACEHOLDERS: EntryType[] = [
  {
    id: "placeholder-1",
    createdAt: "2024-10-12",
    mood: "neutral",
    text: "Dia tranquilo. Nada especial, mas senti vontade de registrar.",
  },
  {
    id: "placeholder-2",
    createdAt: "2024-10-18",
    mood: "neutral",
    text: "Acordei cansado, mas consegui fazer tudo o que precisava.",
  },
  {
    id: "placeholder-3",
    createdAt: "2024-10-25",
    mood: "neutral",
    text: "Uma tarde silenciosa. Acho que foi bom ter um pouco de calma.",
  },
];

const STORAGE_KEY = "@flowy_diary_entries";

export function EntriesProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Carrega do AsyncStorage com placeholders
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        if (stored) {
          const parsed: EntryType[] = JSON.parse(stored);

          // Se já existirem entradas → só usa elas
          if (parsed.length > 0) {
            setEntries(parsed);
          } else {
            // Se estiver vazio → cria placeholders
            setEntries(DEFAULT_PLACEHOLDERS);
            await AsyncStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(DEFAULT_PLACEHOLDERS)
            );
          }
        } else {
          // Primeiro uso → salva placeholders automaticamente
          setEntries(DEFAULT_PLACEHOLDERS);
          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(DEFAULT_PLACEHOLDERS)
          );
        }

      } catch (err) {
        console.warn("Erro carregando diário:", err);
        setEntries(DEFAULT_PLACEHOLDERS);
      }

      setLoaded(true);
    };

    load();
  }, []);

  // Adiciona nova entrada
  const addEntry = async (entry: Omit<EntryType, "id">) => {
    const newEntry: EntryType = {
      id: Math.random().toString(36).substring(2),
      ...entry,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <EntriesContext.Provider value={{ entries, loaded, addEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}

export const useEntries = () => useContext(EntriesContext);
