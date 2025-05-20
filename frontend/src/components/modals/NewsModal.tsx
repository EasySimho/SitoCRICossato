import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NewsModal = ({ news, onClose }) => {
  // Chiudi con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Blocca propagazione click all'interno */}
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header con bottone di chiusura */}
          <div className="relative">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-3xl font-light hover:text-red-400"
              aria-label="Chiudi"
            >
              &times;
            </button>
          </div>

          {/* Contenuto scrollabile */}
          <div className="p-6 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-2">{news.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(news.date).toLocaleDateString()}
            </p>
            <div className="text-gray-800 whitespace-pre-line">
              {news.content}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsModal;
