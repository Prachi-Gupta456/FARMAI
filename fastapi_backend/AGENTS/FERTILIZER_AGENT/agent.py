import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from WEATHER_AGENT.weather_service import fetch_weather
from .prompt import prompt

from typing import List,Optional,Literal
from pydantic import BaseModel

from common.llm_client import get_llm
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke


from typing import List

class FertilizerResponse(BaseModel):
    recommendation: str
    fertilizer: str
    quantity: str
    reason: str
    application_method: str
    precautions: List[str]
    missing_fields: List[Literal["crops"]]


llm = get_llm(temperature=0.3)

structured_llm = llm.with_structured_output(FertilizerResponse)

chain = prompt | structured_llm


def fertilizer_agent(
    lat: float,
    lng: float,
    query: str,
    language: str,
    crops: Optional[List[str]]= None
):
    try:
        weather_data = fetch_weather(lat, lng)
    except Exception as e:
        print(f"[fertilizer_agent] weather fetch failed: {e}")
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
        response_model=FertilizerResponse,
        fallback_kwargs={
    "recommendation": fallback_text,
    "fertilizer": "",
    "quantity": "",
    "reason": "Unable to generate fertilizer recommendation.",
    "application_method": "",
    "precautions": [],
    "missing_fields": [],

        },
    )

# res = fertilizer_agent(
#     lat=25.5941,
#     lng=85.1376,
#     query="Which fertilizer should I apply after transplantation?",
#     language="English"
# )

# print(res)