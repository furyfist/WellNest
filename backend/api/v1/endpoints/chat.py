from fastapi import APIRouter
from models.schemas import ChatMessageRequest, ChatMessageResponse
# Import the service function we just created.
from services.chat_service import get_chat_response

router = APIRouter()

@router.post("/message")
def post_message(payload: ChatMessageRequest) -> ChatMessageResponse:
    """
    Receives a user's message, passes it to the chat service,
    and returns the chatbot's response.
    """
    # The endpoint's only job is to delegate the core logic to the service layer.
    response_text = get_chat_response(message=payload.message)
    
    # We then take the result from the service and structure it
    # into the correct response schema.
    return ChatMessageResponse(response=response_text)