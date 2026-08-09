from langchain_groq import ChatGroq
from .env_loader import load_env

load_env()

def get_llm(temperature: float = 0.3):
    return ChatGroq(model="llama-3.3-70b-versatile", temperature=temperature)