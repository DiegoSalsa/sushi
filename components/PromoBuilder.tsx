"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface PromoBuilderProps {
  promo: {
    id: string;
    name: string;
    price: number;
    description: string;
    rollsToSelect: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: any) => void;
}

const AVAILABLE_ROLLS = [
  { id: "california", name: "California Roll", category: "clásico", description: "Cangrejo, palta, pepino y sésamo" },
  { id: "philadelphia", name: "Philadelphia Roll", category: "clásico", description: "Salmón, queso crema y cebollín" },
  { id: "spicy-tuna", name: "Spicy Tuna Roll", category: "clásico", description: "Atún picante, mayo y cebollín" },
  { id: "dragon", name: "Dragon Roll", category: "especial", description: "Camarón tempura, palta encima y salsa anguila" },
  { id: "rainbow", name: "Rainbow Roll", category: "especial", description: "California roll cubierto con salmón, atún y palta" },
  { id: "volcano", name: "Volcano Roll", category: "especial", description: "Atún picante, cangrejo y salsa picante gratinada" },
  { id: "tempura", name: "Tempura Roll", category: "frito", description: "Roll completo frito con vegetales y proteína" },
  { id: "crispy-salmon", name: "Crispy Salmon Roll", category: "frito", description: "Salmón, queso crema, todo frito y crocante" },
  { id: "golden", name: "Golden Roll", category: "frito", description: "Roll frito cubierto en panko dorado" },
  { id: "veggie", name: "Veggie Roll", category: "vegetariano", description: "Palta, pepino, zanahoria y lechuga" },
  { id: "avocado", name: "Avocado Roll", category: "vegetariano", description: "Palta fresca con sésamo" },
  { id: "cucumber", name: "Cucumber Roll", category: "vegetariano", description: "Pepino fresco y crocante" },
];

export default function PromoBuilder({ promo, isOpen, onClose, onAddToCart }: PromoBuilderProps) {
  const [selectedRolls, setSelectedRolls] = useState<string[]>([]);

  const toggleRoll = (rollId: string) => {
    if (selectedRolls.includes(rollId)) {
      setSelectedRolls(selectedRolls.filter(id => id !== rollId));
    } else {
      if (selectedRolls.length < promo.rollsToSelect) {
        setSelectedRolls([...selectedRolls, rollId]);
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedRolls.length !== promo.rollsToSelect) return;

    const selectedNames = selectedRolls.map(id => 
      AVAILABLE_ROLLS.find(r => r.id === id)?.name
    ).join(", ");

    onAddToCart({
      id: promo.id,
      name: promo.name,
      price: promo.price,
      quantity: 1,
      customizations: {
        rolls: selectedNames
      }
    });

    setSelectedRolls([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-zinc-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-zinc-800"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-neon to-orange-600 p-4 sm:p-6 z-10">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-black">{promo.name}</h2>
                <p className="text-black/80 text-xs sm:text-sm mt-1">{promo.description}</p>
                <div className="mt-2 sm:mt-3 bg-black/20 inline-block px-2 sm:px-3 py-1 rounded-full">
                  <span className="text-black font-bold text-sm sm:text-base">
                    Selecciona {promo.rollsToSelect} rolls ({selectedRolls.length}/{promo.rollsToSelect})
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-black hover:bg-black/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Rolls Selection */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
            <div className="grid md:grid-cols-2 gap-3">
              {AVAILABLE_ROLLS.map((roll) => {
                const isSelected = selectedRolls.includes(roll.id);
                const canSelect = selectedRolls.length < promo.rollsToSelect;

                return (
                  <motion.button
                    key={roll.id}
                    onClick={() => toggleRoll(roll.id)}
                    disabled={!isSelected && !canSelect}
                    whileHover={canSelect || isSelected ? { scale: 1.02 } : {}}
                    whileTap={canSelect || isSelected ? { scale: 0.98 } : {}}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? "border-neon bg-neon/10 shadow-lg shadow-neon/20"
                        : canSelect
                        ? "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                        : "border-zinc-800 bg-zinc-900/50 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">{roll.name}</h3>
                        <p className="text-xs text-gray-400 mb-2">{roll.description}</p>
                        <span className="inline-block px-2 py-0.5 text-xs bg-zinc-700 text-gray-300 rounded-full capitalize">{roll.category}</span>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-6 h-6 bg-neon rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-4 h-4 text-black" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-3xl font-bold text-gold">${promo.price.toLocaleString("es-CL")}</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={selectedRolls.length !== promo.rollsToSelect}
                className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                  selectedRolls.length === promo.rollsToSelect
                    ? "bg-neon hover:bg-orange-600 text-black"
                    : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
