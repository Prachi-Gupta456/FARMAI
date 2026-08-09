
import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

export function getWeatherInfo(code) {
  const map = {
    0: { label: "Clear sky", icon: Sun },
    1: { label: "Mainly clear", icon: Sun },
    2: { label: "Partly cloudy", icon: CloudSun },
    3: { label: "Overcast", icon: Cloud },
    45: { label: "Foggy", icon: CloudFog },
    48: { label: "Foggy", icon: CloudFog },
    51: { label: "Light drizzle", icon: CloudDrizzle },
    53: { label: "Drizzle", icon: CloudDrizzle },
    55: { label: "Dense drizzle", icon: CloudDrizzle },
    61: { label: "Light rain", icon: CloudRain },
    63: { label: "Rain", icon: CloudRain },
    65: { label: "Heavy rain", icon: CloudRain },
    71: { label: "Light snow", icon: CloudSnow },
    73: { label: "Snow", icon: CloudSnow },
    75: { label: "Heavy snow", icon: CloudSnow },
    80: { label: "Rain showers", icon: CloudRain },
    81: { label: "Rain showers", icon: CloudRain },
    82: { label: "Violent showers", icon: CloudRain },
    95: { label: "Thunderstorm", icon: CloudLightning },
    96: { label: "Thunderstorm", icon: CloudLightning },
    99: { label: "Thunderstorm", icon: CloudLightning },
  };
  return map[code] || { label: "Weather", icon: Cloud };
}