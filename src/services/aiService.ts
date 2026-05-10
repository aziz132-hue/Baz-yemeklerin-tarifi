import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function fetchRecipe(dishName: string): Promise<Recipe> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Türkiye'den "${dishName}" yemeği için profesyonel bir yemek tarifi oluştur. Malzemeleri ve adım adım yapılışını Türkçe olarak hazırla.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          prepTime: { type: Type.STRING },
          cookTime: { type: Type.STRING },
          difficulty: { 
            type: Type.STRING,
            enum: ["Kolay", "Orta", "Zor"]
          },
          servings: { type: Type.STRING }
        },
        required: ["name", "ingredients", "instructions", "prepTime", "cookTime", "difficulty", "servings"]
      }
    }
  });

  return JSON.parse(response.text.trim());
}

export async function searchDishes(query: string): Promise<any[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Türkiye'den "${query}" ile ilgili popüler yemekleri listele. Her yemek için şu bilgileri üret:
    - name: Yemek adı
    - category: Kategori (Kebablar, Çorbalar, Tatlılar, vb.)
    - description: Kısa açıklama (1-2 cümle)
    - image: Wikipedia'dan gerçek bir görsel URL'si. Format: https://upload.wikimedia.org/wikipedia/commons/thumb/... veya direkt commons linki. Lütfen uydurma link verme, gerçek Wikipedia görsel linkleri kullanmaya çalış. Eğer kesin bir link bulamazsan boş bırak.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            category: { type: Type.STRING },
            description: { type: Type.STRING },
            image: { type: Type.STRING }
          },
          required: ["name", "category", "description"]
        }
      }
    }
  });

  return JSON.parse(response.text.trim());
}
