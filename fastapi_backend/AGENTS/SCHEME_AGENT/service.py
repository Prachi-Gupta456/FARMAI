from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_store = Chroma(persist_directory="SCHEME_AGENT/scheme_db", embedding_function=embeddings)


def get_scheme_context(query: str, crops: list[str], state: str, k: int = 4):
    crops_text = ", ".join(crops) if crops else ""
    search_query = f"{query} {crops_text} {state} farmer scheme"
    docs = vector_store.similarity_search(search_query, k=k)
    return "\n\n".join(d.page_content for d in docs)