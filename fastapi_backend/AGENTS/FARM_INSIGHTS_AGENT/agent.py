import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from WEATHER_AGENT.weather_service import fetch_weather
from .prompt import prompt

from typing import List
from pydantic import BaseModel

from common.llm_client import get_llm
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke


class FarmInsightsResponse(BaseModel):
    summary: str
    insights: List[str]


llm = get_llm(temperature=0.3)

structured_llm = llm.with_structured_output(FarmInsightsResponse)

chain = prompt | structured_llm


def farm_insights_agent(
    lat: float,
    lng: float,
    language: str,
):
    try:
        weather_data = fetch_weather(lat, lng)
    except Exception as e:
        print(f"[farm_insights_agent] weather fetch failed: {e}")
        weather_data = "Unknown"

    fallback_text = FALLBACK_MESSAGES.get(
        language,
        FALLBACK_MESSAGES["English"],
    )

    return safe_invoke(
        chain,
        inputs={
            "weather": weather_data,
            "language": language
        },
        response_model=FarmInsightsResponse,
        fallback_kwargs={
            "summary": fallback_text,
            "insights": [],
        },
    )

