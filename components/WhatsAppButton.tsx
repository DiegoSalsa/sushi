"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = "56912345678";
  const message = encodeURIComponent("¡Hola! Me gustaría hacer un pedido 🍣");

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
        y: [0, -10, 0]
      }}
      transition={{
        scale: { type: "spring", stiffness: 260, damping: 20 },
        rotate: { duration: 0.6 },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
      
      {/* Button */}
      <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300">
        <MessageCircle className="w-7 h-7" />
        
        {/* Notification dot */}
        <motion.span
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Tooltip */}
      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ¡Haz tu pedido por WhatsApp!
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-black/90"></div>
      </div>
    </motion.a>
  );
}
