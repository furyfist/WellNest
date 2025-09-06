# backend/services/chat_service.py

import google.generativeai as genai

# CORRECTED: Imports are now relative to the 'backend' directory.
from core.config import settings
from db.vector_store import vector_store_instance

# Configure the Google Generative AI client with the API key from our settings.
# This is done once when the application starts and the service is imported.
try:
    genai.configure(api_key=settings.GEMINI_API_KEY)
    print("Google Gemini API configured successfully.")
except Exception as e:
    print(
        f"Error: Failed to configure Google Gemini API. Please check your API key. Details: {e}")


def get_chat_response(message: str) -> str:
    """
    Generates a chatbot response using the full RAG pipeline.

    Args:
        message: The user's input message.

    Returns:
        The chatbot's generated response.
    """

    # --- 1. RETRIEVAL ---
    # Use our vector store instance to find the most relevant context chunks.
    # This is the "Retrieval" part of RAG.
    print(f"Searching vector store for context related to: '{message}'")
    context_chunks = vector_store_instance.search(query=message, k=3)

    if not context_chunks:
        # If our vector store returns no relevant information, we can't answer.
        return "I'm sorry, but my knowledge base does not contain information about that topic. Could you ask something else?"

    # Combine the retrieved chunks into a single block of text.
    context_str = "\n\n".join(context_chunks)
    print(f"Retrieved context:\n---\n{context_str}\n---")

    # --- 2. AUGMENTATION ---
    # We create a detailed prompt template. This is the "Augmented" part of RAG.
    # It instructs the LLM to use *only* the provided context to form its answer.
    # This is the most critical step for ensuring factual, non-generic responses.
    prompt = f"""
    Based *only* on the context provided below, answer the user's question.
    Do not use any of your own knowledge. If the context does not contain the answer,
    you must say "Based on the information I have, I cannot answer that question."

    CONTEXT:
    ---
    {context_str}
    ---

    USER'S QUESTION:
    {message}

    ANSWER:
    """

    # --- 3. GENERATION ---
    # We send the augmented prompt to the Gemini model.
    # This is the "Generation" part of RAG.
    try:
        print("Generating response from Gemini model...")
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        final_response = response.text
        print(f"Generated response: '{final_response}'")
        return final_response

    except Exception as e:
        # This handles potential errors during the API call (e.g., network issues, invalid key).
        print(f"An error occurred while calling the Gemini API: {e}")
        return "I'm sorry, there was an error communicating with the AI service. Please try again later."