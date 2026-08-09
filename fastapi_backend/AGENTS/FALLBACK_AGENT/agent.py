from pydantic import BaseModel

from .prompt import prompt
from common.llm_client import get_llm
from common.fallback_msg import FALLBACK_MESSAGES
from common.validator import safe_invoke
from common.message_utils import format_history


class FallbackResponse(BaseModel):
    summary: str


llm = get_llm(temperature=0.4)
structured_llm = llm.with_structured_output(FallbackResponse)
chain = prompt | structured_llm


def fallback_agent(query: str, language: str = "english", history: list = None):
    fallback_text = FALLBACK_MESSAGES.get(language, FALLBACK_MESSAGES["English"])

    result = safe_invoke(
        chain,
        inputs={
            "query": query,
            "language": language,
            "history": format_history(history or []),
        },
        response_model=FallbackResponse,
        fallback_kwargs={"summary": fallback_text},
    )
    return result