from langgraph.graph import StateGraph, START, END
from .graph_state import RouterState
from .router_node import router_node
from .agents_node import (
    market_node, weather_node, scheme_node,
    pest_node, fertilizer_node,
    irrigation_node, crop_recommendation_node, fallback_node,
    disease_node
)


def initial_route(state: RouterState):
    if state.get("image_path"):
        return "disease"
    return "router"


def route_decision(state: RouterState):
    return state["selected_agent"]


graph = StateGraph(RouterState)

graph.add_node("router", router_node)
graph.add_node("market", market_node)
graph.add_node("weather", weather_node)
graph.add_node("scheme", scheme_node)
graph.add_node("pest", pest_node)
graph.add_node("fertilizer", fertilizer_node)
graph.add_node("irrigation", irrigation_node)
graph.add_node("crop_recommendation", crop_recommendation_node)
graph.add_node("disease", disease_node)
graph.add_node("fallback", fallback_node)

graph.add_conditional_edges(START, initial_route, {
    "disease": "disease",
    "router": "router",
})

graph.add_conditional_edges("router", route_decision, {
    "market": "market",
    "weather": "weather",
    "scheme": "scheme",
    "pest": "pest",
    "fertilizer": "fertilizer",
    "irrigation": "irrigation",
    "disease": "disease",
    "crop_recommendation": "crop_recommendation",
    "fallback": "fallback",
})

for node_name in ["market", "weather", "scheme", "pest", "disease",
                   "fertilizer", "irrigation", "crop_recommendation", "fallback"]:
    graph.add_edge(node_name, END)