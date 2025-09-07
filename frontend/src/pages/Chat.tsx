// frontend/src/.../Chat.tsx

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, AlertTriangle, ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/v1";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isCrisisAlert?: boolean;
  isError?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "1",
      content: "Hello! I'm here to provide mental health support in a safe, anonymous space. I'm trained to listen and help you work through whatever you're experiencing. What would you like to talk about today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // --- FIX 3: We will keep this ref but adjust how we use it ---
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversationStarters = [
    "I'm feeling overwhelmed with school",
    "I'm having trouble sleeping",
    "I feel anxious about my future",
    "I'm feeling disconnected from others",
    "I'm struggling with motivation"
  ];

  const crisisKeywords = ["hurt myself", "suicide", "kill myself", "end it all", "not worth living"];

  // --- FIX 3: A more robust useEffect for scrolling ---
  // This will now scroll to the bottom any time the messages or isTyping state changes.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const detectCrisis = (message: string): boolean => {
    return crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // --- FIX 2: Modify sendMessage to accept an optional argument ---
  // This allows us to send a message either from the input state or directly from a button click.
  const sendMessage = async (messageToSend?: string) => {
    const currentInput = messageToSend || inputMessage;
    if (!currentInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentInput,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    // Only clear the input if the message came from the input box
    if (!messageToSend) {
      setInputMessage("");
    }
    setIsTyping(true);

    if (detectCrisis(currentInput)) {
      const crisisMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm concerned about what you've shared. Your safety is the most important thing right now. Please consider reaching out to immediate crisis support:",
        isUser: false,
        timestamp: new Date(),
        isCrisisAlert: true
      };
      setMessages(prev => [...prev, crisisMessage]);
      setIsTyping(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, but I'm having trouble connecting. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // --- FIX 2: Update this function to call sendMessage directly ---
  const useConversationStarter = (starter: string) => {
    sendMessage(starter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* --- FIX 1: Add text-sm for consistent sizing --- */}
            <Link to="/results" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Link>
            <div className="flex items-center gap-3">
              {/* --- FIX 1: Add text-xs for consistent sizing on badges --- */}
              <Badge className="bg-success/10 text-success border-success/20 text-xs">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                AI Support Active
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Anonymous Chat
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        {/* Conversation Starters */}
        {messages.length === 1 && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Not sure where to start?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {conversationStarters.map((starter, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => useConversationStarter(starter)}
                    className="text-sm"
                  >
                    {starter}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser ? "bg-primary text-primary-foreground" : message.isError ? "bg-destructive text-destructive-foreground" : "bg-muted"
                      }`}>
                        {message.isUser ? <User className="h-4 w-4" /> : message.isError ? <AlertTriangle className="h-4 w-4"/> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.isUser 
                          ? "bg-primary text-primary-foreground" 
                          : message.isCrisisAlert
                            ? "bg-destructive/10 border border-destructive/20 text-destructive-foreground"
                            : message.isError 
                              ? "bg-destructive/10 border border-destructive/20"
                              : "bg-muted"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        {message.isCrisisAlert && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2 text-destructive">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="font-medium text-sm">Crisis Support Available</span>
                            </div>
                            <div className="space-y-2">
                              <Button size="sm" className="w-full bg-destructive hover:bg-destructive/90">
                                Call 988 - Suicide & Crisis Lifeline
                              </Button>
                              <Button size="sm" variant="outline" className="w-full">
                                Text "HELLO" to 741741 - Crisis Text Line
                              </Button>
                              <Link to="/professional">
                                <Button size="sm" variant="outline" className="w-full">
                                  Campus Crisis Support
                                </Button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs text-muted-foreground ${message.isUser ? "text-right" : "text-left"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* --- FIX 3: The scroll ref remains here at the very bottom --- */}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={() => sendMessage()} 
                disabled={!inputMessage.trim() || isTyping}
                size="icon"
                className="bg-primary hover:bg-primary-dark"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This chat is completely anonymous and not stored. For crisis situations, please use emergency resources above.
            </p>
          </div>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 text-center">
            <Link to="/professional" className="flex-1">
              <Button variant="outline" className="w-full">
                Escalate to Professional
              </Button>
            </Link>
            <Link to="/peer-support" className="flex-1">
              <Button variant="outline" className="w-full">
                Connect with Peer Support
              </Button>
            </Link>
            <Link to="/resources" className="flex-1">
              <Button variant="outline" className="w-full">
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;