"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import RollBuilder from "./RollBuilder";
import ProductDetail from "./ProductDetail";
import type { CartItem } from "@/app/page";

interface MenuProps {
  addToCart: (item: CartItem) => void;
}

const MENU_ITEMS = [
  {
    id: "hand-roll",
    name: "Hand Roll",
    price: 4000,
    description: "1 unidad personalizable",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=500&auto=format&fit=crop",
    customizable: true,
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
  {
    id: "bowl-gohan",
    name: "Bowl Gohan",
    price: 8000,
    description: "Base de arroz + 5 rellenos (dos proteínas)",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop",
    customizable: false,
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
  {
    id: "roll-acevichado",
    name: "Roll Acevichado",
    price: 8000,
    description: "16 piezas - Cobertura + 3 rellenos (1 proteína y 2 vegetales) + salsa acevichada",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500&auto=format&fit=crop",
    customizable: false,
  },
  {
    id: "ceviche-saian",
    name: "Ceviche Saian",
    price: 9000,
    description: "500gr - Base de camarón, salmón + palta, cebolla morada, pimentón, cilantro y limón",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=500&auto=format&fit=crop",
    customizable: false,
  },
  {
    id: "sushi-burger",
    name: "Sushi Burger",
    price: 7000,
    description: "1 proteína + 2 vegetales",
    image: "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?q=80&w=500&auto=format&fit=crop",
    customizable: false,
  },
  {
    id: "promo-clasica-1",
    name: "Promo Clásica 1",
    price: 17000,
    description: "32 piezas mixtas a elección (4 rolls)",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500&auto=format&fit=crop",
    customizable: false,
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
    description: "40 piezas fritas a elección (5 rolls)",
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
    id: "promo-saian-1",
    name: "Promo Super Saian 1",
    price: 18500,
    description: "40 piezas - Roll apanado en salsa, roll marino y roll apanado (6 piezas). Roll panko en queso crema",
    image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=500&auto=format&fit=crop",
    customizable: false,
  },
  {
    id: "promo-super-saian-2",
    name: "Promo Super Saian 2",
    price: 22500,
    description: "50 piezas - A la promo Super Saian 1 se agrega Snack Pollo (6 unidades) + Porción arrollados (6 unidades)",
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=500&auto=format&fit=crop",
    customizable: false,
  },
  {
    id: "promo-super-saian-3",
    name: "Promo Super Saian 3",
    price: 25500,
    description: "70 piezas - 32 piezas de rolls (4 rolls) + 24 piezas de hosomaki (3 hosomaki) + Snack (6 unidades) + Arrollado primavera (6 unidades) + Niguri (2 piezas)",
    image: "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?q=80&w=500&auto=format&fit=crop",
    customizable: false,
  },
  {
    id: "la-yegueta",
    name: "La Yegüeta",
    price: 13500,
    description: "24 piezas - Roll envuelto en queso crema con relleno palta, cebollín y pollo",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500&auto=format&fit=crop",
    customizable: false,
  },
  {
    id: "pack-botanas",
    name: "Pack Botanas",
    price: 19500,
    description: "30 piezas - Roll envuelto en palta + roll a elección + salsa + 8 arrollados",
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=500&auto=format&fit=crop",
    customizable: false,
  },
];

export default function Menu({ addToCart }: MenuProps) {
  const [selectedItem, setSelectedItem] = useState<typeof MENU_ITEMS[0] | null>(null);
  const [detailItem, setDetailItem] = useState<typeof MENU_ITEMS[0] | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center mb-12"
      >
        Nuestro <span className="text-neon">Menú</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MENU_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-neon/50 transition-all duration-300 card-glow hover:card-glow-hover"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-400 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gold">
                  ${item.price.toLocaleString("es-CL")}
                </span>
                {item.customizable ? (
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="bg-neon hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Personalizar
                  </button>
                ) : (
                  <button
                    onClick={() => setDetailItem(item)}
                    className="bg-neon hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    Ver Detalle
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
