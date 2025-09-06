from pydantic import BaseModel

# BaseModel is the main class we inherit from to create our schemas.
# It gives our classes all the power of Pydantic's data validation.

# -- creating the chat schemas

class ChatMessageRequest(BaseModel):
    """
    This schema defines the structure of a chat request from the user.
    It expects a JSON object with a single key: "message"
    eg, {"message" : "hello, I need some advice."} 
    """
    message: str

class ChatMessageResponse(BaseModel):
    response : str


# --- resources schema

class Resource(BaseModel):
    """
    defines the structure of a single mental healt resource.
    used when we send the resource data back to frontend
    """
    id: int
    title: str
    content: str