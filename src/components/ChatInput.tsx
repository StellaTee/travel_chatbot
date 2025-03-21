
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, className }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "glass-effect subtle-shadow rounded-full py-1 px-4 flex items-center transition-all duration-300",
        isLoading ? "opacity-90" : "opacity-100",
        className
      )}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me about travel destinations..."
        className="flex-1 bg-transparent border-none outline-none text-sm md:text-base py-3 px-2"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
          message.trim() && !isLoading
            ? "bg-primary text-white" 
            : "bg-muted text-muted-foreground cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <ArrowUp className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};

export default ChatInput;
