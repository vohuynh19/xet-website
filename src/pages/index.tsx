import Image from "next/image";
import { useState, useEffect } from "react";

const bannerImages = ["/home/banner-1.jpg", "/home/banner-2.jpg"];

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCloseBanner = () => {
    setShowBanner(false);
    localStorage.setItem("showBanner", "false");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Notification Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-black/50 text-[#D2B48C] py-2 px-4 text-center text-sm md:text-base z-50 flex items-center backdrop-blur-sm">
          <div className="flex-1" />
          <div className="flex-[2] text-center">
            NOW OPEN | EVERYDAY FROM 07:00 AM TO 10:00 PM
          </div>
          <div className="flex-1 flex justify-end">
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
                H
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Navigation */}
      <nav
        className={`absolute top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-8 py-4`}
      >
        <button className="hidden md:block text-white border border-white px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-full hover:bg-white hover:text-black transition-colors">
          BOOK NOW
        </button>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/logo.png"
            alt="XET. Logo"
            width={120}
            height={48}
            className="object-contain"
          />
        </div>
        <button className="text-white hover:text-gray-300 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8"
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
        </button>
      </nav>
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
              priority={index === 0}
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

        <div className="max-w-6xl mx-auto space-y-20 bg-[#F1E2D1]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[540px] rounded-lg overflow-hidden">
              <Image
                src="/home/banner-1.jpg"
                alt="Public Bar ambiance"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-black space-y-6">
              <h2 className="text-3xl font-bold">PUBLIC BAR</h2>
              <p className="text-lg leading-relaxed">
                {`A vibrant public bar & eatery in Canberra CBD that offers a
                spacious outdoor terrace and menu of creatively crafted
                Asian-inspired cocktails and delicious snacks. Whether you're
                seeking a well-deserved drink after work or a memorable night
                out with friends, our Public Bar has it all!`}
              </p>
              <button className="bg-transparent text-black border border-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                BOOK NOW
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-black space-y-6">
              <h2 className="text-3xl font-bold">PRIVATE DINING</h2>
              <p className="textH-lg leading-relaxed">
                {`Refined and innovative, XET. is an Asian fusion restaurant with
                the best restaurant atmosphere. Committed to delivering
                authentic flavours with a contemporary twist, it's Canberra's
                destination for intimate and inventive dining.`}
              </p>
              <button className="bg-transparent text-black border border-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                SEE MENU
              </button>
            </div>
            <div className="relative h-[540px] rounded-lg overflow-hidden">
              <Image
                src="/home/banner-2.jpg"
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
        <div className="w-full border-t border-black/20 mb-12" />
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12 text-black">
            FOLLOW US ON INSTAGRAM
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="aspect-square relative overflow-hidden">
              <Image
                src={`/home/banner-${(index % 2) + 1}.jpg`}
                alt={`Instagram feed ${index}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-black">
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
              <div className="flex space-x-4">
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
                    Functions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Gallery
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
