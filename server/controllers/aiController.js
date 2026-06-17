const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateItinerary = async (req, res) => {
  try {
    const { destination, budget, days } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
Create a travel itinerary.

Destination: ${destination}
Budget: ${budget}
Days: ${days}

Give a day-by-day plan.
`;

    const result = await model.generateContent(prompt);

    const response =
      result.response.text();

    res.status(200).json({
      itinerary: response,
    });
  } catch (error) {
    res.status(200).json({
  itinerary: `Day 1: Explore ${req.body.destination}, visit popular attractions, and try local food.

Day 2: Visit nearby sightseeing places, beaches/markets, and enjoy cultural spots.

Day 3: Relax, shop for souvenirs, and plan return travel.

Note: AI quota exceeded, so this is a fallback itinerary.`
});
  }
};

module.exports = {
  generateItinerary,
};