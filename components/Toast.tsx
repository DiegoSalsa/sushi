"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: "success" | "error";
}

export default function Toast({ message, isVisible, onClose, type = "success" }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-4 right-4 z-[200] max-w-sm"
        >
          <div className={`rounded-xl shadow-2xl border-2 p-4 flex items-center gap-3 ${
            type === "success" 
              ? "bg-zinc-900 border-neon text-white" 
              : "bg-red-500 border-red-700 text-white"
          }`}>
            <div className={`rounded-full p-1 ${
              type === "success" ? "bg-neon" : "bg-white"
            }`}>
              <Check className={`w-5 h-5 ${
                type === "success" ? "text-black" : "text-red-500"
              }`} />
            </div>
            <p className="font-semibold flex-1">{message}</p>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
