export interface Dish {
  id: string;
  name: string;
  category: string;
  image?: string;
  description: string;
}

export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  difficulty: "Kolay" | "Orta" | "Zor";
  servings: string;
  image?: string;
}

export type CategoryType = "Hepsi" | "Kebablar" | "Deniz Ürünleri" | "Zeytinyağlılar" | "Çorbalar" | "Tatlılar" | "Hamur İşleri" | "Fast Food";
