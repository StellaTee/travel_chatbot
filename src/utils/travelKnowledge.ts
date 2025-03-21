// This is a simplified knowledge base for travel recommendations
// In a real application, this would be connected to a proper RAG system with vector embeddings

interface TravelInfo {
  destination: string;
  description: string;
  bestTimeToVisit: string;
  mustSeeAttractions: string[];
  localCuisine: string[];
  travelTips: string[];
}

const travelDatabase: TravelInfo[] = [
  {
    destination: "Paris",
    description: "Known as the City of Light, Paris is renowned for its art, cuisine, and romantic atmosphere.",
    bestTimeToVisit: "April to June, or September to October for mild weather and fewer tourists.",
    mustSeeAttractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre", "Seine River Cruise"],
    localCuisine: ["Croissants", "Baguettes", "Coq au Vin", "Beef Bourguignon", "Crème Brûlée"],
    travelTips: [
      "Learn a few basic French phrases – locals appreciate the effort.",
      "The Paris Museum Pass can save you money if you plan to visit multiple museums.",
      "Be aware of pickpockets in tourist areas.",
      "Many shops close on Sundays.",
      "Tipping is not mandatory but appreciated for good service."
    ]
  },
  {
    destination: "Tokyo",
    description: "A city where tradition meets cutting-edge technology, offering unique cultural experiences.",
    bestTimeToVisit: "March to May for cherry blossoms, or October to November for autumn colors.",
    mustSeeAttractions: ["Tokyo Skytree", "Meiji Shrine", "Shibuya Crossing", "Senso-ji Temple", "Tsukiji Fish Market"],
    localCuisine: ["Sushi", "Ramen", "Tempura", "Yakitori", "Matcha desserts"],
    travelTips: [
      "Purchase a Suica or Pasmo card for convenient public transportation.",
      "Most places accept only Japanese yen in cash.",
      "Tipping is not customary and may even be considered rude.",
      "Be mindful of cleanliness – take your trash with you.",
      "Respect quiet zones in trains and public spaces."
    ]
  },
  {
    destination: "New York City",
    description: "A vibrant metropolis known for its iconic skyline, Broadway shows, and diverse neighborhoods.",
    bestTimeToVisit: "April to June or September to November for pleasant weather.",
    mustSeeAttractions: ["Statue of Liberty", "Central Park", "Empire State Building", "Metropolitan Museum of Art", "Broadway Show"],
    localCuisine: ["New York Pizza", "Bagels", "Pastrami sandwiches", "Cheesecake", "Hot dogs"],
    travelTips: [
      "Purchase a MetroCard for subway and bus travel.",
      "Tipping 15-20% is customary for restaurant service.",
      "Stand to the right on escalators to allow others to pass.",
      "Many museums have 'pay what you wish' days.",
      "Comfortable walking shoes are essential."
    ]
  },
  {
    destination: "Rome",
    description: "The Eternal City with thousands of years of history, art, and culinary traditions.",
    bestTimeToVisit: "April to May or September to October to avoid summer crowds and heat.",
    mustSeeAttractions: ["Colosseum", "Vatican Museums", "Roman Forum", "Trevi Fountain", "Pantheon"],
    localCuisine: ["Pasta Carbonara", "Cacio e Pepe", "Roman-style Pizza", "Supplì", "Gelato"],
    travelTips: [
      "Dress modestly when visiting religious sites.",
      "Beware of tourist traps near major attractions.",
      "Tap water is safe to drink – look for 'nasoni' water fountains.",
      "Many attractions require advance booking.",
      "Learn a few Italian phrases – it's appreciated by locals."
    ]
  },
  {
    destination: "Bali",
    description: "A tropical paradise known for beaches, rice terraces, temples, and vibrant culture.",
    bestTimeToVisit: "April to October during the dry season.",
    mustSeeAttractions: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Sacred Monkey Forest", "Tanah Lot", "Ubud Art Market"],
    localCuisine: ["Nasi Goreng", "Babi Guling", "Satay", "Mie Goreng", "Lawar"],
    travelTips: [
      "Respect local customs and dress modestly when visiting temples.",
      "Negotiate prices at markets but remain respectful.",
      "Be cautious with street food and drink bottled water.",
      "Renting a scooter is common but can be dangerous if inexperienced.",
      "Always have small bills for small purchases and tips."
    ]
  }
];

