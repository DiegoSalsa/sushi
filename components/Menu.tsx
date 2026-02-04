"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Search, Heart } from "lucide-react";
import RollBuilder from "./RollBuilder";
import ProductDetail from "./ProductDetail";
import type { CartItem } from "@/app/page";

interface MenuProps {
  addToCart: (item: CartItem) => void;
}

const MENU_CATEGORIES = {
  handRolls: {
    title: "Hand Rolls",
    items: [
      {
        id: "hand-roll",
        name: "Hand Roll",
        price: 4000,
        description: "1 unidad personalizable",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=500&auto=format&fit=crop",
        customizable: true,
        badge: "MÁS VENDIDO",
      },
      {
        id: "hand-roll-xl",
        name: "Hand Roll XL",
        price: 5000,
        description: "1 unidad XL personalizable",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500&auto=format&fit=crop",
        customizable: true,
      },
      {
        id: "hand-roll-3",
        name: "Hand Roll x3",
        price: 10500,
        description: "3 unidades a elección",
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
    ],
  },
  clasicos: {
    title: "Clásicos",
    items: [
      {
        id: "bowl-gohan",
        name: "Bowl Gohan",
        price: 8000,
        description: "Base de arroz + 5 rellenos (dos proteínas)",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop",
        customizable: false,
        badge: "NUEVO",
      },
      {
        id: "roll-individual",
        name: "Roll Individual",
        price: 8000,
        description: "6 piezas - Cobertura + 3 rellenos (1 proteína y 2 vegetales)",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
      {
        id: "roll-pareja",
        name: "Roll en Pareja",
        price: 9500,
        description: "16 piezas - 2 rolls a elección",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=500&auto=format&fit=crop",
        customizable: false,
        badge: "MÁS VENDIDO",
      },
      {
        id: "hosomaki",
        name: "Hosomaki",
        price: 3000,
        description: "8 piezas - 2 rellenos",
        image: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
      {
        id: "nigiri",
        name: "Nigiri",
        price: 2500,
        description: "2 piezas - Salmón o Camarón",
        image: "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
    ],
  },
  especiales: {
    title: "Especiales",
    items: [
      {
        id: "roll-acevichado",
        name: "Roll Acevichado",
        price: 8000,
        description: "16 piezas - Cobertura + 3 rellenos (1 proteína y 2 vegetales) + salsa acevichada",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500&auto=format&fit=crop",
        customizable: false,
        badge: "MÁS VENDIDO",
      },
      {
        id: "ceviche-premium",
        name: "Ceviche Premium",
        price: 9000,
        description: "500gr - Base de camarón, salmón + palta, cebolla morada, pimentón, cilantro y limón",
        image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=500&auto=format&fit=crop",
        customizable: false,
        badge: "NUEVO",
      },
      {
        id: "sushi-burger",
        name: "Sushi Burger",
        price: 7000,
        description: "1 proteína + 2 vegetales",
        image: "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?q=80&w=500&auto=format&fit=crop",
        customizable: false,
        badge: "NUEVO",
      },
      {
        id: "la-yegueta",
        name: "La Yegüeta",
        price: 13500,
        description: "24 piezas - Roll envuelto en queso crema con relleno palta, cebollín y pollo",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
    ],
  },
  promos: {
    title: "Promos & Combos",
    items: [
      {
        id: "promo-clasica-1",
        name: "Promo Clásica 1",
        price: 17000,
        description: "32 piezas mixtas variadas (4 rolls diferentes)",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500&auto=format&fit=crop",
        customizable: false,
        badge: "MÁS VENDIDO",
      },
      {
        id: "promo-clasica-2",
        name: "Promo Clásica 2",
        price: 16500,
        description: "30 piezas mixtas a elección del chef",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
      {
        id: "promo-clasica-3",
        name: "Promo Clásica 3",
        price: 16500,
        description: "40 piezas fritas variadas (5 rolls diferentes)",
        image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
      {
        id: "promo-clasica-4",
        name: "Promo Clásica 4",
        price: 19000,
        description: "50 piezas mixtas a elección del chef - 1 proteína y dos vegetales por roll",
        image: "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
      {
        id: "promo-especial-1",
        name: "Promo Especial 1",
        price: 18500,
        description: "40 piezas - Roll apanado en salsa, roll marino y roll apanado (6 piezas). Roll panko en queso crema",
        image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
      {
        id: "promo-especial-2",
        name: "Promo Especial 2",
        price: 22500,
        description: "50 piezas - A la Promo Especial 1 se agrega Snack Pollo (6 unidades) + Porción arrollados (6 unidades)",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
      {
        id: "promo-especial-3",
        name: "Promo Especial 3",
        price: 25500,
        description: "70 piezas - 32 piezas de rolls (4 rolls) + 24 piezas de hosomaki (3 hosomaki) + Snack (6 unidades) + Arrollado primavera (6 unidades) + Niguri (2 piezas)",
        image: "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
      {
        id: "pack-botanas",
        name: "Pack Botanas",
        price: 19500,
        description: "30 piezas - Roll envuelto en palta + roll especial + salsa + 8 arrollados",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=500&auto=format&fit=crop",
        customizable: false,
      },
    ],
  },
};

export default function Menu({ addToCart }: MenuProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [detailItem, setDetailItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleQuickAdd = (item: any) => {
    if (item.customizable) {
      setSelectedItem(item);
    } else {
      setDetailItem(item);
    }
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  // Filter categories based on active filter
  const filteredCategories = activeFilter === "all" 
    ? Object.entries(MENU_CATEGORIES)
    : Object.entries(MENU_CATEGORIES).filter(([key]) => key === activeFilter);

  // Filter by search query
  const searchFilteredCategories = filteredCategories.map(([key, category]: [string, any]) => {
    if (!searchQuery) return [key, category];
    
    const filteredItems = category.items.filter((item: any) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return [key, { ...category, items: filteredItems }];
  }).filter(([_, category]: any) => category.items.length > 0);

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center mb-12"
      >
        Nuestro <span className="text-neon">Menú</span>
      </motion.h2>

      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-neon transition-colors"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          {[
            { key: "all", label: "Todos" },
            { key: "handRolls", label: "Hand Rolls" },
            { key: "clasicos", label: "Clásicos" },
            { key: "especiales", label: "Especiales" },
            { key: "promos", label: "Promos" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-neon text-black shadow-lg"
                  : "bg-zinc-900 text-gray-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {searchFilteredCategories.map(([key, category]: any) => (
        <section key={key}>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-white border-l-4 border-neon pl-4"
          >
            {category.title}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  rotateY: 2,
                  transition: { duration: 0.3 }
                }}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-neon/50 transition-all duration-300 card-glow hover:card-glow-hover relative group"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                  initial={false}
                />
                
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                  
                  {/* Badge with shimmer effect */}
                  {item.badge && (
                    <motion.div 
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg overflow-hidden ${
                        item.badge === "NUEVO" 
                          ? "bg-green-500 text-white" 
                          : "bg-gold text-black"
                      }`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="relative z-10">{item.badge}</span>
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 1
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Favorite Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute top-3 left-3 p-2 backdrop-blur-sm rounded-full transition-all duration-300 ${
                      favorites.has(item.id)
                        ? "bg-red-500 shadow-lg shadow-red-500/50"
                        : "bg-black/50 hover:bg-black/70"
                    }`}
                  >
                    <motion.div
                      animate={favorites.has(item.id) ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          favorites.has(item.id)
                            ? "fill-red-500 text-white"
                            : "text-white"
                        }`}
                      />
                    </motion.div>
                  </motion.button>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-400 mb-4 text-sm line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gold">
                      ${item.price.toLocaleString("es-CL")}
                    </span>
                    {item.customizable ? (
                      <button
                        onClick={() => handleQuickAdd(item)}
                        className="bg-neon hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        Personalizar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleQuickAdd(item)}
                        className="bg-neon hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        <Eye className="w-5 h-5" />
                        Ver
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}

      {/* Roll Builder Modal */}
      {selectedItem && selectedItem.customizable && (
        <RollBuilder
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Product Detail Modal */}
      {detailItem && !detailItem.customizable && (
        <ProductDetail
          item={detailItem}
          isOpen={!!detailItem}
          onClose={() => setDetailItem(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}
