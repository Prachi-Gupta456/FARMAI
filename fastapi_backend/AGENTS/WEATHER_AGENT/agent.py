import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from .weather_service import fetch_weather
from .prompt import prompt
from pydantic import BaseModel
from typing import List, Optional, Literal

from common.llm_client import get_llm
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke


class WeatherResponse(BaseModel):
    summary: str
    recommendation: str
    risks: List[str]
    missing_fields: List[Literal["crops"]]


llm = get_llm(temperature=0.3)

structured_llm = llm.with_structured_output(WeatherResponse)

chain = prompt | structured_llm


def weather_agent(lat: float, lng: float, query: str, language: str, crops: Optional[List[str]] = None):
    try:
        weather_data = fetch_weather(lat, lng)
    except Exception as e:
        print(f"[weather_agent] weather fetch failed: {e}")
        weather_data = "Unknown"

    fallback_text = FALLBACK_MESSAGES.get(
        language,
        FALLBACK_MESSAGES["English"]
    )

    return safe_invoke(
        chain,
        inputs={
            "crops": ", ".join(crops) if crops else "Unknown",
            "weather_data": weather_data,
            "query": query,
            "language": language,
        },
        response_model=WeatherResponse,
        fallback_kwargs={
            "summary": fallback_text,
            "recommendation": fallback_text,
            "risks": [],
            "missing_fields": [],
        },
    )