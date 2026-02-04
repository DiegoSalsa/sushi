"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import DemoBanner from "@/components/DemoBanner";
import PromoBanner from "@/components/PromoBanner";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ColorSelector from "@/components/ColorSelector";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";
import InfoSection from "@/components/InfoSection";
import WhatsAppButton from "@/components/WhatsAppButton";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: {
    protein?: string;
    veggies?: string[];
    wrapper?: string;
  };
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && JSON.stringify(i.customizations) === JSON.stringify(item.customizations)
      );
      
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && JSON.stringify(i.customizations) === JSON.stringify(item.customizations)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      return [...prev, item];
    });
    
    // Show toast notification
    setToastMessage(`✓ ${item.name} agregado al carrito`);
    setShowToast(true);
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((_, i) => i !== index));
    } else {
      setCart((prev) =>
        prev.map((item, i) => (i === index ? { ...item, quantity } : item))
      );
    }
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background pt-20 overflow-x-hidden max-w-full">
      {/* Navbar */}
      <Navbar cartCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Demo Banner */}
      <DemoBanner />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden max-w-full">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neon rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Background Image with Overlay */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2127&auto=format&fit=crop"
            alt="Sushi Background"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.span 
                className="text-gold inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.5)",
                    "0 0 40px rgba(255, 215, 0, 0.8)",
                    "0 0 20px rgba(255, 215, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Sushi
              </motion.span>{" "}
              <motion.span 
                className="text-neon inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(255, 153, 0, 0.5)",
                    "0 0 40px rgba(255, 153, 0, 0.8)",
                    "0 0 20px rgba(255, 153, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                Demo
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              El Mejor Sushi, directo a tu casa
            </motion.p>
            
            <motion.button
              onClick={scrollToMenu}
              className="relative bg-neon hover:bg-orange-600 text-black font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 153, 0, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Pedir Ahora</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-neon drop-shadow-[0_0_10px_rgba(255,153,0,0.8)]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-4 overflow-x-hidden max-w-full">
        <Menu addToCart={addToCart} />
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Stats */}
      <Stats />

      {/* Info Section - Horarios, Cobertura, Pagos */}
      <InfoSection />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Floating Cart Button */}
      {cartItemsCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          key={cartItemsCount}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-neon hover:bg-orange-600 text-black p-3 sm:p-4 rounded-full shadow-2xl z-50 transition-all duration-300 transform hover:scale-110"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="w-6 h-6" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-2 -right-2 bg-gold text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
          >
            {cartItemsCount}
          </motion.span>
        </motion.button>
      )}

      {/* Cart Modal */}
      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        updateQuantity={updateQuantity}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* WhatsApp Button */}
      <WhatsAppButton isCartOpen={isCartOpen} />

      {/* Color Selector */}
      <ColorSelector isCartOpen={isCartOpen} />
    </main>
  );
}
