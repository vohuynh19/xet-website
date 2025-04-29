import { useState, useEffect } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import MenuGrid, { MenuItem } from "@/components/MenuGrid";

enum Category {
  "PAX2" = "2 Pax",
}

export default function SetMenus() {
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
    { src: "/menu/set-menu/1.png", category: "NONE" },
    { src: "/menu/set-menu/2.png", category: Category.PAX2 },
    { src: "/menu/set-menu/3.png", category: Category.PAX2 },
    { src: "/menu/set-menu/4.png", category: Category.PAX2 },
    { src: "/menu/set-menu/5.png", category: Category.PAX2 },
    { src: "/menu/set-menu/6.png", category: Category.PAX2 },
    { src: "/menu/set-menu/7.png", category: Category.PAX2 },
    { src: "/menu/set-menu/8.png", category: Category.PAX2 },
    { src: "/menu/set-menu/9.png", category: Category.PAX2 },
    { src: "/menu/set-menu/10.png", category: Category.PAX2 },
  ];

  const categories = Object.values(Category);

  return (
    <>
      <Head>
        <title>XET. Set Menus | Special Set Course Menus in Phan Thiet</title>
        <meta
          name="description"
          content="Discover our carefully curated set menus featuring lunch, dinner, and special course options. Experience a complete dining journey at XET. Dine & Wine."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="XET set menu, Phan Thiet set course, lunch set, dinner set, special course menu"
        />
        <meta
          property="og:title"
          content="XET. Set Menus | Special Set Course Menus in Phan Thiet"
        />
        <meta
          property="og:description"
          content="Discover our carefully curated set menus featuring lunch, dinner, and special course options. Experience a complete dining journey at XET. Dine & Wine."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/menu.JPG" />
        <meta property="og:url" content="https://www.xetpasta.com/set-menus" />
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
