
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

// This function mimics an LLM by using a template-based approach
// In a real implementation, this would call an actual LLM API
export const generateLLMResponse = (query: string): string => {
  // Retrieve the relevant context based on the query
  const context = retrieveRelevantInfo(query);
  
  // Basic template for responding to user queries
  const promptTemplate = `
As a travel assistant, answer the user's question based on this information:
${context}

User query: ${query}

Response:`;

  // In a real implementation, this is where we would call an actual LLM API
  // For now, we'll simulate an LLM response with a more dynamic template approach
  
  const lowerQuery = query.toLowerCase();
  
  // Generate more dynamic-looking responses based on query types
  if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
    return "Hello! I'm your travel assistant powered by RAG technology. I can help you with information about destinations like Paris, Tokyo, New York, Rome, and Bali. What would you like to know?";
  }
  
  if (lowerQuery.includes("thank")) {
    return "You're welcome! I'm glad I could help with your travel planning. Feel free to ask if you have any other questions about your journey.";
  }
  
  // For specific destination queries
  for (const info of travelDatabase) {
    const destination = info.destination.toLowerCase();
    if (lowerQuery.includes(destination)) {
      if (lowerQuery.includes("best time") || lowerQuery.includes("when to visit")) {
        return `Based on current travel data, the best time to visit ${info.destination} is ${info.bestTimeToVisit} This allows you to enjoy the destination with optimal weather conditions and potentially fewer crowds.`;
      }
      
      if (lowerQuery.includes("see") || lowerQuery.includes("attraction") || lowerQuery.includes("visit")) {
        return `When visiting ${info.destination}, I recommend checking out these must-see attractions: ${info.mustSeeAttractions.join(", ")}. Each offers a unique perspective on the local culture and history. Would you like more specific information about any of these places?`;
      }
      
      if (lowerQuery.includes("food") || lowerQuery.includes("eat") || lowerQuery.includes("cuisine")) {
        return `${info.destination} is known for its delicious cuisine. Some local specialties you shouldn't miss include ${info.localCuisine.join(", ")}. These dishes represent the authentic flavors of the region. Would you like recommendations for specific restaurants?`;
      }
      
      if (lowerQuery.includes("tip") || lowerQuery.includes("advice")) {
        return `Here are some helpful tips for ${info.destination}: ${info.travelTips.join(" ")} Is there anything specific about your ${info.destination} trip you'd like advice on?`;
      }
      
      // General destination query
      return `${info.destination} is ${info.description} The best time to visit is ${info.bestTimeToVisit} Some must-see attractions include ${info.mustSeeAttractions.slice(0, 3).join(", ")}. Would you like to know more about the local cuisine, travel tips, or other attractions?`;
    }
  }
  
  // For general travel queries without a specific destination
  if (lowerQuery.includes("recommend") || lowerQuery.includes("suggest") || lowerQuery.includes("where should")) {
    const randomIndex = Math.floor(Math.random() * travelDatabase.length);
    const suggestion = travelDatabase[randomIndex];
    return `Based on current travel trends, I'd recommend considering ${suggestion.destination}. ${suggestion.description} The best time to visit is ${suggestion.bestTimeToVisit} Would you like to know more about ${suggestion.destination} or would you prefer recommendations for a different type of destination?`;
  }
  
  // Default response using context information
  return `Based on the information available, I can tell you that: ${context.split('\n').slice(0, 3).join(' ')} Would you like more specific information about any of these destinations?`;
};
