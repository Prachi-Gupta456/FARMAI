from typing import TypedDict, Annotated, Optional, List
from langgraph.graph.message import add_messages


class RouterState(TypedDict, total=False):
   
    query: str
    language: str
    selected_agent: str
    lat: Optional[float]
    lng: Optional[float]
    state: Optional[str]
    district: Optional[str]
    crops: Optional[List[str]]
    previous_crops: Optional[List[str]]
    soil_type: Optional[str]
    season: Optional[str]
    water_sources: Optional[List[str]]
    farm_size: Optional[float]
    image_path: Optional[str]

    weather_result: dict
    market_result: dict
    scheme_result: dict
    pest_result: dict
    fertilizer_result: dict
    irrigation_result: dict
    crop_recommendation_result: dict
    disease_result: dict
    fallback_result: dict

    messages: Annotated[list, add_messages]