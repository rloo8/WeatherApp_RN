import { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const API_KEY = "9b36f45c8e28e1ecbbaab595f7180216";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");
  const [temp, setTemp] = useState([]);
  const [weather, setWeather] = useState([]);

  const getWeather = async () => {
    // 유저 위치 추적 허락
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) {
      setOk(false);
    }

    // 유저 위치 정보
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setWeather(json.weather[0]);
    setTemp(json.main.temp);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {weather.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          <View style={styles.day}>
            <Text style={styles.temp}>{parseFloat(temp).toFixed(0)}°C</Text>
            <Text style={styles.desc}>{weather.main}</Text>
          </View>
        )}
      </ScrollView>
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
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: { fontSize: 150, marginTop: 50 },
  desc: { fontSize: 40, marginTop: -10 },
});
