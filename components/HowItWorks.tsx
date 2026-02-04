"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Smartphone, Truck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: ShoppingBag,
      title: "1. Elige",
      description: "Explora nuestro menú y personaliza tu pedido"
    },
    {
      icon: Smartphone,
      title: "2. Pide",
      description: "Envía tu pedido directo por WhatsApp"
    },
    {
      icon: Truck,
      title: "3. Recibe",
      description: "Recibe tu sushi fresco en tu puerta"
    }
  ];

  return (
    <section id="como-funciona" className="py-16 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          ¿Cómo <span className="text-neon">Funciona?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-neon/50 transition-all duration-300 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neon rounded-full mb-6">
                  <step.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="text-neon text-4xl">→</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
