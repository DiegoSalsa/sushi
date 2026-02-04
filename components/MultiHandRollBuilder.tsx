"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingCart, ChevronRight } from "lucide-react";
import { useState } from "react";

interface MultiHandRollBuilderProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: any) => void;
}

const PROTEINS = [
  { id: "salmon", name: "Salmón", icon: "🐟" },
  { id: "tuna", name: "Atún", icon: "🐟" },
  { id: "shrimp", name: "Camarón", icon: "🦐" },
  { id: "crab", name: "Cangrejo", icon: "🦀" },
  { id: "chicken", name: "Pollo", icon: "🍗" },
];

const VEGGIES = [
  { id: "avocado", name: "Palta", icon: "🥑" },
  { id: "cucumber", name: "Pepino", icon: "🥒" },
  { id: "carrot", name: "Zanahoria", icon: "🥕" },
  { id: "onion", name: "Cebollín", icon: "🧅" },
  { id: "lettuce", name: "Lechuga", icon: "🥬" },
];

const WRAPPERS = [
  { id: "nori", name: "Alga Nori", icon: "🌿" },
  { id: "soy", name: "Papel Soya", icon: "📄" },
];

export default function MultiHandRollBuilder({ item, isOpen, onClose, onAddToCart }: MultiHandRollBuilderProps) {
  const [currentRoll, setCurrentRoll] = useState(0);
  const [rolls, setRolls] = useState<any[]>(
    Array(item.quantity).fill(null).map(() => ({
      protein: "",
      veggies: [],
      wrapper: "nori"
    }))
  );

  const updateRoll = (index: number, field: string, value: any) => {
    const newRolls = [...rolls];
    if (field === "veggies") {
      const currentVeggies = newRolls[index].veggies;
      if (currentVeggies.includes(value)) {
        newRolls[index].veggies = currentVeggies.filter((v: string) => v !== value);
      } else if (currentVeggies.length < 2) {
        newRolls[index].veggies = [...currentVeggies, value];
      }
    } else {
      newRolls[index][field] = value;
    }
    setRolls(newRolls);
  };

  const isRollComplete = (roll: any) => {
    return roll.protein && roll.veggies.length === 2 && roll.wrapper;
  };

  const allRollsComplete = rolls.every(isRollComplete);

  const handleNext = () => {
    if (currentRoll < item.quantity - 1) {
      setCurrentRoll(currentRoll + 1);
    }
  };

  const handlePrev = () => {
    if (currentRoll > 0) {
      setCurrentRoll(currentRoll - 1);
    }
  };

  const handleAddToCart = () => {
    if (!allRollsComplete) return;

    const rollDescriptions = rolls.map((roll, idx) => {
      const protein = PROTEINS.find(p => p.id === roll.protein)?.name;
      const veggies = roll.veggies.map((v: string) => VEGGIES.find(veg => veg.id === v)?.name).join(", ");
      const wrapper = WRAPPERS.find(w => w.id === roll.wrapper)?.name;
      return `Roll ${idx + 1}: ${protein} + ${veggies} (${wrapper})`;
    }).join(" | ");

    onAddToCart({
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      price: item.price,
      quantity: 1,
      customizations: {
        details: rollDescriptions
      }
    });

    setRolls(Array(item.quantity).fill(null).map(() => ({
      protein: "",
      veggies: [],
      wrapper: "nori"
    })));
    setCurrentRoll(0);
    onClose();
  };

  if (!isOpen) return null;

  const currentRollData = rolls[currentRoll];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
          <div className="sticky top-0 bg-gradient-to-r from-neon to-orange-600 p-6 z-10">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-black">{item.name}</h2>
                <p className="text-black/80 text-sm mt-1">Personaliza cada hand roll</p>
                
                {/* Progress */}
                <div className="mt-4 flex gap-2">
                  {rolls.map((roll, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentRoll(idx)}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        idx === currentRoll
                          ? "bg-black"
                          : isRollComplete(roll)
                          ? "bg-black/60"
                          : "bg-black/20"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-black/70 text-xs mt-2 font-bold">
                  Roll {currentRoll + 1} de {item.quantity}
                  {isRollComplete(currentRollData) && " ✓"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-black hover:bg-black/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)] space-y-6">
            {/* Protein Selection */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                1. Elige tu Proteína {currentRollData.protein && "✓"}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PROTEINS.map((protein) => (
                  <motion.button
                    key={protein.id}
                    onClick={() => updateRoll(currentRoll, "protein", protein.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      currentRollData.protein === protein.id
                        ? "border-neon bg-neon/10"
                        : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <div className="text-3xl mb-2">{protein.icon}</div>
                    <p className="text-white font-semibold text-sm">{protein.name}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Veggies Selection */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                2. Elige 2 Vegetales ({currentRollData.veggies.length}/2) {currentRollData.veggies.length === 2 && "✓"}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {VEGGIES.map((veggie) => {
                  const isSelected = currentRollData.veggies.includes(veggie.id);
                  const canSelect = currentRollData.veggies.length < 2;

                  return (
                    <motion.button
                      key={veggie.id}
                      onClick={() => updateRoll(currentRoll, "veggies", veggie.id)}
                      disabled={!isSelected && !canSelect}
                      whileHover={canSelect || isSelected ? { scale: 1.05 } : {}}
                      whileTap={canSelect || isSelected ? { scale: 0.95 } : {}}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-neon bg-neon/10"
                          : canSelect
                          ? "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                          : "border-zinc-800 bg-zinc-900/50 opacity-40 cursor-not-allowed"
                      }`}
                    >
                      <div className="text-3xl mb-2">{veggie.icon}</div>
                      <p className="text-white font-semibold text-sm">{veggie.name}</p>
                      {isSelected && (
                        <div className="mt-1 w-5 h-5 bg-neon rounded-full mx-auto flex items-center justify-center">
                          <Check className="w-3 h-3 text-black" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Wrapper Selection */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                3. Elige la Cubierta {currentRollData.wrapper && "✓"}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {WRAPPERS.map((wrapper) => (
                  <motion.button
                    key={wrapper.id}
                    onClick={() => updateRoll(currentRoll, "wrapper", wrapper.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      currentRollData.wrapper === wrapper.id
                        ? "border-neon bg-neon/10"
                        : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <div className="text-3xl mb-2">{wrapper.icon}</div>
                    <p className="text-white font-semibold text-sm">{wrapper.name}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {currentRoll > 0 && (
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold transition-all"
                  >
                    Anterior
                  </button>
                )}
              </div>
              
              <div>
                <p className="text-gray-400 text-sm text-right">Total</p>
                <p className="text-2xl font-bold text-gold">${item.price.toLocaleString("es-CL")}</p>
              </div>

              {currentRoll < item.quantity - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!isRollComplete(currentRollData)}
                  className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                    isRollComplete(currentRollData)
                      ? "bg-neon hover:bg-orange-600 text-black"
                      : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!allRollsComplete}
                  className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                    allRollsComplete
                      ? "bg-neon hover:bg-orange-600 text-black"
                      : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Agregar
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
