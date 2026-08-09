# router_agent.py
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from .graph_state import RouterState
from langgraph.checkpoint.sqlite import SqliteSaver
from .graph import graph


def send_message(thread_id: str, query: str = None, language: str = "english", **partial_data):
    with SqliteSaver.from_conn_string("memory.db") as memory:
        workflow = graph.compile(checkpointer=memory)
        config = {"configurable": {"thread_id": thread_id}}

        payload = dict(partial_data)

        if query:
            payload["query"] = query
            payload["language"] = language
        else:
            existing = workflow.get_state(config).values
            payload["query"] = existing.get("query")
            payload["language"] = existing.get("language", language)

        result = workflow.invoke(payload, config=config)
        return result