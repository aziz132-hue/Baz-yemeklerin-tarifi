import { CATEGORIES } from "../data/featured";
import { CategoryType } from "../types";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface CategoryBarProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export default function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-8">
      <div className="flex items-center justify-center gap-3 px-4 min-w-max">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id as CategoryType)}
            className={cn(
              "relative px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
              activeCategory === category.id 
                ? "text-natural-primary bg-white shadow-sm border border-natural-border" 
                : "text-natural-muted hover:text-natural-primary hover:bg-natural-light"
            )}
          >
            {activeCategory === category.id && (
              <span className="w-2 h-2 rounded-full bg-natural-accent" />
            )}
            <span className="relative z-10">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
