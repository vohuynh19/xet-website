import { useState, useEffect } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import MenuGrid, { MenuItem } from "@/components/MenuGrid";

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

  useEffect(() => {
    const handleScroll = () => {
      setShowNavBackground(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuImages: MenuItem[] = [
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

  return (
    <>
      <Head>
        <title>XET. Menu | Asian Fusion Restaurant Menu in Phan Thiet</title>
        <meta
          name="description"
          content="Explore our diverse menu featuring premium steaks, Asian-inspired pasta, fresh seafood, and fine wines. Experience the perfect fusion of Eastern and Western flavors at XET. Dine & Wine."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="XET menu, Phan Thiet restaurant menu, Asian fusion cuisine, steakhouse menu, wine selection, pasta dishes, seafood menu"
        />
        <meta
          property="og:title"
          content="XET. Menu | Asian Fusion Restaurant Menu in Phan Thiet"
        />
        <meta
          property="og:description"
          content="Explore our diverse menu featuring premium steaks, Asian-inspired pasta, fresh seafood, and fine wines. Experience the perfect fusion of Eastern and Western flavors at XET. Dine & Wine."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/menu.JPG" />
        <meta property="og:url" content="https://xet.restaurant/menu" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="XET. Menu | Asian Fusion Restaurant Menu in Phan Thiet"
        />
        <meta
          name="twitter:description"
          content="Explore our diverse menu featuring premium steaks, Asian-inspired pasta, fresh seafood, and fine wines. Experience the perfect fusion of Eastern and Western flavors at XET. Dine & Wine."
        />
        <meta name="twitter:image" content="/images/menu.JPG" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Menu",
            name: "XET. Restaurant Menu",
            description:
              "Our diverse menu features a perfect fusion of Asian and Western flavors",
            hasMenuSection: [
              {
                "@type": "MenuSection",
                name: "Wine",
                description: "Fine wine selection",
              },
              {
                "@type": "MenuSection",
                name: "Appetizers",
                description: "Starter dishes",
              },
              {
                "@type": "MenuSection",
                name: "Pasta",
                description: "Asian-inspired pasta dishes",
              },
              {
                "@type": "MenuSection",
                name: "Steak",
                description: "Premium quality steaks",
              },
              {
                "@type": "MenuSection",
                name: "Seafood",
                description: "Fresh seafood selection",
              },
            ],
          })}
        </script>
      </Head>

      <Navigation
        isMenuOpen={isMenuOpen}
        showNavBackground={showNavBackground}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      <main className="pt-24 pb-24 min-h-screen">
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
