"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Cuál es el tiempo de entrega?",
      answer: "El tiempo de entrega es de 30-45 minutos aproximadamente, dependiendo de tu ubicación."
    },
    {
      question: "¿Cuál es el monto mínimo de pedido?",
      answer: "No tenemos monto mínimo de pedido. El delivery tiene un costo de $1.000."
    },
    {
      question: "¿Puedo personalizar mis rolls?",
      answer: "¡Sí! Nuestros Hand Rolls son completamente personalizables. Elige tu proteína, vegetales y tipo de cubierta."
    },
    {
      question: "¿Cómo realizo el pago?",
      answer: "Puedes pagar en efectivo al momento de la entrega o mediante transferencia bancaria."
    },
    {
      question: "¿Hacen delivery a toda la ciudad?",
      answer: "Hacemos delivery a la mayoría de sectores. Confirma disponibilidad al enviar tu pedido por WhatsApp."
    }
  ];

  return (
    <section id="faq" className="py-16 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Preguntas <span className="text-neon">Frecuentes</span>
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-neon flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
