import { motion, AnimatePresence } from "motion/react";
import { X, Clock, Users, ChefHat } from "lucide-react";
import { Recipe } from "../types";

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

export default function RecipeModal({ recipe, isOpen, onClose, isLoading }: RecipeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-20 shadow-sm"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="overflow-y-auto flex-1">
            <div className="p-8 md:p-12">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="w-12 h-12 border-4 border-natural-accent border-t-transparent rounded-full animate-spin" />
                  <p className="text-natural-muted font-medium">Tarif hazırlanıyor...</p>
                </div>
              ) : recipe ? (
                <>
                  <div className="mb-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-primary mb-6">{recipe.name}</h2>
                    
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                      <div className="flex items-center gap-2 px-4 py-2 bg-natural-light text-natural-primary rounded-2xl border border-natural-border">
                        <Clock className="w-4 h-4 text-natural-accent" />
                        <span>Hazırlama: {recipe.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-natural-light text-natural-primary rounded-2xl border border-natural-border">
                        <Clock className="w-4 h-4 text-natural-accent" />
                        <span>Pişirme: {recipe.cookTime}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-natural-light text-natural-primary rounded-2xl border border-natural-border">
                        <Users className="w-4 h-4 text-natural-accent" />
                        <span>{recipe.servings}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-natural-light text-natural-primary rounded-2xl border border-natural-border">
                        <ChefHat className="w-4 h-4 text-natural-accent" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                    <div>
                      <h3 className="text-xl font-bold text-natural-primary mb-6 border-b border-natural-border pb-2 inline-block">Malzemeler</h3>
                      <ul className="space-y-4">
                        {recipe.ingredients.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-natural-text">
                            <div className="w-5 h-5 rounded-full bg-natural-light flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-natural-accent" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-natural-primary mb-6 border-b border-natural-border pb-2 inline-block">Hazırlanışı</h3>
                      <div className="space-y-8">
                        {recipe.instructions.map((step, idx) => (
                          <div key={idx} className="flex gap-6">
                            <span className="text-4xl font-serif font-bold text-natural-light tracking-tighter leading-none">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <p className="text-natural-text leading-relaxed pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
