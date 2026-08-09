from common.validator import safe_invoke
from common.llm_client import get_llm
from .prompt import router_prompt
from .graph_state import RouterState
from common.schemas import RouterResponse

llm = get_llm(temperature=0.0)
structured_llm = llm.with_structured_output(RouterResponse)

chain = router_prompt | structured_llm

def router_node(state: RouterState):
    route = safe_invoke(
        chain,
        inputs={"query":state["query"],"language":state["language"]},
        response_model=RouterResponse,
        fallback_kwargs={"agent":"fallback"}
    )
    return {"selected_agent": route.agent}

