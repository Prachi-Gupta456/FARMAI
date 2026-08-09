from langchain_core.messages import BaseMessage


def format_history(messages: list, max_turns: int = 10) -> str:
    """Turn the LangGraph message list into a plain transcript string
    to inject into any prompt. Keeps only the last `max_turns` messages
    so prompts don't grow unbounded over a long chat."""
    if not messages:
        return "(no previous conversation)"

    recent = messages[-max_turns:]
    lines = []
    for m in recent:
        if isinstance(m, BaseMessage):
            role = "Farmer" if m.type == "human" else "Assistant"
            lines.append(f"{role}: {m.content}")
    return "\n".join(lines) if lines else "(no previous conversation)"


_SUMMARY_FIELD_PRIORITY = ["summary", "recommendation", "answer", "reason"]


def extract_summary(result_dict: dict) -> str:
    for field in _SUMMARY_FIELD_PRIORITY:
        if result_dict.get(field):
            return result_dict[field]
    return str(result_dict)