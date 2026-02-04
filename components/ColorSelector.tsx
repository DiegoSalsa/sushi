"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";
import { useState } from "react";

export default function ColorSelector() {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { name: "Naranja (Demo)", primary: "#ff9900", secondary: "#ffd700" },
    { name: "Rojo Pasión", primary: "#ef4444", secondary: "#fca5a5" },
    { name: "Azul Océano", primary: "#3b82f6", secondary: "#93c5fd" },
    { name: "Verde Fresco", primary: "#10b981", secondary: "#6ee7b7" },
    { name: "Púrpura Real", primary: "#a855f7", secondary: "#d8b4fe" },
    { name: "Rosa Sakura", primary: "#ec4899", secondary: "#f9a8d4" },
  ];

  const applyTheme = (primary: string, secondary: string) => {
    document.documentElement.style.setProperty('--color-neon', primary);
    document.documentElement.style.setProperty('--color-gold', secondary);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-zinc-900 border-2 border-neon text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
        title="Cambiar colores"
      >
        <Palette className="w-6 h-6" />
      </motion.button>

      {/* Color Selector Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-md bg-zinc-900 rounded-2xl border-2 border-neon shadow-2xl z-[110] p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Colores de Marca</h3>
                  <p className="text-sm text-gray-400">Se adapta a tu identidad</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Color Grid */}
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => applyTheme(theme.primary, theme.secondary)}
                    className="p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-600 transition-all"
                  >
                    <div className="flex gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: theme.secondary }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-white text-left">{theme.name}</p>
                  </motion.button>
                ))}
              </div>

              <p className="text-xs text-gray-500 text-center mt-6">
                💡 Demo: Los colores se aplican en tiempo real
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
