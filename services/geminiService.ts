
import { GoogleGenAI, Type } from "@google/genai";
import { Category } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeProblem = async (title: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following problem post for a community server. 
      Check if it is a genuine, professional problem. 
      Rate it on a scale of 0-100 (100 being most genuine/professional).
      Categorize it and provide relevant tags.
      
      Problem Title: ${title}
      Problem Description: ${description}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            genuinenessScore: { type: Type.NUMBER },
            category: { type: Type.STRING, enum: Object.values(Category) },
            tags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            aiComment: { type: Type.STRING, description: "Short AI summary of the problem quality" }
          },
          required: ["genuinenessScore", "category", "tags", "aiComment"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      genuinenessScore: 70,
      category: Category.OTHER,
      tags: ["general"],
      aiComment: "Analysis failed, defaulting to general categorization."
    };
  }
};

export const getExpertAIAssistance = async (problemTitle: string, problemDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are an expert advisor on GlobalSolve. Provide a concise, highly professional initial solution or guidance for this problem:
      
      Title: ${problemTitle}
      Description: ${problemDescription}
      
      Format your response with helpful bullet points.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Assistant Error:", error);
    return "I am currently unable to process this request. Please wait for community experts.";
  }
};
