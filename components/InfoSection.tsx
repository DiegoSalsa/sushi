"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, CreditCard, Banknote, Smartphone } from "lucide-react";

export default function InfoSection() {
  const schedules = [
    { day: "Lunes - Viernes", hours: "12:00 PM - 11:00 PM" },
    { day: "Sábado - Domingo", hours: "12:00 PM - 12:00 AM" },
    { day: "Feriados", hours: "1:00 PM - 10:00 PM" }
  ];

  const deliveryZones = [
    "Centro",
    "Providencia",
    "Las Condes",
    "Vitacura",
    "Ñuñoa",
    "La Reina",
    "Macul",
    "Peñalolén"
  ];

  const paymentMethods = [
    { icon: Banknote, name: "Efectivo", color: "from-green-500 to-emerald-600" },
    { icon: CreditCard, name: "Tarjetas", color: "from-blue-500 to-cyan-600" },
    { icon: Smartphone, name: "Transferencia", color: "from-purple-500 to-pink-600" }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Horarios */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-neon transition-all duration-300 relative overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <motion.div 
              className="flex items-center gap-3 mb-6 relative z-10"
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-neon to-orange-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Clock className="w-6 h-6 text-black" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gold">Horarios</h3>
            </motion.div>
            <div className="space-y-3 relative z-10">
              {schedules.map((schedule, index) => (
                <motion.div 
                  key={index} 
                  className="border-l-2 border-neon pl-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <p className="font-semibold text-white">{schedule.day}</p>
                  <p className="text-gray-400 text-sm">{schedule.hours}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cobertura */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-neon transition-all duration-300 relative overflow-hidden group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <motion.div 
              className="flex items-center gap-3 mb-6 relative z-10"
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-neon to-orange-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MapPin className="w-6 h-6 text-black" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gold">Cobertura</h3>
            </motion.div>
            <div className="space-y-2 relative z-10">
              <p className="text-gray-400 text-sm mb-3">Hacemos delivery en:</p>
              <div className="grid grid-cols-2 gap-2">
                {deliveryZones.map((zone, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, type: "spring" }}
                    whileHover={{ x: 5, scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-neon rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                    <span className="text-gray-300">{zone}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Formas de Pago */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, rotateY: -5 }}
            className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-neon transition-all duration-300 relative overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <motion.div 
              className="flex items-center gap-3 mb-6 relative z-10"
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-neon to-orange-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <CreditCard className="w-6 h-6 text-black" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gold">Pagos</h3>
            </motion.div>
            <p className="text-gray-400 text-sm mb-4 relative z-10">Aceptamos:</p>
            <div className="space-y-4 relative z-10">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    x: 10, 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255, 153, 0, 0.3)"
                  }}
                  className="flex items-center gap-3 p-3 bg-black rounded-lg border border-zinc-800 hover:border-neon transition-all cursor-pointer"
                >
                  <motion.div 
                    className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center`}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <method.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-white font-semibold">{method.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
