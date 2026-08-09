def weather_parser(data):
    if not isinstance(data, dict):
        return "Weather data unavailable"

    current = data.get("current", {})
    daily = data.get("daily", {})

    try:
        return {
            "temperature_c": current.get("temperature_2m"),
            "humidity_percent": current.get("relative_humidity_2m"),
            "rain_mm": current.get("rain"),
            "wind_speed_kmh": current.get("wind_speed_10m"),
            "today_max_temp_c": daily.get("temperature_2m_max", [None])[0],
            "today_min_temp_c": daily.get("temperature_2m_min", [None])[0],
            "today_rain_sum_mm": daily.get("precipitation_sum", [None])[0],
            "rain_probability_percent": daily.get("precipitation_probability_max", [None])[0],
        }
    except Exception as e:
        print(f"[weather_parser] parsing failed: {e}")
        return "Weather data unavailable"