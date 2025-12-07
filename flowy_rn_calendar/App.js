import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerLeft}>Voltar</Text>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 56 }} />
    </View>
  );
}

function CalendarScreen() {
  const [selectedMonth] = useState('March');
  const days = ['Mo','Tu','We','Th','Fr','Sa','Su'];

  // quick mock of dates (1..31)
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const items = [
    { label: 'Item', time: '30min' },
    { label: 'Item', time: '60min' },
    { label: 'Item', time: '30min' },
    { label: 'Item', time: '15min' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title={selectedMonth} />
      <View style={styles.monthBar}>
        <Text style={styles.monthText}>{selectedMonth}</Text>
      </View>

      <View style={styles.calendarContainer}>
        <View style={styles.weekdaysRow}>
          {days.map((d) => (
            <Text key={d} style={styles.weekdayText}>{d}</Text>
          ))}
        </View>

        <View style={styles.datesGrid}>
          {dates.map((d) => (
            <View key={d} style={styles.dateCell}>
              <Text style={styles.dateText}>{d}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={styles.itemsList} contentContainerStyle={{ paddingBottom: 20 }}>
        {items.map((it, idx) => (
          <View key={idx} style={styles.itemRow}>
            <View style={styles.itemDot} />
            <Text style={styles.itemLabel}>{it.label}</Text>
            <Text style={styles.itemTime}>{it.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomDots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
      </View>
    </SafeAreaView>
  );
}

function AlertsScreen() {
  const [alerts, setAlerts] = useState([
    { time: '14:00', on: false },
    { time: '15:00', on: true },
  ]);

  const toggle = (index) => {
    const copy = [...alerts];
    copy[index].on = !copy[index].on;
    setAlerts(copy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Alertas" />

      <View style={{ padding: 20 }}>
        {alerts.map((a, i) => (
          <View key={i} style={styles.alertRow}>
            <View style={styles.alertCard}>
              <Text style={styles.alertTime}>{a.time}</Text>
            </View>
            <Switch value={a.on} onValueChange={() => toggle(i)} />
          </View>
        ))}
      </View>

      <View style={styles.bottomDots}>
        <View style={styles.dotActive} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  const [screen, setScreen] = useState('calendar');

  return (
    <View style={{ flex: 1 }}>
      {screen === 'calendar' ? <CalendarScreen /> : <AlertsScreen />}

      <View style={styles.fabRow}>
        <TouchableOpacity onPress={() => setScreen('calendar')} style={styles.fabButton}>
          <Text style={styles.fabText}>Calendário</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('alerts')} style={styles.fabButton}>
          <Text style={styles.fabText}>Alertas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },
  headerLeft: { color: '#1976D2' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  monthBar: { backgroundColor: '#1976D2', paddingVertical: 18, alignItems: 'center' },
  monthText: { color: 'white', fontSize: 20, fontWeight: '700' },
  calendarContainer: { padding: 12 },
  weekdaysRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6 },
  weekdayText: { width: (width - 24) / 7 - 2, textAlign: 'center', color: '#666' },
  datesGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  dateCell: { width: (width - 24) / 7 - 2, height: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  dateText: { color: '#333' },
  itemsList: { flex: 1, paddingHorizontal: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1976D2', marginRight: 12 },
  itemLabel: { flex: 1 },
  itemTime: { color: '#888' },
  bottomDots: { height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ddd', marginHorizontal: 8 },
  dotActive: { backgroundColor: '#1976D2' },
  alertRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  alertCard: { flex: 1, backgroundColor: '#072326', borderRadius: 12, padding: 14, marginRight: 12 },
  alertTime: { color: 'white', fontSize: 18 },
  fabRow: { position: 'absolute', bottom: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between' },
  fabButton: { backgroundColor: '#fff', padding: 10, borderRadius: 8, elevation: 3 },
  fabText: { color: '#1976D2', fontWeight: '600' },
});


