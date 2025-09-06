# backend/scripts/ingest_data.py

import os
import pickle
# We will use a PDF loader from the langchain community package
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
# Use our absolute import path
from backend.db.vector_store import VectorStore
import faiss

# --- 1. DEFINE CONSTANTS ---

# This is the directory where we will save the final index and documents.
DATA_DIR = "backend/data"
# This is the directory where you will place your source PDF files.
DOCUMENTS_DIR = "backend/documents"

INDEX_PATH = os.path.join(DATA_DIR, "faiss_index.bin")
DOCS_PATH = os.path.join(DATA_DIR, "documents.pkl")

# --- 2. MAIN INGESTION LOGIC ---

def main():
    print("Starting data ingestion...")

    # Create necessary directories if they don't exist.
    for dir_path in [DATA_DIR, DOCUMENTS_DIR]:
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)
            print(f"Created directory: {dir_path}")

    # --- Loading and Processing PDFs ---
    
    all_pages = []
    pdf_files = [f for f in os.listdir(DOCUMENTS_DIR) if f.endswith(".pdf")]
    
    if not pdf_files:
        print(f"No PDF files found in '{DOCUMENTS_DIR}'.")
        print("Please add at least one PDF to that directory to create a knowledge base.")
        return

    print(f"Found {len(pdf_files)} PDF(s) to process.")

    for pdf_file in pdf_files:
        pdf_path = os.path.join(DOCUMENTS_DIR, pdf_file)
        # Use PyPDFLoader to load the document.
        loader = PyPDFLoader(pdf_path)
        # The 'load' method returns a list of "Document" objects, one for each page.
        pages = loader.load()
        all_pages.extend(pages)
        print(f"Loaded {len(pages)} pages from {pdf_file}.")

    # --- Chunking the Documents ---
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    # The splitter can directly work with the list of Document objects.
    chunks = text_splitter.split_documents(all_pages)
    # We need to extract the text content from each chunk object.
    chunk_texts = [chunk.page_content for chunk in chunks]
    print(f"Split the documents into {len(chunks)} chunks.")
    
    # --- Creating and Populating the Vector Store ---
    
    vector_store = VectorStore()
    vector_store.add_documents(chunk_texts)
    print("Chunks have been embedded and added to the vector store.")
    
    # --- Saving the Index and Documents ---

    faiss.write_index(vector_store.index, INDEX_PATH)
    print(f"FAISS index saved to {INDEX_PATH}")
    
    with open(DOCS_PATH, "wb") as f:
        pickle.dump(vector_store.documents, f)
    print(f"Document chunks saved to {DOCS_PATH}")
    
    print("\nIngestion complete!")

if __name__ == "__main__":
    main()