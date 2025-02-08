import { placeholder0, placeholder1, placeholder2 } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
      {/* Notification Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-black/50 text-[#D2B48C] py-1.5 md:py-2 px-3 md:px-4 text-center text-xs md:text-sm z-50 flex items-center justify-between backdrop-blur-sm">
          <div className="flex-1 max-w-[40px]" />
          <div className="flex-1 text-center">
            NOW OPEN | EVERYDAY FROM 07:00 AM TO 10:00 PM
          </div>
          <div className="flex-1 flex justify-end max-w-[40px]">
            <button
              onClick={handleCloseBanner}
              className="text-[#D2B48C] hover:text-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1001] flex justify-between items-center px-4 md:px-8 py-4 transition-all duration-300 ${
          showNavBackground && !isMenuOpen ? "bg-black/50 backdrop-blur-sm" : ""
        }`}
      >
        <button
          className={`hidden md:block text-white border border-white px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-full hover:bg-white hover:text-black transition-colors transform transition-transform duration-300 ${
            isMenuOpen
              ? "opacity-0 -translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          BOOK NOW
        </button>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/logo.png"
              alt="XET. Logo"
              width={120}
              height={48}
              className="object-contain"
            />
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          className="text-white hover:text-gray-300 transition-colors relative w-8 h-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center text-white transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 -z-10 opacity-40">
          <Image
            src="/images/menu.JPG"
            alt="Menu background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center space-y-6">
          <a
            href="#"
            className="block text-2xl hover:text-gray-300 transition-colors"
          >
            MENU
          </a>
          <a
            href="#"
            className="block text-2xl hover:text-gray-300 transition-colors"
          >
            SET MENUS
          </a>
          <a
            href="#"
            className="block text-2xl hover:text-gray-300 transition-colors"
          >
            OUR SPACES
          </a>
          <a
            href="#"
            className="block text-2xl hover:text-gray-300 transition-colors"
          >
            GALLERY
          </a>
          <a
            href="#"
            className="block text-2xl hover:text-gray-300 transition-colors"
          >
            CONTACT
          </a>

          <div
            style={{
              height: 24,
            }}
          ></div>

          <button className="border border-white px-8 py-3 text-lg rounded-full hover:bg-white hover:text-black transition-colors">
            BOOK NOW
          </button>
        </div>
      </div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black/70 text-white overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`XET. ambiance ${index + 1}`}
              fill
              className="object-cover"
              priority={true}
              placeholder="blur"
              blurDataURL={placeholders[index]}
            />
          </div>
        ))}
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            XPERIENCE EVERY TWIST.
          </h1>
        </div>
      </section>
      {/* About Section */}
      <section className="py-20 bg-[#F1E2D1]">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-md md:text-xl mb-8 text-black font-semibold tracking-wide">
              DINE & WINE IN PHAN THIET CITY
            </h2>
            <p className="text-xl md:text-2xl text-black/80 leading-relaxed max-w-3xl mx-auto mb-10 font-medium uppercase">
              XET. Dine & Wine fuses Asian and Western flavors, featuring
              premium steaks and Asian-inspired pasta paired with fine wines.
              Experience the perfect blend of East and West in every dish.
            </p>
            <button className="bg-transparent text-black border border-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
              BOOK NOW
            </button>
          </div>
        </div>

        <div className="my-24 py-4 overflow-hidden whitespace-nowrap relative w-fulls bg-[#D2B48C]">
          <div className="flex space-x-12 animate-marquee w-full">
            {Array(20)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-8 shrink-0"
                >
                  <span
                    className={`text-black text-2xl whitespace-nowrap px-4 ${
                      index % 2 === 1 ? "font-bold" : "font-normal"
                    }`}
                  >
                    XPERIENCE EVERY TWIST.
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-20 bg-[#F1E2D1] px-4 lg:px-0">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] md:h-[540px] rounded-lg overflow-hidden order-1 md:order-1">
              <Image
                src="/images/menu.JPG"
                alt="OUR SPACE ambiance"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-black space-y-6 order-2 md:order-2">
              <h2 className="text-3xl font-bold">OUR SPACES</h2>
              <p className="text-lg leading-relaxed">
                {`A fusion restaurant in Phan Thiet offering a spacious and stylish atmosphere, where European-style pasta meets Asian-inspired twists, alongside premium steaks and a curated selection of fine wines. Whether you're craving a comforting plate of pasta, a perfectly seared beefsteak, or the perfect wine pairing for your meal, we have it all!`}
              </p>
              <button className="bg-transparent text-black border border-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                BOOK NOW
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-black space-y-6 order-2 md:order-1">
              <h2 className="text-3xl font-bold">ASIAN-INSPIRED TWISTS</h2>
              <p className="text-lg leading-relaxed">
                {`Refined and innovative, XET. is an Asian fusion restaurant with
                the best restaurant atmosphere. Committed to delivering
                authentic flavours with a contemporary twist, it's Phan Thiet's
                destination for intimate and inventive dining.`}
              </p>
              <button className="bg-transparent text-black border border-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                SEE MENU
              </button>
            </div>
            <div className="relative h-[300px] md:h-[540px] rounded-lg overflow-hidden order-1 md:order-2">
              <Image
                src="/images/2.JPG"
                alt="PRIVATE DINING ambiance"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <section className="bg-[#F1E2D1] py-10">
        <div className="w-full border-t border-black/10 mb-12" />
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12 text-black">
            FOLLOW US ON INSTAGRAM
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-20">
          {footerImages.map((url, index) => (
            <div
              key={index}
              className="aspect-square relative overflow-hidden group"
            >
              <Image
                src={url}
                alt={`Instagram feed ${index}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-black text-center md:text-left">
            <div>
              <h3 className="font-bold mb-4">DINE & WINE EVERYDAY</h3>
              <p>7:00am-10:00pm</p>
              <h3 className="font-bold mb-4 mt-6">MAM VIET EVERYDAY</h3>
              <p>7:00am-2:30pm</p>
              <button className="mt-6 border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-colors">
                BOOK NOW
              </button>
            </div>

            <div>
              <h3 className="font-bold mb-4">CONTACT US</h3>
              <p className="mb-2">32 Luong The Vinh St,</p>
              <p className="mb-4">Phan Thiet, Binh Thuan</p>
              <a href="tel:0941344673" className="hover:underline">
                0941 344 673
              </a>
            </div>

            <div>
              <h3 className="font-bold mb-4">{`LET'S GET SOCIAL`}</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.instagram.com/xet.dineandwine"
                  className="hover:opacity-70"
                >
                  <Image
                    src="/instagram.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </a>
                <a
                  href="https://www.facebook.com/xetpremiumdineandwine"
                  className="hover:opacity-70"
                >
                  <Image
                    src="/facebook.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">LINKS</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Set Menus
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Our Spaces
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
            <Image
              src="/logo-black.png"
              alt="XET."
              width={180}
              height={72}
              className="object-contain"
            />
            <p className="text-sm text-black/60 ml-8">
              © XET. all rights reserved. | Site by XET.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
