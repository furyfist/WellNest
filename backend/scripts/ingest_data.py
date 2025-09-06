# backend/scripts/ingest_data.py

import os
import pickle
from langchain.text_splitter import RecursiveCharacterTextSplitter
# We import our fully functional VectorStore class.
from backend.db.vector_store import VectorStore
import faiss

# --- 1. Define Constants and Data Source ---

# Define the paths for the output files.
DATA_DIR = "data"
INDEX_PATH = os.path.join(DATA_DIR, "faiss_index.bin")
DOCS_PATH = os.path.join(DATA_DIR, "documents.pkl")

# For this example, our source material is a simple list of strings.
# In a real-world scenario, you would load this from text files, a database, etc.
DUMMY_ARTICLES = [
    """
    Understanding Anxiety: Anxiety is a normal human emotion characterized by feelings of tension, worried thoughts, and physical changes like increased blood pressure. Knowing the triggers is the first step. Common triggers include work stress, financial worries, and relationship problems. Recognizing these can help you anticipate and manage your anxiety.
    """,
    """
    Techniques for Stress Management: Deep breathing exercises are a powerful tool for stress reduction. The 4-7-8 technique is simple: inhale for 4 seconds, hold for 7, and exhale for 8. This practice can calm your nervous system. Another effective method is mindfulness meditation, which involves focusing on your breath and observing your thoughts without judgment.
    """,
    """
    The Importance of Sleep: Quality sleep is crucial for mental and emotional health. Lack of sleep can exacerbate anxiety and stress. To improve sleep hygiene, try to maintain a consistent sleep schedule, create a relaxing bedtime routine, and avoid screens before bed. A dark, quiet, and cool environment is ideal for sleeping.
    """
]

# --- 2. Main Ingestion Logic ---


def main():
    """
    Main function to process, chunk, embed, and save the documents.
    """
    print("Starting data ingestion...")

    # Create the data directory if it doesn't exist.
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        print(f"Created directory: {DATA_DIR}")

    # --- Chunking the Documents ---

    # We use a text splitter from LangChain to break down large texts.
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,  # The maximum size of each chunk (in characters).
        # The number of characters to overlap between chunks.
        chunk_overlap=50,
    )
    # The 'split_text' method processes all our articles.
    chunks = text_splitter.split_text("\n\n".join(DUMMY_ARTICLES))
    print(f"Split documents into {len(chunks)} chunks.")

    # --- Creating and Populating the Vector Store ---

    # Initialize our VectorStore. The model will be downloaded on first use.
    vector_store = VectorStore()

    # Add the text chunks to the vector store to be embedded and indexed.
    vector_store.add_documents(chunks)
    print("Documents have been added to the vector store.")

    # --- Saving the Index and Documents ---

    # We must save two things:
    # 1. The FAISS index itself.
    # 2. The list of document chunks (so we can retrieve the original text).

    # Save the FAISS index to a binary file.
    faiss.write_index(vector_store.index, INDEX_PATH)
    print(f"FAISS index saved to {INDEX_PATH}")

    # Save the list of document chunks using pickle.
    with open(DOCS_PATH, "wb") as f:
        pickle.dump(vector_store.documents, f)
    print(f"Documents saved to {DOCS_PATH}")

    print("\nIngestion complete!")
    print(f"Created '{INDEX_PATH}' and '{DOCS_PATH}'.")
    print("You can now run the main application.")


# --- 3. Run the script ---

if __name__ == "__main__":
    # This block ensures the main() function is called only when
    # the script is executed directly from the command line.
    main()
