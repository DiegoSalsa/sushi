"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { useState } from "react";
import type { CartItem } from "@/app/page";

interface ProductDetailProps {
  item: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductDetail({ item, isOpen, onClose, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
    });
    setQuantity(1);
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
            className="fixed inset-4 m-auto w-full max-w-lg h-fit max-h-[calc(100vh-32px)] bg-white rounded-2xl z-[110] overflow-hidden border-4 border-neon shadow-[0_0_50px_rgba(255,153,0,0.5)]"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 bg-zinc-900">
              <h2 className="text-3xl font-bold mb-2 text-neon">{item.name}</h2>
              <p className="text-gray-100 mb-6 text-lg">{item.description}</p>

              {/* Price */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-bold text-gold">
                  ${item.price.toLocaleString("es-CL")}
                </span>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm text-white mb-3 font-bold text-lg">Cantidad</label>
                <div className="flex items-center gap-4 bg-black rounded-full px-4 py-2 w-fit border-2 border-zinc-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-xl w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-neon hover:bg-orange-600 text-black flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-neon hover:bg-orange-600 text-black font-bold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                Agregar ${(item.price * quantity).toLocaleString("es-CL")} al Carrito
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
