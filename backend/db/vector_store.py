# backend/db/vector_store.py

import os
import pickle
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# --- CORRECTED PATH (for running from root) ---
# Now that we run all commands from the root 'wellnest/' directory,
# we provide the full path from that root.
DATA_DIR = "backend/data"
INDEX_PATH = os.path.join(DATA_DIR, "faiss_index.bin")
DOCS_PATH = os.path.join(DATA_DIR, "documents.pkl")

class VectorStore:
    def __init__(self, dimension: int = 384):
        self.dimension = dimension
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.index = faiss.IndexFlatL2(dimension)
        self.documents = []

    def add_documents(self, texts: list[str]):
        embeddings = self.embedding_model.encode(texts)
        embeddings = np.array(embeddings).astype('float32')
        self.index.add(embeddings)
        self.documents.extend(texts)
        print(f"Added {len(texts)} documents. Total documents: {self.index.ntotal}")

    def search(self, query: str, k: int = 3) -> list[str]:
        if self.index.ntotal == 0:
            return ["Vector store is empty. Please add documents first."]
        query_embedding = self.embedding_model.encode([query])
        query_embedding = np.array(query_embedding).astype('float32')
        distances, indices = self.index.search(query_embedding, k)
        results = [self.documents[i] for i in indices[0] if i != -1]
        return results

    def load_local(self):
        """
        Loads the FAISS index and documents from local files.
        """
        if os.path.exists(INDEX_PATH) and os.path.exists(DOCS_PATH):
            self.index = faiss.read_index(INDEX_PATH)
            with open(DOCS_PATH, "rb") as f:
                self.documents = pickle.load(f)
            print(f"Successfully loaded FAISS index with {self.index.ntotal} vectors.")
            print(f"Successfully loaded {len(self.documents)} documents.")
        else:
            print(f"Error: Could not find index at path: {os.path.abspath(INDEX_PATH)}")
            print("Please run the ingestion script from the root directory: python -m backend.scripts.ingest_data")

# Create a single, shareable instance of the VectorStore.
vector_store_instance = VectorStore()