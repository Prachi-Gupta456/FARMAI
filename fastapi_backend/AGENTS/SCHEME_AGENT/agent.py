import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pydantic import BaseModel
from typing import List, Optional, Literal

from common.llm_client import get_llm
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke

from .prompt import prompt
from .service import get_scheme_context


class SchemeResponse(BaseModel):
    summary: str
    matched_schemes: List[str]
    recommendation: str
    reason: str
    missing_fields: List[Literal["crops"]]


llm = get_llm(temperature=0.2)
structured_llm = llm.with_structured_output(SchemeResponse)
chain = prompt | structured_llm


def scheme_agent(state: str, query: str, language: str, crops: Optional[List[str]] = None):
    crops = crops or []

    try:
        scheme_context = get_scheme_context(query, crops, state)
    except Exception as e:
        print(f"[scheme_agent] retrieval failed: {e}")
        scheme_context = None

    fallback_text = FALLBACK_MESSAGES.get(language, FALLBACK_MESSAGES["Hindi"])

    return safe_invoke(
        chain,
        inputs={
            "query": query,
            "state": state,
            "crops": ", ".join(crops) if crops else "Unknown",
            "scheme_context": scheme_context,
            "language": language,
        },
        response_model=SchemeResponse,
        fallback_kwargs={
            "summary": fallback_text,
            "matched_schemes": [],
            "recommendation": "",
            "reason": fallback_text,
            "missing_fields": [],
        },
    )