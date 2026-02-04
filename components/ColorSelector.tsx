"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ColorSelectorProps {
  isCartOpen: boolean;
}

export default function ColorSelector({ isCartOpen }: ColorSelectorProps) {
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
    // Aplicar colores a todos los elementos que usan text-neon, bg-neon, border-neon
    const style = document.createElement('style');
    style.id = 'dynamic-theme';
    
    // Remover estilo anterior si existe
    const oldStyle = document.getElementById('dynamic-theme');
    if (oldStyle) oldStyle.remove();
    
    style.innerHTML = `
      .text-neon { color: ${primary} !important; }
      .bg-neon { background-color: ${primary} !important; }
      .border-neon { border-color: ${primary} !important; }
      .text-gold { color: ${secondary} !important; }
      .bg-gold { background-color: ${secondary} !important; }
      .fill-gold { fill: ${secondary} !important; }
      .shadow-neon\\/50 { box-shadow: 0 0 50px ${primary}80 !important; }
      .hover\\:bg-orange-600:hover { background-color: ${primary}dd !important; }
      .from-neon { --tw-gradient-from: ${primary} !important; }
      .to-orange-600 { --tw-gradient-to: ${primary}dd !important; }
    `;
    
    document.head.appendChild(style);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isCartOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-16 sm:bottom-24 right-4 sm:right-6 bg-zinc-900 border-2 border-neon text-white p-3 sm:p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
            title="Cambiar colores"
          >
            <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-24px)] max-w-md bg-zinc-900 rounded-2xl border-2 border-neon shadow-2xl z-[110] p-4 sm:p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Colores de Marca</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Se adapta a tu identidad</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Color Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {themes.map((theme, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => applyTheme(theme.primary, theme.secondary)}
                    className="p-3 sm:p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-600 transition-all"
                  >
                    <div className="flex gap-2 mb-2">
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: theme.secondary }}
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-white text-left">{theme.name}</p>
                  </motion.button>
                ))}
              </div>

              <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-4 sm:mt-6">
                💡 Demo: Los colores se aplican en tiempo real
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
