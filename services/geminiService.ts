
import { GoogleGenAI, Type } from "@google/genai";
import type { Dish } from "../types";
import { PhotoStyle } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function parseMenu(menuText: string): Promise<Dish[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse the following restaurant menu text into a structured JSON array. Each object in the array should represent a dish and have 'name' and 'description' fields. The name should be the dish title, and the description should be the text that follows it.\n\nMENU:\n${menuText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "The name of the dish.",
              },
              description: {
                type: Type.STRING,
                description: "A brief description of the dish.",
              },
            },
            required: ["name", "description"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedDishes = JSON.parse(jsonText);
    return parsedDishes as Dish[];
  } catch (error) {
    console.error("Error parsing menu:", error);
    throw new Error("Failed to parse the menu. Please check the format and try again.");
  }
}

function getPromptForStyle(dish: Dish, style: PhotoStyle): string {
  const { name, description } = dish;
  switch (style) {
    case PhotoStyle.RUSTIC:
      return `Professional, ultra-realistic food photography of "${name}". Description: ${description}. The image should have a dark, rustic, and moody aesthetic. Shot with a shallow depth of field, emphasizing texture. The dish is presented on artisanal, dark ceramic or a wooden board, set on a dark, textured surface like aged wood or slate. Use dramatic, low-key lighting to create deep shadows and highlight details. Include subtle, rustic props like vintage cutlery, linen napkins, or scattered herbs. The overall atmosphere is warm, cozy, and high-end.`;
    case PhotoStyle.MODERN:
      return `Professional, ultra-realistic food photography of "${name}". Description: ${description}. The image should have a bright, clean, and modern aesthetic. Shot with crisp, clear focus and vibrant, natural colors. The dish is presented on minimalist, white porcelain, set against a clean, light-colored background (like white marble or a light-colored surface). Use bright, natural, or soft studio lighting to minimize shadows and create a fresh, airy feel. Keep props minimal and modern. The composition should be clean and elegant.`;
    case PhotoStyle.SOCIAL:
      return `A vibrant, top-down flat lay photograph of "${name}" for social media. Description: ${description}. The style should be eye-catching and trendy. The dish is perfectly arranged on a stylish plate or bowl, centered on a visually interesting background (like a colorful mat, rustic wood, or marble). Surround the main dish with complementary ingredients, colorful garnishes, or relevant props (e.g., a hand holding a fork, a cool drink, a phone). The lighting should be bright and even, making the colors pop. The composition is dynamic and engaging, perfect for a social media feed.`;
    default:
      return `High quality food photography of ${name}: ${description}`;
  }
}

export async function generateFoodImage(dish: Dish, style: PhotoStyle): Promise<string> {
  const prompt = getPromptForStyle(dish, style);
  const aspectRatio = style === PhotoStyle.SOCIAL ? '1:1' : '4:3';
  
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("No image was generated.");
    }

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error(`Error generating image for "${dish.name}":`, error);
    throw new Error(`Failed to generate an image for ${dish.name}.`);
  }
}
