from pydantic import BaseModel
from typing import List, Literal

class FallbackResponse(BaseModel):
    summary: str

class DiseaseResponse(BaseModel):
    disease_name: str
    confidence: float
    summary: str
    treatment: List[str]
    precautions: List[str]

class CropResponse(BaseModel):
    recommended_crops: List[str]
    reason: str
    expected_conditions: List[str]
    precautions: List[str]
    missing_fields: List[Literal["soil_type", "season", "water_sources", "previous_crops"]]

class FertilizerResponse(BaseModel):
    recommendation: str
    fertilizer: str
    quantity: str
    reason: str
    application_method: str
    precautions: List[str]
    missing_fields: List[Literal["crops"]]

class IrrigationResponse(BaseModel):
    recommendation: str
    irrigate_today: bool
    reason: str
    precautions: List[str]
    missing_fields: List[Literal["crops"]]

class MarketResponse(BaseModel):
    summary: str
    best_market: str
    recommendation: str
    reason: str
    expected_price: float
    missing_fields: List[Literal["crops"]]

class PestResponse(BaseModel):
    pest: str
    recommendation: str
    prevention: List[str]
    precautions: List[str]
    missing_fields: List[Literal["crops"]]

class SchemeResponse(BaseModel):
    summary: str
    matched_schemes: List[str]
    recommendation: str
    reason: str
    missing_fields: List[Literal["crops"]]

class WeatherResponse(BaseModel):
    summary: str
    recommendation: str
    risks: List[str]
    missing_fields: List[Literal["crops"]]

class RouterResponse(BaseModel):
    agent: Literal["disease", "weather", "market", "scheme",
                    "pest", "fertilizer", "irrigation", "crop_recommendation", "fallback"]