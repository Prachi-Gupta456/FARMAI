import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pydantic import BaseModel
from typing import List, Optional

from .prompt import prompt
from .prediction import predict_disease

from common.llm_client import get_llm
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke


class DiseaseResponse(BaseModel):
    disease_name: str
    confidence: float
    summary: str
    treatment: List[str]
    precautions: List[str]


llm = get_llm(temperature=0.3)
structured_llm = llm.with_structured_output(DiseaseResponse)
chain = prompt | structured_llm


def disease_agent(image_path: str, query: Optional[str] = None, language: str = "english"):
    predicted_disease, confidence = predict_disease(image_path)
    confidence_percent = round(confidence * 100, 1)

    fallback_text = FALLBACK_MESSAGES.get(language, FALLBACK_MESSAGES["English"])

    result = safe_invoke(
        chain,
        inputs={
            "predicted_disease": predicted_disease,
            "query": query or "No specific question — just diagnose and advise.",
            "confidence": confidence_percent,
            "language": language,
        },
        response_model=DiseaseResponse,
        fallback_kwargs={
            "disease_name": predicted_disease,
            "confidence": confidence_percent,
            "summary": fallback_text,
            "treatment": [],
            "precautions": [],
        },
    )

    result.disease_name = predicted_disease
    result.confidence = confidence_percent
    return result