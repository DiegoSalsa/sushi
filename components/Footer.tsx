"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Cliente Satisfecho",
    rating: 5,
    text: "¡Excelente sushi! Los rolls son frescos y el sabor es increíble. Muy recomendado.",
  },
  {
    name: "Usuario Demo",
    rating: 5,
    text: "El mejor sushi sin duda. Rápida entrega y todo delicioso.",
  },
  {
    name: "Cliente Feliz",
    rating: 5,
    text: "Calidad premium a buen precio. Siempre vuelvo a pedir.",
  },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Info Section */}
          <div>
            <h3 className="text-2xl font-bold text-neon mb-6">Sushi Demo</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neon flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300 font-semibold">Ubicación</p>
                  <p className="text-gray-400 text-sm">
                    Tu Dirección Aquí<br />
                    Tu Ciudad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-neon flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300 font-semibold">Horarios</p>
                  <p className="text-gray-400 text-sm">
                    Lunes a Domingo<br />
                    12:00 - 23:00 hrs
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Consulta disponibilidad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-neon flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300 font-semibold">Pedidos</p>
                  <a 
                    href="https://wa.me/56912345678" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-sm font-mono transition-colors"
                  >
                    +56 9 1234 5678
                  </a>
                  <p className="text-gray-500 text-xs mt-1">Delivery: $1.000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-4">Encuéntranos</h4>
            <div className="rounded-xl overflow-hidden border-2 border-zinc-800 h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.892822344056!2d-73.12124292346468!3d-36.74938917996935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b6da7f777777%3A0x888888888888888!2sLos%20Casta%C3%B1os%2031%2C%20Talcahuano%2C%20B%C3%ADo%20B%C3%ADo!5e0!3m2!1ses!2scl!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Demo"
              />
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-neon hover:text-orange-600 text-sm font-semibold transition-colors"
            >
              Ver en Google Maps →
            </a>
          </div>

          {/* Reviews */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-4">Reseñas</h4>
            <div className="space-y-4">
              {REVIEWS.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm font-semibold">
                      {review.name}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {review.text}
                  </p>
                </motion.div>
              ))}
            </div>
            <a
              href="https://maps.app.goo.gl/N3ApbHgBPMZdFuwV6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-gray-400 hover:text-neon transition-colors"
            >
              Ver más reseñas en Google →
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Sushi Demo. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#25D366] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
