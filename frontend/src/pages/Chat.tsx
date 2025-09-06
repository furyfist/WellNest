import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, AlertTriangle, ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isCrisisAlert?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to provide mental health support in a safe, anonymous space. I'm trained to listen and help you work through whatever you're experiencing. What would you like to talk about today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversationStarters = [
    "I'm feeling overwhelmed with school",
    "I'm having trouble sleeping",
    "I feel anxious about my future",
    "I'm feeling disconnected from others",
    "I'm struggling with motivation"
  ];

  const crisisKeywords = ["hurt myself", "suicide", "kill myself", "end it all", "not worth living"];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const detectCrisis = (message: string): boolean => {
    return crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      academic: [
        "Academic stress is very common among students. It sounds like you're dealing with a lot right now. Can you tell me more about what specific aspects of school are feeling most overwhelming?",
        "I hear that you're struggling with academic pressure. That's a heavy burden to carry. What would it look like if things felt more manageable for you?"
      ],
      sleep: [
        "Sleep issues can really impact how we feel and function. When did you first notice changes in your sleep patterns? Are there particular thoughts or worries that come up when you're trying to sleep?",
        "Having trouble with sleep can make everything else feel harder. What does your typical bedtime routine look like right now?"
      ],
      anxiety: [
        "Anxiety can feel overwhelming, and I want you to know that what you're experiencing is valid. Can you help me understand what anxiety feels like for you? Does it show up physically, mentally, or both?",
        "It takes courage to reach out when you're feeling anxious. What situations or thoughts tend to trigger your anxiety the most?"
      ],
      default: [
        "Thank you for sharing that with me. It sounds like you're going through something difficult right now. Can you tell me more about how this has been affecting you?",
        "I hear you, and I want you to know that your feelings are completely valid. What would be most helpful to focus on right now?",
        "That sounds really challenging. You've taken an important step by reaching out. How long have you been dealing with this?"
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("school") || lowerMessage.includes("academic") || lowerMessage.includes("study") || lowerMessage.includes("exam")) {
      return responses.academic[Math.floor(Math.random() * responses.academic.length)];
    } else if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("insomnia")) {
      return responses.sleep[Math.floor(Math.random() * responses.sleep.length)];
    } else if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("worry") || lowerMessage.includes("nervous")) {
      return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
    } else {
      return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Check for crisis keywords
    if (detectCrisis(inputMessage)) {
      setTimeout(() => {
        const crisisMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm concerned about what you've shared. Your safety is the most important thing right now. Please consider reaching out to immediate crisis support:",
          isUser: false,
          timestamp: new Date(),
          isCrisisAlert: true
        };
        setMessages(prev => [...prev, crisisMessage]);
        setIsTyping(false);
      }, 1000);
    } else {
      // Simulate AI typing delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateAIResponse(inputMessage),
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const useConversationStarter = (starter: string) => {
    setInputMessage(starter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/results" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Link>
            <div className="flex items-center gap-3">
              <Badge className="bg-success/10 text-success border-success/20">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                AI Support Active
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">
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
                        message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.isUser 
                          ? "bg-primary text-primary-foreground" 
                          : message.isCrisisAlert
                            ? "bg-destructive/10 border border-destructive/20 text-destructive-foreground"
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
                onClick={sendMessage} 
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