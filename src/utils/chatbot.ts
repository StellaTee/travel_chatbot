
import { searchKnowledgeBase } from './travelKnowledge';

// Simulate response delay to make the conversation feel more natural
const RESPONSE_DELAY = 1200;

export const generateResponse = async (message: string): Promise<string> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = processMessage(message);
      resolve(response);
    }, RESPONSE_DELAY);
  });
};

const processMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Generic greetings
  if (containsAny(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
    return "Hello! I'm your travel assistant. How can I help with your travel plans today?";
  }
  
  // Farewell responses
  if (containsAny(lowerMessage, ['bye', 'goodbye', 'see you', 'farewell'])) {
    return "Goodbye! Feel free to ask for travel advice anytime you're planning your next adventure.";
  }
  
  // Identity questions
  if (containsAny(lowerMessage, ['who are you', 'what are you', 'your name'])) {
    return "I'm a travel assistant designed to help you discover destinations and provide travel tips. How can I assist with your travel plans?";
  }
  
  // Gratitude responses
  if (containsAny(lowerMessage, ['thank', 'thanks', 'appreciate', 'helpful'])) {
    return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about travel destinations?";
  }
  
  // Check knowledge base for relevant information
  return searchKnowledgeBase(message);
};

// Helper function to check if string contains any of the phrases
const containsAny = (text: string, phrases: string[]): boolean => {
  return phrases.some(phrase => text.includes(phrase));
};
