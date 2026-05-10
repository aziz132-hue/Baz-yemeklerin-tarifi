/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from "motion/react";
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import CategoryBar from './components/CategoryBar';
import DishCard from './components/DishCard';
import RecipeModal from './components/RecipeModal';
import BackgroundMarquee from './components/BackgroundMarquee';
import { FEATURED_DISHES } from './data/featured';
import { Dish, CategoryType, Recipe } from './types';
import { fetchRecipe, searchDishes } from './services/aiService';
import { Utensils, Heart } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("Hepsi");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [searchResults, setSearchResults] = useState<Dish[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const dishes = useMemo(() => {
    const base = searchResults.length > 0 ? searchResults : FEATURED_DISHES;
    if (activeCategory === "Hepsi") return base;
    return base.filter(dish => dish.category === activeCategory);
  }, [activeCategory, searchResults]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await searchDishes(query);
      const formattedResults = results.map((r, i) => ({
        id: `search-${i}`,
        name: r.name,
        category: r.category,
        description: r.description,
        image: r.image || ""
      }));
      setSearchResults(formattedResults);
      setActiveCategory("Hepsi");
    } catch (error) {
      console.error("Arama hatası:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDishClick = async (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
    setIsLoadingRecipe(true);
    try {
      const recipe = await fetchRecipe(dish.name);
      setSelectedRecipe(recipe);
    } catch (error) {
      console.error("Tarif yükleme hatası:", error);
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedDish(null);
      setSelectedRecipe(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-natural-bg relative">
      <BackgroundMarquee />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 pb-24">
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        
        <div className="mt-12">
          <CategoryBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-natural-primary border-l-4 border-natural-accent pl-4">
              {searchResults.length > 0 ? "Arama Sonuçları" : "Favori Lezzetler"}
            </h2>
            {searchResults.length > 0 && (
              <button 
                onClick={() => setSearchResults([])}
                className="text-natural-accent text-sm font-semibold hover:underline"
              >
                Geri Dön
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {dishes.map((dish) => (
                <DishCard 
                  key={dish.id} 
                  dish={dish} 
                  onClick={handleDishClick} 
                />
              ))}
            </AnimatePresence>
          </div>
          
          {dishes.length === 0 && !isSearching && (
            <div className="text-center py-24">
              <Utensils className="w-16 h-16 text-natural-border mx-auto mb-4" />
              <p className="text-natural-muted">Aradığınız kriterlere uygun sonuç bulunamadı.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-natural-sidebar py-16 border-t border-natural-border">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="font-serif text-2xl font-bold text-natural-primary">Lezzet Rehberi</h2>
          </div>
          <p className="text-natural-muted text-sm text-center max-w-md leading-relaxed mb-8">
            Türkiye'nin lezzet mirasını gelecek nesillere taşımak ve 
            mutfak kültürümüzü tanıtmak için buradayız.
          </p>
          <div className="flex items-center gap-1 text-xs text-natural-muted">
            <span>Sevgilerle yapıldı</span>
            <Heart className="w-3 h-3 text-natural-accent fill-natural-accent" />
            <span>Türkiye, 2026</span>
          </div>
        </div>
      </footer>

      <RecipeModal 
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isLoading={isLoadingRecipe}
      />
    </div>
  );
}

