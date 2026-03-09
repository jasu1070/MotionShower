
import { GoogleGenAI, Type } from "@google/genai";
import { LandingPageIdea, GeminiAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeAnimationIdea(idea: LandingPageIdea): Promise<GeminiAnalysis> {
  const prompt = `Analyze this landing page animation concept for a high-end web development project:
  Title: ${idea.title}
  Style: ${idea.animationStyle}
  Tech Stack: ${idea.techStack.join(', ')}
  
  Provide a detailed technical breakdown for a senior frontend engineer.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          implementationSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Step-by-step technical implementation guide."
          },
          recommendedLibraries: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Advanced libraries or specific plugins to use."
          },
          motionPrinciples: {
            type: Type.STRING,
            description: "Core animation principles applied (e.g., easing, timing, anticipation)."
          }
        },
        required: ["implementationSteps", "recommendedLibraries", "motionPrinciples"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim()) as GeminiAnalysis;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {
      implementationSteps: ["Init scene", "Apply shaders", "Handle scroll events"],
      recommendedLibraries: idea.techStack,
      motionPrinciples: "Dynamic easing with focus on responsiveness."
    };
  }
}
