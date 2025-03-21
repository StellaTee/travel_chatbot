
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import LoadingDots from "@/components/LoadingDots";
import { generateResponse } from "@/utils/chatbot";
import { Globe } from "lucide-react";

interface Message {
  id: string;
  content: string;
  type: "user" | "bot";
  isNew?: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your travel assistant. Ask me about destinations, travel tips, or recommendations for your next journey.",
      type: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    
    // Remove "isNew" flag after animation completes
    const timer = setTimeout(() => {
      setMessages(prevMessages =>
        prevMessages.map(msg => ({ ...msg, isNew: false }))
      );
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: "user",
      isNew: true,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get chatbot response
      const response = await generateResponse(content);
      
      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: "bot",
        isNew: true,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble processing your request. Please try again.",
        type: "bot",
        isNew: true,
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-accent/20 p-4 md:p-8">
      <div className="w-full max-w-2xl h-full md:h-[85vh] flex flex-col rounded-3xl overflow-hidden glass-panel shadow-lg border border-border/40">
        {/* Header */}
        <div className="p-6 border-b border-border/40 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-medium">Travel Assistant</h1>
          </div>
        </div>
        
        {/* Chat messages */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto p-6 space-y-2"
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              type={message.type}
              isNew={message.isNew}
            />
          ))}
          
          {isLoading && (
            <div className="ml-4">
              <LoadingDots />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="p-6 border-t border-border/40">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
