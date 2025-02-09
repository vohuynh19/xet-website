import { useState, useEffect } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import MenuGrid, { MenuItem } from "@/components/MenuGrid";

enum Category {
  "Valentine" = "Valentine",
}

export default function ValentineMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavBackground, setShowNavBackground] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      setShowNavBackground(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuImages: MenuItem[] = [
    { src: "/menu/set-valentine-menu/1.png", category: Category.Valentine },
    { src: "/menu/set-valentine-menu/2.png", category: Category.Valentine },
    { src: "/menu/set-valentine-menu/3.png", category: Category.Valentine },
    { src: "/menu/set-valentine-menu/4.png", category: Category.Valentine },
  ];

  const categories = Object.values(Category);

  return (
    <>
      <Head>
        <title>
          {`XET. Valentine Set Menu | Special Valentine's Day Menu in Phan Thiet`}
        </title>
        <meta
          name="description"
          content="Celebrate love with our exclusive Valentine's Day set menu. Experience a romantic dining journey with specially curated courses at XET. Dine & Wine."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="XET Valentine menu, Phan Thiet Valentine dinner, romantic dining, special Valentine set, couple's menu"
        />
        <meta
          property="og:title"
          content="XET. Valentine Set Menu | Special Valentine's Day Menu in Phan Thiet"
        />
        <meta
          property="og:description"
          content="Celebrate love with our exclusive Valentine's Day set menu. Experience a romantic dining journey with specially curated courses at XET. Dine & Wine."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/menu.JPG" />
        <meta
          property="og:url"
          content="https://xet.restaurant/set-valentine-menu"
        />
      </Head>

      <Navigation
        isMenuOpen={isMenuOpen}
        showNavBackground={showNavBackground}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      <main className="pt-24 pb-24 min-h-screen bg-black">
        <div className="px-4 md:px-8">
          <MenuGrid
            menuImages={menuImages}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </main>
    </>
  );
}
