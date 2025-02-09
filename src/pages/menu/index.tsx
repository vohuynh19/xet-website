import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Navigation from "@/components/Navigation";

enum Category {
  "Wine" = "Wine",
  "Appertizer" = "Appertizer",
  "Pasta" = "Pasta",
  "Steak" = "Steak",
  "Seafood" = "Seafood",
  "Salad" = "Salad",
  "Drink" = "Drink",
  "Dessert" = "Dessert",
}

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavBackground, setShowNavBackground] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavBackground(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuImages = [
    { src: "/menu/menu/1.png", category: "None" },
    { src: "/menu/menu/2.png", category: Category.Wine },
    { src: "/menu/menu/3.png", category: "None" },
    { src: "/menu/menu/4.png", category: Category.Appertizer },
    { src: "/menu/menu/5.png", category: Category.Appertizer },
    { src: "/menu/menu/6.png", category: Category.Seafood },
    { src: "/menu/menu/7.png", category: Category.Salad },
    { src: "/menu/menu/8.png", category: Category.Pasta },
    { src: "/menu/menu/9.png", category: Category.Pasta },
    { src: "/menu/menu/10.png", category: Category.Pasta },
    { src: "/menu/menu/11.png", category: Category.Pasta },
    { src: "/menu/menu/12.png", category: "None" },
    { src: "/menu/menu/13.png", category: Category.Steak },
    { src: "/menu/menu/14.png", category: Category.Drink },
    { src: "/menu/menu/15.png", category: Category.Drink },
    { src: "/menu/menu/16.png", category: Category.Drink },
    { src: "/menu/menu/17.png", category: Category.Dessert },
    { src: "/menu/menu/18.png", category: Category.Dessert },
  ];

  const categories = Object.values(Category);

  const filteredImages =
    activeCategory === "All"
      ? menuImages
      : menuImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <Head>
        <title>XET. Menu</title>
        <meta name="description" content="XET. Menu" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>

      <Navigation
        isMenuOpen={isMenuOpen}
        showNavBackground={showNavBackground}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      <main className="pt-24 px-4 md:px-8 min-h-screen bg-gradient-to-b from-black to-gray-900">
        <div className="mb-8 flex justify-center space-x-4">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-white border ${
                activeCategory === category
                  ? "border-white bg-white/10"
                  : "border-white/20"
              } rounded-full hover:bg-white/10 transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {filteredImages.map((img, index) => (
            <div
              key={img.src}
              onClick={() => setSelectedImage(img.src)}
              className="relative aspect-[3/4] group overflow-hidden cursor-pointer"
              style={{
                opacity: 0,
                animation: `fadeIn 0.6s ease-out ${index * 0.2}s forwards`,
                transform: `translateY(${Math.sin(index) * 20}px)`,
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
              <Image
                src={img.src}
                alt={`Menu page ${index + 1}`}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </main>

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
