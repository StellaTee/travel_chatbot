
// This is a simplified knowledge base for travel recommendations
// In a real application, this would be connected to a proper RAG system

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

export const searchKnowledgeBase = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Check for destination specific queries
  for (const info of travelDatabase) {
    const destination = info.destination.toLowerCase();
    
    if (lowerQuery.includes(destination)) {
      // Generate appropriate response based on the query
      if (lowerQuery.includes("best time") || lowerQuery.includes("when to visit")) {
        return `The best time to visit ${info.destination} is ${info.bestTimeToVisit}`;
      }
      
      if (lowerQuery.includes("see") || lowerQuery.includes("attraction") || lowerQuery.includes("visit")) {
        return `When visiting ${info.destination}, don't miss these attractions: ${info.mustSeeAttractions.join(", ")}.`;
      }
      
      if (lowerQuery.includes("food") || lowerQuery.includes("eat") || lowerQuery.includes("cuisine")) {
        return `${info.destination} is known for its delicious cuisine including: ${info.localCuisine.join(", ")}.`;
      }
      
      if (lowerQuery.includes("tip") || lowerQuery.includes("advice") || lowerQuery.includes("recommend")) {
        return `Travel tips for ${info.destination}: ${info.travelTips.slice(0, 3).join(" ")}`;
      }
      
      // Default destination information
      return `${info.destination}: ${info.description} The best time to visit is ${info.bestTimeToVisit} Top attractions include ${info.mustSeeAttractions.slice(0, 3).join(", ")}.`;
    }
  }
  
  // General travel queries
  if (lowerQuery.includes("recommend") || lowerQuery.includes("suggest") || lowerQuery.includes("where should")) {
    const randomIndex = Math.floor(Math.random() * travelDatabase.length);
    const suggestion = travelDatabase[randomIndex];
    return `I'd recommend considering ${suggestion.destination}. ${suggestion.description} The best time to visit is ${suggestion.bestTimeToVisit}.`;
  }
  
  if (lowerQuery.includes("best destination") || lowerQuery.includes("top place")) {
    return "Some of the world's top travel destinations include Paris, Tokyo, New York City, Rome, and Bali. Each offers unique experiences, culture, and attractions. Is there a specific type of trip you're interested in?";
  }
  
  if (lowerQuery.includes("pack") || lowerQuery.includes("luggage") || lowerQuery.includes("bring")) {
    return "When packing for a trip, essential items include: passport/ID, adaptable clothing, comfortable shoes, basic toiletries, any necessary medications, a universal adapter, and digital copies of important documents. Would you like more specific packing tips for a particular destination?";
  }
  
  // Fallback response
  return "I can provide information about travel destinations like Paris, Tokyo, New York, Rome, and Bali. I can also help with general travel tips. What would you like to know about?";
};
