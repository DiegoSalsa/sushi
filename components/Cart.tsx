"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Send } from "lucide-react";
import type { CartItem } from "@/app/page";

interface CartProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  updateQuantity: (index: number, quantity: number) => void;
}

const DELIVERY_FEE = 1000;

export default function Cart({ cart, isOpen, onClose, updateQuantity }: CartProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  const sendToWhatsApp = () => {
    if (!name || !address || !phone) {
      alert("Por favor completa todos los datos de entrega");
      return;
    }

    let message = "Hola! Quiero pedir:\n\n";

    cart.forEach((item) => {
      message += `- ${item.quantity}x ${item.name}`;
      
      if (item.customizations) {
        const { protein, veggies, wrapper } = item.customizations;
        message += ` (${protein}, ${veggies?.join(", ")}, ${wrapper})`;
      }
      
      message += ` - $${(item.price * item.quantity).toLocaleString("es-CL")}\n`;
    });

    message += `\nDelivery: $${DELIVERY_FEE.toLocaleString("es-CL")}\n`;
    message += `Total: $${total.toLocaleString("es-CL")}\n\n`;
    message += `Datos:\n`;
    message += `Nombre: ${name}\n`;
    message += `Dirección: ${address}\n`;
    message += `Teléfono: ${phone}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/56912345678?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          {/* Slide-over */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[90%] md:w-[500px] bg-zinc-900 z-[201] shadow-2xl overflow-hidden flex flex-col border-l-2 border-neon/30"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-neon/20 to-gold/20 p-4 sm:p-6 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-glow">Tu Pedido</h2>
                <button
                  onClick={onClose}
                  className="text-white bg-zinc-800 hover:bg-zinc-700 transition-colors p-2 rounded-lg"
                >
                  <X className="w-7 h-7 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          {item.customizations && (
                            <p className="text-sm text-gray-400 mt-1">
                              {item.customizations.protein}, {item.customizations.veggies?.join(", ")}, {item.customizations.wrapper}
                            </p>
                          )}
                        </div>
                        <span className="text-gold font-bold">
                          ${(item.price * item.quantity).toLocaleString("es-CL")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-neon hover:bg-orange-600 text-black flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Customer Information */}
              {cart.length > 0 && (
                <div className="space-y-4 mb-6">
                  <h3 className="font-bold text-xl mb-4">Datos de Entrega</h3>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Diego"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-neon focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Dirección</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ej: Calle Falsa 123"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-neon focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej: +56 9 1234 5678"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-neon focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="bg-zinc-950 p-6 border-t border-zinc-800 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString("es-CL")}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery</span>
                    <span>${DELIVERY_FEE.toLocaleString("es-CL")}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold border-t border-zinc-800 pt-2">
                    <span>Total</span>
                    <span className="text-gold">${total.toLocaleString("es-CL")}</span>
                  </div>
                </div>

                <button
                  onClick={sendToWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Pedir por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
