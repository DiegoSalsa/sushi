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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            ¿Por Qué <span className="text-neon">Elegirnos?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            No somos solo otro delivery de sushi. Somos tu mejor opción.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -15,
                rotateY: 5,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="bg-black border border-zinc-800 rounded-xl p-6 hover:border-neon transition-all duration-300 relative overflow-hidden group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-neon to-orange-600 rounded-lg flex items-center justify-center mb-4 relative z-10"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-7 h-7 text-black" />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2 text-gold relative z-10">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                {feature.description}
              </p>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
