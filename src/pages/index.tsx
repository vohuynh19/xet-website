import { placeholder0, placeholder1, placeholder2 } from "@/constants";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Banner from "@/components/Banner";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";

const bannerImages = ["/images/0.JPG", "/images/1.JPG", "/images/2.JPG"];
const placeholders = [placeholder0, placeholder1, placeholder2];

const footerImages = [
  "/images/space-5.JPG",
  "/images/space-1.JPG",
  "/images/space-2.JPG",
  "/images/space-6.JPG",
];

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavBackground, setShowNavBackground] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleCloseBanner = () => {
    setShowBanner(false);
    localStorage.setItem("showBanner", "false");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setShowNavBackground(false);
        setLastScrollY(currentScrollY);
      } else {
        setShowNavBackground(
          (currentScrollY < lastScrollY && currentScrollY > 50) ||
            currentScrollY === 0
        );
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-[#F1E2D1]">
      <Banner showBanner={showBanner} onClose={handleCloseBanner} />
      <Navigation
        isMenuOpen={isMenuOpen}
        showNavBackground={showNavBackground}
        toggleMenu={toggleMenu}
      />
      <Hero
        bannerImages={bannerImages}
        currentImageIndex={currentImageIndex}
        placeholders={placeholders}
      />
      <About />
      <Footer footerImages={footerImages} />
    </div>
  );
}
