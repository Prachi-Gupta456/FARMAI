import json
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from common.env_loader import load_env

load_env()

with open("SCHEME_AGENT/texts.json", "r", encoding="utf-8") as f:
    texts = json.load(f)

with open("SCHEME_AGENT/metadatas.json", "r", encoding="utf-8") as f:
    metadatas = json.load(f)

print(f"Loaded {len(texts)} texts, {len(metadatas)} metadata records.")

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

vectorstore = Chroma.from_texts(
    texts=texts,
    embedding=embeddings,
    metadatas=metadatas,
    persist_directory="SCHEME_AGENT/scheme_db"
)

print(f"Stored {len(texts)} schemes in vectorstore at SCHEME_AGENT/scheme_db")