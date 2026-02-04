"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-neon to-orange-600 text-black py-3 px-4 z-[150] shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-black text-neon px-2 py-1 rounded text-xs font-bold">DEMO</span>
          <p className="text-sm font-semibold">
            Vista previa - Modo Demostración | Esta web se adapta a tu marca
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="hover:bg-black/20 p-1 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
