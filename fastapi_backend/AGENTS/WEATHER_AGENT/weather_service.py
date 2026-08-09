import requests
from .parser import weather_parser

BASE_URL = "https://api.open-meteo.com/v1/forecast"


def fetch_weather(lat:float,lng:float):
    params = {
        "latitude": lat,
        "longitude": lng,

        "current": [
            "temperature_2m",
            "relative_humidity_2m",
            "precipitation",
            "rain",
            "weather_code",
            "wind_speed_10m",
            "wind_direction_10m",
            "surface_pressure"
        ],

        "daily": [
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum",
            "precipitation_probability_max",
            "sunrise",
            "sunset"
        ],

        "timezone": "auto",
        "forecast_days": 1
    }

    response = requests.get(BASE_URL,params=params)
    response.raise_for_status()
    
    weather_json = response.json()
    return weather_parser(weather_json)

