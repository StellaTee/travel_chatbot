
import { generateLLMResponse, getFallbackResponse } from './travelKnowledge';

// Simulate response delay to make the conversation feel more natural
const RESPONSE_DELAY = 1200;

export const generateResponse = async (message: string): Promise<string> => {
  // Simulate API call delay
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      try {
        const response = await processMessage(message);
        resolve(response);
      } catch (error) {
        console.error('Error processing message:', error);
        resolve("I'm having trouble processing your request. Please try again later.");
      }
    }, RESPONSE_DELAY);
  });
};

const processMessage = async (message: string): Promise<string> => {
  const lowerMessage = message.toLowerCase();
  
  // Basic conversation handlers for common phrases
  if (containsAny(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
    return "Hello! I'm your travel assistant powered by RAG technology. How can I help with your travel plans today?";
  }
  
  if (containsAny(lowerMessage, ['bye', 'goodbye', 'see you', 'farewell'])) {
    return "Goodbye! Feel free to ask for travel advice anytime you're planning your next adventure.";
  }
  
  if (containsAny(lowerMessage, ['who are you', 'what are you', 'your name'])) {
    return "I'm a travel assistant that uses RAG (Retrieval Augmented Generation) to help you discover destinations and provide travel tips. How can I assist with your travel plans?";
  }
  
  if (containsAny(lowerMessage, ['thank', 'thanks', 'appreciate', 'helpful'])) {
    return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about travel destinations?";
  }
  
  // Check if API key is available
  const apiKey = localStorage.getItem('openai_api_key');
  
  try {
    // For all other queries, use the RAG-based response generation with LLM
    if (apiKey) {
      return await generateLLMResponse(message);
    } else {
      // Use fallback response if no API key is available
      return getFallbackResponse(message);
    }
  } catch (error) {
    console.error('Error generating LLM response:', error);
    return getFallbackResponse(message);
  }
};

// Helper function to check if string contains any of the phrases
const containsAny = (text: string, phrases: string[]): boolean => {
  return phrases.some(phrase => text.includes(phrase));
};
