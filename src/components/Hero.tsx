import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="relative h-[45vh] min-h-[350px] w-full overflow-hidden bg-natural-primary">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
      </div>
      
      <div className="relative flex h-full items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-xs text-white/60 uppercase tracking-[0.3em] font-bold mb-4">Türkiye'nin Mutfak Hazinesi</p>
          <h1 className="mb-6 font-serif text-5xl md:text-7xl font-bold text-white tracking-tight">
            Lezzet <span className="text-natural-accent italic">Atlası</span>
          </h1>
          <div className="w-24 h-1 bg-natural-accent mx-auto mb-8 rounded-full" />
          <p className="text-lg text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            Geleneksel yemeklerimiz, hikayeleri ve sırlarıyla. 
            Anadolu'nun her köşesinden en özel tarifleri keşfedin.
          </p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-natural-bg to-transparent" />
    </div>
  );
}
