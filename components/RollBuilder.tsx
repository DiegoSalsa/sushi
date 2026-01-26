"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import type { CartItem } from "@/app/page";

interface RollBuilderProps {
  item: {
    id: string;
    name: string;
    price: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const PROTEINS = ["Pollo", "Carne Mechada", "Camarón", "Salmón", "Kanikama"];
const VEGGIES = ["Palta", "Cebollín", "Queso Crema", "Champignon"];
const WRAPPERS = ["Panko", "Tempura", "Sésamo", "Palta", "Ciboulette"];

export default function RollBuilder({ item, isOpen, onClose, onAddToCart }: RollBuilderProps) {
  const [selectedProtein, setSelectedProtein] = useState<string>("");
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);
  const [selectedWrapper, setSelectedWrapper] = useState<string>("");

  const toggleVeggie = (veggie: string) => {
    if (selectedVeggies.includes(veggie)) {
      setSelectedVeggies(selectedVeggies.filter((v) => v !== veggie));
    } else if (selectedVeggies.length < 2) {
      setSelectedVeggies([...selectedVeggies, veggie]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedProtein || selectedVeggies.length === 0 || !selectedWrapper) {
      alert("Por favor completa todas las selecciones");
      return;
    }

    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      customizations: {
        protein: selectedProtein,
        veggies: selectedVeggies,
        wrapper: selectedWrapper,
      },
    });

    // Reset selections
    setSelectedProtein("");
    setSelectedVeggies([]);
    setSelectedWrapper("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-2 right-2 top-2 bottom-2 sm:inset-4 m-auto w-auto max-w-md h-fit max-h-[calc(100%-16px)] bg-zinc-900 rounded-xl z-[110] border-2 border-neon shadow-[0_0_30px_rgba(255,153,0,0.6)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-neon to-orange-600 p-3 border-b-2 border-gold flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black">Personaliza tu {item.name}</h2>
                  <p className="text-black/70 text-xs font-medium">Crea tu roll perfecto</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-black hover:text-white transition-colors bg-black/20 rounded-full p-2 hover:bg-black/40"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3 bg-black">
              {/* Protein Selection */}
              <div className="mb-3">
                <h3 className="text-sm font-bold mb-2 flex items-center text-white">
                  <span className="bg-neon text-black w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                    1
                  </span>
                  Proteína
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {PROTEINS.map((protein) => (
                    <button
                      key={protein}
                      onClick={() => setSelectedProtein(protein)}
                      className={`p-2 rounded-lg border-2 transition-all text-xs ${
                        selectedProtein === protein
                          ? "border-neon bg-neon text-black font-bold"
                          : "border-zinc-600 text-white bg-zinc-800"
                      }`}
                    >
                      {protein}
                    </button>
                  ))}
                </div>
              </div>

              {/* Veggies Selection */}
              <div className="mb-3">
                <h3 className="text-sm font-bold mb-2 flex items-center text-white">
                  <span className="bg-neon text-black w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                    2
                  </span>
                  Vegetales (máx 2)
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {VEGGIES.map((veggie) => (
                    <button
                      key={veggie}
                      onClick={() => toggleVeggie(veggie)}
                      disabled={!selectedVeggies.includes(veggie) && selectedVeggies.length >= 2}
                      className={`p-2 rounded-lg border-2 transition-all text-xs ${
                        selectedVeggies.includes(veggie)
                          ? "border-neon bg-neon text-black font-bold"
                          : selectedVeggies.length >= 2
                          ? "border-zinc-700 text-gray-600 cursor-not-allowed bg-zinc-900 opacity-50"
                          : "border-zinc-600 text-white bg-zinc-800"
                      }`}
                    >
                      {veggie}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {selectedVeggies.length}/2 seleccionados
                </p>
              </div>

              {/* Wrapper Selection */}
              <div className="mb-2">
                <h3 className="text-sm font-bold mb-2 flex items-center text-white">
                  <span className="bg-neon text-black w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                    3
                  </span>
                  Cobertura
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {WRAPPERS.map((wrapper) => (
                    <button
                      key={wrapper}
                      onClick={() => setSelectedWrapper(wrapper)}
                      className={`p-2 rounded-lg border-2 transition-all text-xs ${
                        selectedWrapper === wrapper
                          ? "border-neon bg-neon text-black font-bold"
                          : "border-zinc-600 text-white bg-zinc-800"
                      }`}
                    >
                      {wrapper}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-black p-3 border-t border-neon/30 flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">Total:</span>
                <span className="text-xl font-bold text-gold">
                  ${item.price.toLocaleString("es-CL")}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!selectedProtein || selectedVeggies.length === 0 || !selectedWrapper}
                className="w-full bg-neon hover:bg-orange-600 text-black font-bold py-2.5 rounded-full text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agregar al Carrito
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}