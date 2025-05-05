import OpenAI from "openai";

// Note: the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Product knowledge base for better responses
const PRODUCT_KNOWLEDGE = {
  "ProFoam": {
    description: "High-performance spray foam insulation system with excellent thermal properties and air sealing capabilities.",
    properties: "R-value: 6.5 per inch, Closed cell content: >90%, Vapor permeability: 1.2 perms",
    applications: "Commercial roofing, residential walls, attics, crawl spaces, and rim joists",
    advantages: "Superior energy efficiency, moisture resistance, structural enhancement, seamless application"
  },
  "RigidCore": {
    description: "Advanced rigid polyurethane board system designed for high-load applications and extreme temperature environments.",
    properties: "Compressive strength: 120 psi, Thermal conductivity: 0.15 W/mK, Density: 2.2 lb/ft³",
    applications: "Cold storage facilities, industrial flooring, heavy-duty construction, maritime applications",
    advantages: "Exceptional structural stability, minimal thermal bridging, excellent dimensional stability, high load capacity"
  },
  "FlexCoat": {
    description: "Elastomeric polyurethane coating system with superior weatherproofing and UV resistance properties.",
    properties: "Elongation: 400%, Tensile strength: 3000 psi, Hardness: Shore A 85-90",
    applications: "Waterproofing membranes, roof coatings, deck coverings, secondary containment",
    advantages: "Exceptional flexibility, weathering resistance, seamless application, chemical resistance"
  }
};

export async function generateProductResponse(query: string): Promise<string> {
  try {
    const systemPrompt = `
You are a highly knowledgeable technical specialist for Danny's Chemicals, a leading polyurethane technology company.
Respond accurately to questions about our polyurethane products with a professional, helpful tone.
Always provide specific, technically accurate information based on the product knowledge provided.
If asked about something outside your knowledge base, suggest the user contact our technical support team.

Here is information about our key product lines:
${JSON.stringify(PRODUCT_KNOWLEDGE, null, 2)}

Keep your responses concise but informative (100-200 words), focusing on technical accuracy.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    return content ? content : "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error: any) {
    console.error("Error generating AI response:", error);
    return "I apologize, but I'm currently experiencing technical difficulties. Please try again later or contact our support team directly.";
  }
}

export async function analyzeProductFeedback(feedback: string): Promise<{
  sentiment: "positive" | "neutral" | "negative";
  score: number;
  keyPoints: string[];
  productMentioned?: string;
  actionNeeded: boolean;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are an expert feedback analyzer for Danny's Chemicals, a polyurethane technology company.
            Analyze customer feedback for sentiment, key points, mentioned products, and whether immediate action is needed.
            Respond with JSON in this format:
            {
              "sentiment": "positive" | "neutral" | "negative",
              "score": number between 0-1,
              "keyPoints": array of 1-3 main points,
              "productMentioned": name of Danny's product if mentioned (ProFoam, RigidCore, or FlexCoat),
              "actionNeeded": boolean indicating if immediate follow-up is required
            }
          `
        },
        {
          role: "user",
          content: feedback
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse and return the analysis
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }
    return JSON.parse(content) as {
      sentiment: "positive" | "neutral" | "negative";
      score: number;
      keyPoints: string[];
      productMentioned?: string;
      actionNeeded: boolean;
    };
  } catch (error: any) {
    console.error("Error analyzing feedback:", error);
    return {
      sentiment: "neutral",
      score: 0.5,
      keyPoints: ["Error processing feedback"],
      actionNeeded: false
    };
  }
}

export async function generateComparisonAnalysis(
  productA: string,
  productB: string,
  applicationContext?: string
): Promise<{
  strengths: { [key: string]: string[] };
  weaknesses: { [key: string]: string[] };
  recommendation: string;
  applicationFit: number;
}> {
  try {
    const productAInfo = PRODUCT_KNOWLEDGE[productA as keyof typeof PRODUCT_KNOWLEDGE];
    const productBInfo = PRODUCT_KNOWLEDGE[productB as keyof typeof PRODUCT_KNOWLEDGE];
    
    if (!productAInfo || !productBInfo) {
      throw new Error("Product not found in knowledge base");
    }

    const systemPrompt = `
You are a technical product comparison expert for Danny's Chemicals.
Compare the following two polyurethane products for their specific application context.
Provide a technical comparison including strengths and weaknesses of each product,
a recommendation, and an application fit score (0-10).

Respond in JSON format with this structure:
{
  "strengths": {
    "${productA}": [list of strengths],
    "${productB}": [list of strengths]
  },
  "weaknesses": {
    "${productA}": [list of weaknesses],
    "${productB}": [list of weaknesses]
  },
  "recommendation": "Your product recommendation and reasoning",
  "applicationFit": number from 0-10 rating how well the recommended product fits the application
}
`;

    const userPrompt = `
Compare ${productA} and ${productB} for ${applicationContext || "general construction applications"}.

Product A (${productA}):
${JSON.stringify(productAInfo, null, 2)}

Product B (${productB}):
${JSON.stringify(productBInfo, null, 2)}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }
    
    return JSON.parse(content) as {
      strengths: { [key: string]: string[] };
      weaknesses: { [key: string]: string[] };
      recommendation: string;
      applicationFit: number;
    };
  } catch (error: any) {
    console.error("Error generating comparison:", error);
    return {
      strengths: { [productA]: ["Error processing comparison"], [productB]: ["Error processing comparison"] },
      weaknesses: { [productA]: [], [productB]: [] },
      recommendation: "Unable to generate a recommendation at this time. Please contact our technical support team.",
      applicationFit: 5
    };
  }
}