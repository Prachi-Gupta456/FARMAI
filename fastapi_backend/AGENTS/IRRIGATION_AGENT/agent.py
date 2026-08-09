import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from WEATHER_AGENT.weather_service import fetch_weather
from .prompt import prompt

from typing import List, Optional, Literal
from pydantic import BaseModel

from common.llm_client import get_llm
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke


class IrrigationResponse(BaseModel):
    recommendation: str
    irrigate_today: bool
    reason: str
    precautions: List[str]
    missing_fields: List[Literal["crops"]]


llm = get_llm(temperature=0.3)

structured_llm = llm.with_structured_output(IrrigationResponse)

chain = prompt | structured_llm


def irrigation_agent(
    lat: float,
    lng: float,
    query: str,
    language: str,
    crops: Optional[List[str]] = None,
):
    try:
        weather_data = fetch_weather(lat, lng)
    except Exception as e:
        print(f"[irrigation_agent] weather fetch failed: {e}")
        weather_data = "Unknown"

    fallback_text = FALLBACK_MESSAGES.get(
        language,
        FALLBACK_MESSAGES["English"],
    )

    return safe_invoke(
        chain,
        inputs={
            "crops": ", ".join(crops) if crops else "Unknown",
            "weather": weather_data,
            "query": query,
            "language": language,
        },
        response_model=IrrigationResponse,
        fallback_kwargs={
            "recommendation": fallback_text,
            "irrigate_today": False,
            "reason": "Unable to generate irrigation advice.",
            "precautions": [],
            "missing_fields": [],
        },
    )


# res = irrigation_agent(
#     lat=25.5941,
#     lng=85.1376,
#     query="Should I irrigate my field today?",
#     language="English"
# )

# print(res)