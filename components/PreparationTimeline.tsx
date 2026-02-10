"use client";

import { motion } from "framer-motion";
import { ChefHat, Package, Truck, CheckCircle } from "lucide-react";

export default function PreparationTimeline() {
  const steps = [
    {
      icon: ChefHat,
      title: "Recibimos tu Pedido",
      description: "Confirmamos tu orden y comenzamos a preparar",
      delay: 0,
    },
    {
      icon: Package,
      title: "Preparación del Chef",
      description: "Nuestro chef prepara tu sushi con ingredientes frescos",
      delay: 0.2,
    },
    {
      icon: Truck,
      title: "En Camino",
      description: "Tu pedido sale hacia tu domicilio",
      delay: 0.4,
    },
    {
      icon: CheckCircle,
      title: "¡Listo para Disfrutar!",
      description: "Recibe tu sushi fresco y delicioso",
      delay: 0.6,
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-neon via-orange-600 to-gold animate-gradient-x" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Así Preparamos tu <span className="text-neon">Sushi</span>
          </h2>
          <p className="text-gray-400 text-lg">Del chef a tu mesa en minutos</p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-neon via-orange-600 to-gold hidden md:block transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: step.delay,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-neon transition-all duration-300 group relative overflow-hidden">
                  {/* Neumorphic effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-neon to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-neon/30 relative z-10"
                  >
                    <step.icon className="w-8 h-8 text-black" />
                  </motion.div>

                  {/* Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-neon font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-neon transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>

                  {/* Progress indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: step.delay + 0.3 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neon to-gold"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </section>
  );
}
