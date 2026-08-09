import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from WEATHER_AGENT.weather_service import fetch_weather
from .prompt import prompt
from pydantic import BaseModel
from typing import List,Optional
from common.llm_client import get_llm
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke


from pydantic import BaseModel
from typing import List


from typing import List, Literal
from pydantic import BaseModel

class CropResponse(BaseModel):
    recommended_crops: List[str]
    reason: str
    expected_conditions: List[str]
    precautions: List[str]
    missing_fields: List[Literal["soil_type", "season","water_sources","previous_crops","farm_size"]]


llm = get_llm(temperature=0.3)

structured_llm = llm.with_structured_output(CropResponse)

chain = prompt | structured_llm


def crop_recommendation_agent(lat: float,lng: float,query: str,language: str,previous_crops: Optional[List[str]] = None,
               soil_type: Optional[str] = None,season: Optional[str] = None,
               water_sources: Optional[List[str]] = None,farm_size: Optional[float] = None):
    try:
        weather_data = fetch_weather(lat,lng)
    except Exception as e:
        print(f"[crop_agent] weather fetch failed: {e}")
        weather_data = "Unknown"

    fallback_text = FALLBACK_MESSAGES.get(language, FALLBACK_MESSAGES["English"])

    return safe_invoke(
        chain,
        inputs={
        "weather": weather_data if weather_data else "Unknown",
        "soil_type": soil_type or "Unknown",
        "previous_crops": previous_crops or "Unknown",
        "season": season or "Unknown",
        "water_sources": water_sources or "Unknown",
        "farm_size": farm_size if farm_size is not None else "Unknown",
        "query": query,
        "language": language,
        },
        response_model=CropResponse,
        fallback_kwargs={
            "recommended_crops": [],
            "reason": fallback_text,
            "expected_conditions": [],
            "precautions": [],
            "missing_fields": [],
        },
    )


# res = crop_recommendation_agent(
#     lat=23.3441,
#     lng=85.3096,
#     query="Suggest crops for my farm",
#     language="English",
# )

# print(res)
