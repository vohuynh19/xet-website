import { useState, lazy, Suspense, useMemo } from "react";
import Image from "next/image";

export interface MenuItem {
  src: string;
  category: string;
}

interface MenuGridProps {
  menuImages: MenuItem[];
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterModal = lazy(() => import("./FilterModal"));

export default function MenuGrid({
  menuImages,
  categories,
  activeCategory,
  onCategoryChange,
}: MenuGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Memoize filtered images to prevent unnecessary recalculations
  const filteredImages = useMemo(
    () =>
      activeCategory === "All"
        ? menuImages
        : menuImages.filter((img) => img.category === activeCategory),
    [menuImages, activeCategory]
  );

  return (
    <>
      <div className="mt-8 mb-8 px-4 xl:px-0 relative">
        {/* Desktop filter */}
        <div className="hidden xl:flex justify-center space-x-4 overflow-x-auto px-4 py-4 scrollbar-hide">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-shrink-0 px-6 py-2 text-white border whitespace-nowrap transform transition-all duration-300 ${
                activeCategory === category
                  ? "border-white bg-white/10 scale-105"
                  : "border-white/20 hover:border-white/60"
              } rounded-full hover:bg-white/10`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile filter button */}
        <div className="xl:hidden w-full">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full px-6 py-3 text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-between"
          >
            <span>{activeCategory}</span>
            <span>▼</span>
          </button>
        </div>

        {/* Mobile filter modal with code splitting */}
        <Suspense fallback={null}>
          {isFilterOpen && (
            <FilterModal
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={onCategoryChange}
              onClose={() => setIsFilterOpen(false)}
            />
          )}
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {filteredImages.map((img, index) => (
          <div
            key={img.src}
            onClick={() => setSelectedImage(img.src)}
            className="relative aspect-[3/4] group overflow-hidden cursor-pointer transform transition-all duration-500"
          >
            <div className="absolute inset-0 group-hover:bg-black/40 transition-colors z-10" />
            <Image
              src={img.src}
              alt={`Menu page ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[10000] flex items-center justify-center cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={selectedImage}
              alt="Selected menu item"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
