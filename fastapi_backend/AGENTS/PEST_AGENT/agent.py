import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from WEATHER_AGENT.weather_service import fetch_weather
from .prompt import prompt
from pydantic import BaseModel
from common.llm_client import get_llm
from typing import List, Optional, Literal
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke


class PestResponse(BaseModel):
    pest: str
    recommendation: str
    prevention: List[str]
    precautions: List[str]
    missing_fields: List[Literal["crops"]]


llm = get_llm(temperature=0.3)

structured_llm = llm.with_structured_output(PestResponse)

chain = prompt | structured_llm


def pest_agent(lat: float, lng: float, query: str, language: str, crops: Optional[List[str]] = None):
    try:
        weather_data = fetch_weather(lat, lng)
    except Exception as e:
        print(f"[pest_agent] weather fetch failed: {e}")
        weather_data = "Unknown"

    fallback_text = FALLBACK_MESSAGES.get(
        language,
        FALLBACK_MESSAGES["English"]
    )

    return safe_invoke(
        chain,
        inputs={
            "crops": ", ".join(crops) if crops else "Unknown",
            "query": query,
            "weather_data": weather_data,
            "language": language,
        },
        response_model=PestResponse,
        fallback_kwargs={
            "pest": "",
            "recommendation": fallback_text,
            "prevention": [],
            "precautions": [],
            "missing_fields": [],
        },
    )


# res = pest_agent(
#     lat=25.5941,
#     lng=85.1376,
#     crops=["Cotton"],
#     query="How can I control aphids in my cotton crop?",
#     language="English"
# )

# print(res)