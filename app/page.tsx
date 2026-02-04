"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ShoppingCart } from "lucide-react";
import Menu from "@/components/Menu";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import DemoBanner from "@/components/DemoBanner";
import PromoBanner from "@/components/PromoBanner";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ColorSelector from "@/components/ColorSelector";

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
    <main className="min-h-screen bg-background">
      {/* Demo Banner */}
      <DemoBanner />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.pixabay.com/video/2022/03/23/111912-691903284_large.mp4" type="video/mp4" />
            {/* Fallback image */}
            <img
              src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2127&auto=format&fit=crop"
              alt="Sushi Background"
              className="w-full h-full object-cover"
            />
          </video>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
              <span className="text-gold">Sushi</span>{" "}
              <span className="text-neon">Demo</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              El Mejor Sushi, directo a tu casa
            </p>
            <button
              onClick={scrollToMenu}
              className="bg-neon hover:bg-orange-600 text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-neon/50"
            >
              Pedir Ahora
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-neon" />
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-4">
        <Menu addToCart={addToCart} />
      </section>

      {/* How It Works */}
      <HowItWorks />

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
          className="fixed bottom-6 right-6 bg-neon hover:bg-orange-600 text-black p-4 rounded-full shadow-2xl z-50 transition-all duration-300 transform hover:scale-110"
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

      {/* Color Selector */}
      <ColorSelector />
    </main>
  );
}
