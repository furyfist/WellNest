# backend/services/chat_service.py

import google.generativeai as genai

# --- CORRECTED IMPORTS ---
# Making the imports absolute from the 'backend' package.
from backend.core.config import settings
from backend.db.vector_store import vector_store_instance

# Configure the Google Generative AI client with the API key from our settings.
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
    print(f"Searching vector store for context related to: '{message}'")
    context_chunks = vector_store_instance.search(query=message, k=3)

    if not context_chunks:
        return "I'm sorry, but my knowledge base does not contain information about that topic. Could you ask something else?"

    context_str = "\n\n".join(context_chunks)
    print(f"Retrieved context:\n---\n{context_str}\n---")

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

    try:
        print("Generating response from Gemini model...")
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        final_response = response.text
        print(f"Generated response: '{final_response}'")
        return final_response

    except Exception as e:
        print(f"An error occurred while calling the Gemini API: {e}")
        return "I'm sorry, there was an error communicating with the AI service. Please try again later."