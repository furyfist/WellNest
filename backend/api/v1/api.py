from fastapi import APIRouter
from api.v1.endpoints import chat, resources

api_router = APIRouter()

# The chat-related endpoints are in 'chat.py' and resource-related are in 'resources.py'.
# Any URL defined in chat.router will now be prefixed with /chat.
# e.g., a /message route in chat.py becomes /api/v1/chat/message.

api_router.include_router(chat.router, prefix="/chat", tags=["chat"])

api_router.include_router(resources.router, prefix="/resources", tags=["resources"])