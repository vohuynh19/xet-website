import { useEffect, useState } from "react";

interface FilterModalProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onClose: () => void;
}

export default function FilterModal({
  categories,
  activeCategory,
  onCategoryChange,
  onClose,
}: FilterModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleCategoryChange = (category: string) => {
    setIsClosing(true);
    setTimeout(() => {
      onCategoryChange(category);
      onClose();
    }, 300);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[1001] flex items-end justify-center w-full"
      onClick={handleClose}
    >
      <div
        className={`bg-gray-900 rounded-t-2xl p-6 w-full h-[80vh] transform transition-all duration-300 ${
          isClosing ? "translate-y-full" : "translate-y-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-900 pb-6">
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto" />
        </div>
        <div className="space-y-4 overflow-y-auto h-full pt-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
          <button
            onClick={() => handleCategoryChange("All")}
            className={`w-full px-6 py-3 text-white text-left transition-colors ${
              activeCategory === "All" ? "bg-white/20" : "hover:bg-white/10"
            } rounded-xl`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full px-6 py-3 text-white text-left transition-colors ${
                activeCategory === category
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              } rounded-xl`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }

        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
