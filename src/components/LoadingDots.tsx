
import React from "react";

export const LoadingDots: React.FC = () => {
  return (
    <div className="flex items-center space-x-1.5 my-2">
      <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse-dot" style={{ animationDelay: "0ms" }}></span>
      <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse-dot" style={{ animationDelay: "300ms" }}></span>
      <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse-dot" style={{ animationDelay: "600ms" }}></span>
    </div>
  );
};

export default LoadingDots;
