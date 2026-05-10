import { motion } from "motion/react";
import { FEATURED_DISHES } from "../data/featured";

export default function BackgroundMarquee() {
  // Get dishes that have images
  const dishesWithImages = FEATURED_DISHES.filter(dish => dish.image);
  const images = [...dishesWithImages, ...dishesWithImages].map(dish => dish.image);
  
  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.12] select-none">
      <div className="flex flex-col gap-8 md:gap-12 mt-10 md:mt-20">
        {/* Row 1: Left to Right */}
        <div className="flex whitespace-nowrap">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-8 md:gap-12"
          >
            {images.map((img, i) => (
              <div key={`r1-${i}`} className="w-64 h-64 md:w-96 md:h-96 rounded-3xl overflow-hidden flex-shrink-0">
                <img src={img} alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex whitespace-nowrap">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{
              duration: 100,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-8 md:gap-12"
          >
            {images.map((img, i) => (
              <div key={`r2-${i}`} className="w-64 h-64 md:w-96 md:h-96 rounded-3xl overflow-hidden flex-shrink-0">
                <img src={img} alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 3: Left to Right */}
        <div className="flex whitespace-nowrap">
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: "-60%" }}
            transition={{
              duration: 90,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-8 md:gap-12"
          >
            {[...images].reverse().map((img, i) => (
              <div key={`r3-${i}`} className="w-64 h-64 md:w-96 md:h-96 rounded-3xl overflow-hidden flex-shrink-0">
                <img src={img} alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
