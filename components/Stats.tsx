"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Star, Package, Award } from "lucide-react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: 500,
      suffix: "+",
      label: "Clientes Satisfechos"
    },
    {
      icon: Package,
      value: 50,
      suffix: "+",
      label: "Rolls Diferentes"
    },
    {
      icon: Star,
      value: 4.8,
      suffix: "",
      label: "Rating Promedio"
    },
    {
      icon: Award,
      value: 3,
      suffix: "",
      label: "Años de Experiencia"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-zinc-950 to-black border-y border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-neon to-orange-600 rounded-full mb-3 md:mb-4">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-neon mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-400 text-sm md:text-base font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
