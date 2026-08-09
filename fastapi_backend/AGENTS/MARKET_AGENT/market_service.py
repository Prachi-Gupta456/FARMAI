import os
import requests
from .parser import market_parser
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("DATA_GOV_API_KEY")

BASE_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"

headers = {
    "User-Agent": "KrishiMitraAI/1.0",
    "Accept": "application/json"
}


def get_market_data(crop: str, state: str, district: str):
    params = {
        "api-key": API_KEY,
        "format": "json",
        "limit": 10,
        "filters[commodity]": crop,
        "filters[state]": state,
        "filters[district]": district,
    }

    response = requests.get(
        BASE_URL,
        params=params,
        headers=headers,
        timeout=30,
    )

    if response.status_code != 200:
        raise ValueError(
            f"Market API returned status {response.status_code} for {crop}, {district}, {state}: {response.text[:200]}"
        )

    if not response.text.strip():
        raise ValueError(f"Market API returned an empty response for {crop}, {district}, {state}")

    try:
        data = response.json()
    except ValueError as e:
        raise ValueError(f"Market API returned invalid JSON for {crop}, {district}, {state}: {e}")

    return market_parser(data)