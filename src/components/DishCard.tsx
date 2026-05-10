import { motion } from "motion/react";
import { Dish } from "../types";
import { Clock, ChefHat, UtensilsCrossed } from "lucide-react";

interface DishCardProps {
  dish: Dish;
  onClick: (dish: Dish) => void;
}

export default function DishCard({ dish, onClick }: DishCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(dish)}
      className="group bg-white rounded-3xl p-8 border border-natural-border shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col min-h-[280px]"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-natural-light rounded-2xl flex items-center justify-center text-natural-accent group-hover:bg-natural-accent group-hover:text-white transition-all duration-300">
          <UtensilsCrossed className="w-6 h-6" />
        </div>
        <span className="px-3 py-1 bg-natural-light text-natural-primary text-[10px] uppercase tracking-widest font-bold rounded-full border border-natural-border">
          {dish.category}
        </span>
      </div>
      
      <div className="flex-1">
        <h3 className="text-2xl font-serif font-bold text-natural-primary mb-3 group-hover:text-natural-accent transition-colors leading-tight">
          {dish.name}
        </h3>
        <p className="text-natural-muted text-sm line-clamp-3 leading-relaxed">
          {dish.description}
        </p>
      </div>
      
      <div className="mt-auto px-2 pt-4 border-t border-natural-light flex items-center justify-between text-natural-muted text-[11px] font-bold uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-natural-accent" />
          <span>45 DK</span>
        </div>
        <div className="flex items-center gap-1.5 text-natural-accent">
          <ChefHat className="w-3.5 h-3.5" />
          <span>ORTA</span>
        </div>
      </div>
    </motion.div>
  );
}
