import functools
from langchain_core.messages import AIMessage

from CROP_RECOMMENDATION_AGENT.agent import crop_recommendation_agent
from WEATHER_AGENT.agent import weather_agent
from FERTILIZER_AGENT.agent import fertilizer_agent
from IRRIGATION_AGENT.agent import irrigation_agent
from MARKET_AGENT.agent import market_agent
from PEST_AGENT.agent import pest_agent
from SCHEME_AGENT.agent import scheme_agent
from FALLBACK_AGENT.agent import fallback_agent
from DISEASE_AGENT.agent import disease_agent

from .graph_state import RouterState
from common.message_utils import extract_summary


def remembers(result_key: str):
    """Wraps a node function: after it returns its {result_key: ...} dict,
    also appends an AIMessage summarizing that result to state["messages"],
    so the next turn's history includes what this agent said."""
    def decorator(node_fn):
        @functools.wraps(node_fn)
        def wrapper(state: RouterState):
            output = node_fn(state)
            result_dict = output.get(result_key, {})
            summary_text = extract_summary(result_dict)
            output["messages"] = [AIMessage(content=summary_text)]
            return output
        return wrapper
    return decorator


@remembers("fallback_result")
def fallback_node(state: RouterState):
    result = fallback_agent(
        query=state["query"],
        language=state["language"],
        history=state.get("messages", []),
    )
    return {"fallback_result": result.model_dump()}


@remembers("crop_recommendation_result")
def crop_recommendation_node(state: RouterState):
    result = crop_recommendation_agent(
        lat=state.get("lat"),
        lng=state.get("lng"),
        query=state["query"],
        language=state["language"],
        previous_crops=state.get("previous_crops"),
        soil_type=state.get("soil_type"),
        season=state.get("season"),
        water_sources=state.get("water_sources"),
        farm_size=state.get("farm_size"),
    )
    return {"crop_recommendation_result": result.model_dump()}


@remembers("weather_result")
def weather_node(state: RouterState):
    result = weather_agent(
        lat=state.get("lat"),
        lng=state.get("lng"),
        crops=state.get("crops"),
        query=state["query"],
        language=state["language"],
    )
    return {"weather_result": result.model_dump()}


@remembers("pest_result")
def pest_node(state: RouterState):
    result = pest_agent(
        lat=state.get("lat"),
        lng=state.get("lng"),
        crops=state.get("crops"),
        query=state["query"],
        language=state["language"],
    )
    return {"pest_result": result.model_dump()}


@remembers("fertilizer_result")
def fertilizer_node(state: RouterState):
    result = fertilizer_agent(
        lat=state.get("lat"),
        lng=state.get("lng"),
        crops=state.get("crops"),
        query=state["query"],
        language=state["language"],
    )
    return {"fertilizer_result": result.model_dump()}


@remembers("irrigation_result")
def irrigation_node(state: RouterState):
    result = irrigation_agent(
        lat=state.get("lat"),
        lng=state.get("lng"),
        crops=state.get("crops"),
        query=state["query"],
        language=state["language"],
    )
    return {"irrigation_result": result.model_dump()}


@remembers("market_result")
def market_node(state: RouterState):
    result = market_agent(
        state=state.get("state"),
        district=state.get("district"),
        crops=state.get("crops"),
        query=state["query"],
        language=state["language"],
    )
    return {"market_result": result.model_dump()}


@remembers("scheme_result")
def scheme_node(state: RouterState):
    result = scheme_agent(
        state=state.get("state"),
        crops=state.get("crops"),
        query=state["query"],
        language=state["language"],
    )
    return {"scheme_result": result.model_dump()}


@remembers("disease_result")
def disease_node(state: RouterState):
    result = disease_agent(
        image_path=state.get("image_path"),
        query=state["query"],
        language=state["language"],
    )
    output = {"disease_result": result.model_dump(), "selected_agent": "disease"}
    return output