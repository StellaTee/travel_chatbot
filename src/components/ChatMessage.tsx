
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type MessageType = "user" | "bot";

interface ChatMessageProps {
  content: string;
  type: MessageType;
  isNew?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, type, isNew = false }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNew && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isNew]);

  return (
    <div
      ref={messageRef}
      className={cn(
        "max-w-[80%] p-4 mb-4 rounded-2xl transition-all duration-300",
        isNew && "animate-fade-in",
        type === "user"
          ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
          : "mr-auto glass-effect rounded-bl-sm"
      )}
    >
      <p className="text-sm md:text-base leading-relaxed">{content}</p>
    </div>
  );
};

export default ChatMessage;
