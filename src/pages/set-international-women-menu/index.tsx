import { useState, useEffect } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import MenuGrid, { MenuItem } from "@/components/MenuGrid";

enum Category {
  "InternationalWomen" = "Women's Day Set",
}

export default function InternationalWomenMenu() {
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
    {
      src: "/menu/set-international-women-menu/1.png",
      category: Category.InternationalWomen,
    },
    {
      src: "/menu/set-international-women-menu/2.png",
      category: Category.InternationalWomen,
    },
    {
      src: "/menu/set-international-women-menu/3.png",
      category: Category.InternationalWomen,
    },
    {
      src: "/menu/set-international-women-menu/4.png",
      category: Category.InternationalWomen,
    },
  ];

  const categories = Object.values(Category);

  return (
    <>
      <Head>
        <title>
          {`XET. International Women's Day Menu | Special Set Menu in Phan Thiet`}
        </title>
        <meta
          name="description"
          content="Celebrate International Women's Day with our exclusive set menu. Experience an elegant dining journey with specially curated courses at XET. Dine & Wine."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="XET International Women's Day menu, Phan Thiet special dinner, women's day celebration, special set menu, celebration dining"
        />
        <meta
          property="og:title"
          content="XET. International Women's Day Menu | Special Set Menu in Phan Thiet"
        />
        <meta
          property="og:description"
          content="Celebrate International Women's Day with our exclusive set menu. Experience an elegant dining journey with specially curated courses at XET. Dine & Wine."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/menu.JPG" />
        <meta
          property="og:url"
          content="https://www.xetpasta.com/set-international-women-menu"
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
