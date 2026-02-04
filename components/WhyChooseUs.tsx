"use client";

import { motion } from "framer-motion";
import { Leaf, ChefHat, Clock, ThumbsUp } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Leaf,
      title: "Ingredientes Frescos",
      description: "Seleccionamos los mejores ingredientes del día para garantizar la máxima frescura"
    },
    {
      icon: ChefHat,
      title: "Chef Experimentado",
      description: "Más de 10 años de experiencia en cocina japonesa tradicional"
    },
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Sistema de delivery optimizado para que llegue fresco y a tiempo"
    },
    {
      icon: ThumbsUp,
      title: "Garantía de Calidad",
      description: "Si no quedas satisfecho, te devolvemos tu dinero sin preguntas"
    }
  ];

  return (
    <section className="py-20 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Por Qué <span className="text-neon">Elegirnos?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            No somos solo otro delivery de sushi. Somos tu mejor opción.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-black border border-zinc-800 rounded-xl p-6 hover:border-neon transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-neon to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gold">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
