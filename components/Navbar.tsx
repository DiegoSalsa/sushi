"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-zinc-800 z-[100]"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Nombre */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-neon to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-2xl">🍣</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="text-gold">Sushi</span>{" "}
                <span className="text-neon">Demo</span>
              </h1>
              <p className="text-xs text-gray-400">Tu marca aquí</p>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("menu")}
              className="text-gray-300 hover:text-neon transition-colors font-semibold"
            >
              Menú
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-gray-300 hover:text-neon transition-colors font-semibold"
            >
              Cómo Funciona
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-300 hover:text-neon transition-colors font-semibold"
            >
              FAQ
            </button>
            
            {/* Cart Button */}
            {cartCount > 0 && (
              <button
                onClick={onCartClick}
                className="relative bg-neon hover:bg-orange-600 text-black px-4 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-gold text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
                Carrito
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-zinc-800"
          >
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("menu")}
                className="text-left text-gray-300 hover:text-neon transition-colors font-semibold py-2"
              >
                Menú
              </button>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="text-left text-gray-300 hover:text-neon transition-colors font-semibold py-2"
              >
                Cómo Funciona
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left text-gray-300 hover:text-neon transition-colors font-semibold py-2"
              >
                FAQ
              </button>
              {cartCount > 0 && (
                <button
                  onClick={() => {
                    onCartClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-neon hover:bg-orange-600 text-black px-4 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-between"
                >
                  <span>Ver Carrito</span>
                  <span className="bg-gold text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    {cartCount}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
