import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>

      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>30</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFCD00" },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: { fontSize: 40, fontWeight: "500" },
  weather: { flex: 3 },
  day: {
    flex: 1,
    alignItems: "center",
  },
  temp: { fontSize: 160, marginTop: 50 },
  desc: { fontSize: 50, marginTop: -20 },
});
