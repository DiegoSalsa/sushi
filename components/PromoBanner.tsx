"use client";

import { motion } from "framer-motion";
import { Truck, Clock, Percent } from "lucide-react";
import { useState, useEffect } from "react";

export default function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const promos = [
    {
      icon: Truck,
      text: "Delivery GRATIS en pedidos sobre $15.000",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Clock,
      text: "Entrega en 30-45 minutos",
      color: "from-neon to-orange-600"
    },
    {
      icon: Percent,
      text: "10% OFF en tu primera orden",
      color: "from-purple-500 to-pink-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black border-b border-zinc-800 py-2 overflow-hidden">
      <div className="relative h-8">
        {promos.map((promo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: currentIndex === index ? 1 : 0,
              y: currentIndex === index ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center gap-2"
          >
            <div className={`p-1.5 rounded-full bg-gradient-to-r ${promo.color}`}>
              <promo.icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-semibold text-white">
              {promo.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