// Function to find the most relevant documents based on the query
export const retrieveRelevantInfo = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  let relevantInfo = "";

  // Check for destination specific matches
  for (const info of travelDatabase) {
    const destination = info.destination.toLowerCase();
    if (lowerQuery.includes(destination)) {
      // If this destination is mentioned, gather all information about it
      relevantInfo += `Destination: ${info.destination}\n`;
      relevantInfo += `Description: ${info.description}\n`;
      relevantInfo += `Best time to visit: ${info.bestTimeToVisit}\n`;
      relevantInfo += `Must-see attractions: ${info.mustSeeAttractions.join(", ")}\n`;
      relevantInfo += `Local cuisine: ${info.localCuisine.join(", ")}\n`;
      relevantInfo += `Travel tips: ${info.travelTips.join(" ")}\n\n`;
      break; // Found a specific destination match
    }
  }

  // If no specific destination is found, check for topic matches
  if (!relevantInfo) {
    if (lowerQuery.includes("best time") || lowerQuery.includes("when to visit") || lowerQuery.includes("season")) {
      for (const info of travelDatabase) {
        relevantInfo += `${info.destination}: ${info.bestTimeToVisit}\n`;
      }
    } else if (lowerQuery.includes("see") || lowerQuery.includes("attraction") || lowerQuery.includes("visit")) {
      for (const info of travelDatabase) {
        relevantInfo += `${info.destination} attractions: ${info.mustSeeAttractions.join(", ")}\n`;
      }
    } else if (lowerQuery.includes("food") || lowerQuery.includes("eat") || lowerQuery.includes("cuisine")) {
      for (const info of travelDatabase) {
        relevantInfo += `${info.destination} cuisine: ${info.localCuisine.join(", ")}\n`;
      }
    } else if (lowerQuery.includes("tip") || lowerQuery.includes("advice") || lowerQuery.includes("recommend")) {
      for (const info of travelDatabase) {
        relevantInfo += `${info.destination} tips: ${info.travelTips.slice(0, 3).join(" ")}\n`;
      }
    }
  }

  // Fallback - provide general information if nothing specific was matched
  if (!relevantInfo) {
    relevantInfo = "Available destinations: " + travelDatabase.map(info => info.destination).join(", ") + "\n";
    relevantInfo += "You can ask about best time to visit, attractions, local cuisine, or travel tips.";
  }

  return relevantInfo;
};

// Legacy function - maintained for backward compatibility
export const searchKnowledgeBase = (query: string): string => {
  // Simply call the new LLM function directly
  return generateLLMResponse(query);
};

// This function makes an actual API call to an LLM service
export const generateLLMResponse = async (query: string): Promise<string> => {
  // Retrieve the relevant context based on the query
  const context = retrieveRelevantInfo(query);
  
  // Create a prompt with RAG context
  const promptTemplate = `
As a travel assistant, answer the user's question based on this information:
${context}

User query: ${query}

Response:`;

  try {
    // Get OpenAI API Key from user input
    // In a production app, this should be securely stored in environment variables
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      return "Please provide your OpenAI API key in the settings to enable AI-powered responses.";
    }

    // Make the actual API call to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using a fast and capable model
        messages: [
          {
            role: 'system',
            content: 'You are a helpful travel assistant providing accurate travel information based on the given context.'
          },
          {
            role: 'user',
            content: promptTemplate
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from OpenAI API:', errorData);
      return "I'm having trouble connecting to the AI service. Please try again later.";
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling LLM API:', error);
    return "I'm having trouble processing your request right now. Please try again later.";
  }
};

// Helper function for simple hardcoded responses when API is unavailable
export const getFallbackResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // For destination specific matches
  for (const info of travelDatabase) {
    const destination = info.destination.toLowerCase();
    if (lowerQuery.includes(destination)) {
      return `${info.destination} is ${info.description} The best time to visit is ${info.bestTimeToVisit}. Some popular attractions include ${info.mustSeeAttractions.slice(0, 3).join(", ")}.`;
    }
  }
  
  // General fallback
  return "I can provide information about several popular destinations like Paris, Tokyo, New York, Rome, and Bali. What would you like to know?";
};
