import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from .market_service import get_market_data
from .prompt import market_prompt
from pydantic import BaseModel
from typing import List, Optional, Literal

from common.llm_client import get_llm
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke


class MarketResponse(BaseModel):
    summary: str
    best_market: str
    recommendation: str
    reason: str
    expected_price: float
    missing_fields: List[Literal["crops"]]


llm = get_llm(temperature=0.3)
structured_llm = llm.with_structured_output(MarketResponse)
chain = market_prompt | structured_llm


def fetch_market_data_for_crops(crops: List[str], state: str, district: str) -> str:
    lines = []
    for crop in crops:
        try:
            data = get_market_data(crop, state, district)
            lines.append(f"{crop}: {data}")
        except Exception as e:
            print(f"[market_agent] data fetch failed for {crop}: {e}")
            lines.append(f"{crop}: no data available")
    return "\n".join(lines)


def market_agent(state: str, district: str, query: str, language: str, crops: Optional[List[str]] = None):
    crops = crops or []

    if crops:
        market_data = fetch_market_data_for_crops(crops, state, district)
    else:
        market_data = "Unknown"

    fallback_text = FALLBACK_MESSAGES.get(language, FALLBACK_MESSAGES["English"])

    return safe_invoke(
        chain,
        inputs={
            "crops": ", ".join(crops) if crops else "Unknown",
            "query": query,
            "market_data": market_data,
            "language": language,
        },
        response_model=MarketResponse,
        fallback_kwargs={
            "summary": fallback_text,
            "best_market": "",
            "recommendation": "monitor",
            "reason": fallback_text,
            "expected_price": 0.0,
            "missing_fields": [],
        },
    )


# res = market_agent(state="Gujarat", district="Rajkot", crops=["Mustard", "Wheat"],
#              query="should i sell mustard today", language="hi")

# print(res)