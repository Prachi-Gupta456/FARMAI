from typing import Type, TypeVar
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)

def safe_invoke(chain, inputs: dict, response_model: Type[T], fallback_kwargs: dict) -> T:
    """
    Invokes a langchain structured-output chain safely.
    On any failure, returns response_model populated with fallback_kwargs
    instead of raising — so agents never crash the orchestrator.
    """
    try:
        return chain.invoke(inputs)
    except Exception as e:
        print(f"[safe_invoke] chain failed: {e}")
        return response_model(**fallback_kwargs)