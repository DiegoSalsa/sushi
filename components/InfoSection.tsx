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
        <div className="grid md:grid-cols-3 gap-8">
          {/* Horarios */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-neon transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-neon to-orange-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gold">Horarios</h3>
            </div>
            <div className="space-y-3">
              {schedules.map((schedule, index) => (
                <div key={index} className="border-l-2 border-neon pl-4">
                  <p className="font-semibold text-white">{schedule.day}</p>
                  <p className="text-gray-400 text-sm">{schedule.hours}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cobertura */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-neon transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-neon to-orange-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gold">Cobertura</h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm mb-3">Hacemos delivery en:</p>
              <div className="grid grid-cols-2 gap-2">
                {deliveryZones.map((zone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-2 h-2 bg-neon rounded-full"></div>
                    <span className="text-gray-300">{zone}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Formas de Pago */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-neon transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-neon to-orange-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gold">Pagos</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Aceptamos:</p>
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 bg-black rounded-lg border border-zinc-800 hover:border-neon transition-all"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center`}>
                    <method.icon className="w-5 h-5 text-white" />
                  </div>
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
