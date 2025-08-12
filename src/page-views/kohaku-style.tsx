import { useState, useEffect, useMemo, memo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { placeholder0, placeholder1, placeholder2 } from "@/constants";

// const bannerImages = ["/images/0.JPG", "/images/1.JPG", "/images/2.JPG"];
// const placeholders = [placeholder0, placeholder1, placeholder2];

export default function KohakuStyle() {
  const scrollYRef = useRef(0); // Stores the latest scrollY without triggering re-render
  const ticking = useRef(false);
  const [scrollY, setScrollY] = useState(0);

  const lastY = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      scrollYRef.current = window.scrollY;
      if (Math.abs(scrollYRef.current - lastY.current) > 200) {
        setScrollY(scrollYRef.current);
        lastY.current = scrollYRef.current;
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="min-h-screen text-gray-900"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Navigation */}
        <MNavigation />
        <MHeroSection scrollY={scrollY} />
        {/* Content Sections with Background */}
        <div className="relative z-10">
          {/* Spacer for hero section */}
          <div style={{ height: "100lvh" }}></div>
          <MPhilosophySection scrollY={scrollY} />
          <MPhilosophySection scrollY={scrollY} />
          <MCuisineSection scrollY={scrollY} />
          <MGallerySection scrollY={scrollY} />
          <MFooter />
        </div>
      </div>
    </>
  );
}

const HeroSection = ({ scrollY }: { scrollY: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const heroImages = useMemo(
    () => [
      "/images/0.JPG",
      "/images/kvs-xet-7.jpg",
      "/images/space-1.JPG",
      "/images/kvs-xet-13.jpg",
      "/images/space-2.JPG",
      "/images/kvs-xet-11.jpg",
    ],
    []
  );

  // Image rotation effect with zoom in/out animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds for better zoom effect

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Initialize first image with zoom effect
  useEffect(() => {
    // Trigger initial zoom animation
    setIsInitialized(true);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 h-[100lvh] w-full"
      style={{ backgroundColor: "#000" }}
    >
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-2000 ${
            currentImageIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform:
              currentImageIndex === index && isInitialized
                ? `scale(1.15)`
                : `scale(1.0)`,
            transition:
              currentImageIndex === index
                ? "transform 8s ease-out"
                : "transform 0s",
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 transition-all duration-1000 z-10"
        style={{
          backgroundColor:
            scrollY > 800 ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.4)",
        }}
      ></div>

      {/* Hero Content - Fixed Position */}
      <div className="absolute inset-0 flex items-center justify-center text-white z-20">
        <div className="text-center px-6">
          <div
            className={`transition-all duration-1000 ${
              scrollY > 100
                ? "opacity-0 translate-y-10"
                : "opacity-100 translate-y-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-widest">
              XPERIENCE EVERY TWIST.
            </h1>
            <div className="w-32 h-px bg-white mx-auto mb-8"></div>
            <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
              Experience every moment. Sometimes bold, sometimes refined, always
              with passion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const MHeroSection = memo(HeroSection);

const Navigation = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-sm transition-all duration-300 ${"border-transparent"}`}
      style={{
        backgroundColor: "rgba(249, 246, 240, 0)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Link
          href="/"
          className={`text-xl sm:text-2xl font-bold tracking-wider transition-colors duration-300 ${"text-white"}`}
        >
          <Image
            src="/logo.png"
            alt="XET. Logo"
            width={90}
            height={36}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          <Link
            href="/menu"
            className={`text-base transition-colors duration-300 ${"text-white hover:text-gray-300"}`}
          >
            Menu
          </Link>
          <Link
            href="/booking"
            className={`text-base transition-colors duration-300 ${"text-white hover:text-gray-300"}`}
          >
            Reservation
          </Link>
          <Link
            href="/contact-us"
            className={`text-base transition-colors duration-300 ${"text-white hover:text-gray-300"}`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Book Now Button */}
        <button
          onClick={() => router.push("/booking")}
          className="hidden sm:block text-white px-4 sm:px-6 py-2 rounded-full transition-colors hover:opacity-90 text-base"
          style={{ backgroundColor: "#581f29" }}
        >
          BOOK NOW
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors duration-300 text-white`}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="px-4 py-4 space-y-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <Link
            href="/menu"
            className={`block py-2 text-base transition-colors duration-300 ${"text-white hover:text-gray-300"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Menu
          </Link>
          <Link
            href="/booking"
            className={`block py-2 text-base transition-colors duration-300 ${"text-white hover:text-gray-300"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reservation
          </Link>
          <Link
            href="/contact-us"
            className={`block py-2 text-base transition-colors duration-300 ${"text-white hover:text-gray-300"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <button
            onClick={() => {
              router.push("/booking");
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-white px-6 py-3 rounded-full transition-colors hover:opacity-90 text-base mt-4"
            style={{ backgroundColor: "#581f29" }}
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </nav>
  );
};

const MNavigation = memo(Navigation);

const PhilosophySection = ({ scrollY }: { scrollY: number }) => {
  return (
    <section className="py-20 px-6 relative">
      {/* Gradient Background Transition */}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          className={`transition-all duration-1000 delay-200 ${
            scrollY > 300
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-12 tracking-wide text-white">
            What we treasure most is &ldquo;flavor&rdquo;.
          </h2>
          <div className="w-32 h-px bg-white/50 mx-auto mb-12"></div>
          <p className="text-base md:text-lg leading-relaxed mb-8 text-white/90">
            As an Asian fusion restaurant, what we treasure most is
            &ldquo;flavor&rdquo;. Blessed with abundant ingredients in Phan
            Thiet, we believe we must be delicate about &ldquo;flavor&rdquo; in
            our culinary approach.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-8 text-white/90">
            In Asian fusion cuisine, &ldquo;flavor&rdquo; plays a crucial role
            in cooking through our broths and stocks. These form the foundation
            of all Asian fusion dishes.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white/90">
            Broths enhance ingredients, broths support ingredients in their
            natural state. At XET, we believe that by subtly incorporating the
            aromas of spices and herbs with restraint, we can fully and
            naturally draw out the power that each ingredient possesses at that
            moment.
          </p>
        </div>
      </div>
    </section>
  );
};

const MPhilosophySection = memo(PhilosophySection);

const CuisineSection = ({ scrollY }: { scrollY: number }) => {
  const dishes = useMemo(
    () => [
      {
        url: "/images/dishes/kvs-xet-14.jpg",
        nameEn: "Wagyu Fullblood MS9+",
        nameVi: "bò Wagyu Fullblood MS9+",
        descriptionEn: "macadamia cream, red wine sauce",
        descriptionVi: "kem hạt Macca, sốt bò hầm vang đỏ",
        isSignature: true,
      },
      {
        url: "/images/dishes/kvs-xet-11.jpg",
        nameEn: "Phan Thiết crab pasta",
        nameVi: "mì ý cua Phan Thiết",
        descriptionEn: "crab meat, seafood tomato sauce",
        descriptionVi: "thịt cua, sốt cà chua hải sản",
      },
      {
        url: "/images/dishes/kvs-xet-3.jpg",
        nameEn: "cherry tomato salad",
        nameVi: "salad cà chua Cherry",
        descriptionEn: "Dalat tomatoes, yogurt dressing",
        descriptionVi: "cà chua Đà Lạt, sốt kem sữa chua",
      },
      {
        url: "/images/dishes/kvs-xet-13.jpg",
        nameEn: "sausage of duck neck",
        nameVi: "xúc xích cổ vịt",
        descriptionEn: "dill, Harissa saucer",
        descriptionVi: "thìa là, sốt Harissar",
        isSignature: true,
      },
      {
        url: "/images/dishes/kvs-xet-12.jpg",
        nameEn: "bolognese & burrata spaghetti",
        nameVi: "mì ý bò bằm & Burrata",
        descriptionEn: "burrata cheese, ground beef tomato sauce",
        descriptionVi: "phô mai Burrata, sốt cà chua bò bằm",
      },
      {
        url: "/images/dishes/kvs-xet-16.jpg",
        nameEn: "Creamy Blood Orange",
        nameVi: "kem ngọt Blood Orange",
        descriptionEn: "whipped cream, orange, white chocolate",
        descriptionVi: "kem bông, cam tươi, chocolate trắng",
        isSignature: true,
      },
      {
        url: "/images/dishes/kvs-xet-10.jpg",
        nameEn: "duck breast steak",
        nameVi: "steak ức vịt",
        descriptionEn: "kombucha pineapple compote, kale",
        descriptionVi: "mứt thơm kombucha, cải Kale",
      },
      {
        url: "/images/dishes/kvs-xet-7.jpg",
        nameEn: "smoked prawn",
        nameVi: "tôm xông khói",
        descriptionEn: "served with prawn sauce",
        descriptionVi: "tôm chín tái, sốt tôm hầm",
        isSignature: true,
      },
      {
        url: "/images/dishes/kvs-xet-8.jpg",
        nameEn: "Angus Flank steak MS3+",
        nameVi: "thăn bò Flank Augus MS3+",
        descriptionEn: "potatoes, Chimichurri sauce",
        descriptionVi: "khoai tây, sốt Chimmichuri",
      },
      {
        url: "/images/dishes/kvs-xet-4.jpg",
        nameEn: "melon & burrata salad",
        nameVi: "salad dưa lưới & Burrata",
        descriptionEn: "Phan Thiết melon, yogurt dressing",
        descriptionVi: "dưa lưới Phan Thiết, sốt kem sữa chua",
        isSignature: true,
      },
    ],
    []
  );

  return (
    <section className="min-h-screen relative">
      {/* Large Background Dish Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: scrollY > 1200 ? "url('/images/0.JPG')" : "none",
            opacity: scrollY > 1200 ? 1 : 0,
          }}
        >
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              backgroundColor:
                scrollY > 1200 ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 1)",
            }}
          ></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Section Title */}
          <div
            className={`mb-16 transition-all duration-1000 delay-300 ${
              scrollY > 800
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wider">
              CUISINE
            </h2>
            <div className="w-24 h-px bg-white/50"></div>
          </div>

          {/* Main Content Grid - Enhanced Layout */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center mb-20">
            {/* Left Content - Takes 3 columns */}
            <div
              className={`lg:col-span-3 space-y-8 transition-all duration-1000 delay-400 ${
                scrollY > 900
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              {/* Main Philosophy */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white">
                  Flavors that transcend memory,
                </h3>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white">
                  cuisine that defies expectation
                </h3>
              </div>

              {/* Detailed Description */}
              <div className="space-y-6 mt-12">
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/90">
                  At XET, we believe a great meal starts with fresh, quality
                  ingredients. From seafood and vegetables to beef and local
                  spices, everything is carefully sourced from Phan Thiet and
                  nearby regions.
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/90">
                  We respect the roots of traditional cooking, but we also love
                  giving it a fresh twist. Every dish brings together the warmth
                  of familiar flavors with just the right touch of creativity,
                  so it feels both comforting and exciting.
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/90">
                  Here, you’re not just enjoying a meal—you’re tasting the story
                  of the sea, the land, and the people who make Phan Thiet
                  special.
                </p>
              </div>

              {/* Call to Action */}
              <div className="pt-8">
                <div className="inline-flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300 cursor-pointer group">
                  <Link href="/menu">
                    <span className="text-sm md:text-base font-medium tracking-wider uppercase">
                      Explore Our Menu
                    </span>
                  </Link>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Content with Featured Dish - Takes 2 columns */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 delay-1000 ${
                scrollY > 1000
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Featured Dish Image with Enhanced Design */}
              <div className="relative group">
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700">
                  <Image
                    src="/images/dishes/kvs-xet-8.jpg"
                    alt="Signature Creation"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <span className="text-white/90 text-sm font-medium">
                      Featured
                    </span>
                  </div>

                  {/* Bottom Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="space-y-3">
                      <h4 className="text-xl md:text-2xl font-medium text-white">
                        Signature Creation
                      </h4>
                      <p className="text-sm md:text-base leading-relaxed text-white/90">
                        Everyday flavors brought to life with XET’s own unique
                        style.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/10 rounded-full blur-sm"></div>
              </div>
            </div>
          </div>

          {/* Secondary Content Row - Creative Grid Layout */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {/* Left Dish - Spans 1 column */}
            <div
              className={`transition-all duration-1000 delay-800 ${
                scrollY > 1200
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative group">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <Image
                    src="/images/dishes/kvs-xet-13.jpg"
                    alt="Artisan Craft"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-lg md:text-xl font-medium text-white mb-2">
                      Crafted with Care
                    </h4>
                    <p className="text-sm leading-relaxed text-white/85">
                      From cooking to plating, every detail is made to be both
                      beautiful and delicious.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Content - Philosophy Text */}
            <div
              className={`flex items-center justify-center transition-all duration-1000 delay-900 ${
                scrollY > 1200
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-center space-y-6 p-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
                <h4 className="text-xl md:text-2xl font-light text-white leading-relaxed">
                  Where tradition meets innovation
                </h4>
                <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-xs">
                  Every element on the plate tells a story of culinary evolution
                  and artistic expression.
                </p>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
              </div>
            </div>

            {/* Right Dish - Spans 1 column */}
            <div
              className={`transition-all duration-1000 delay-1000 ${
                scrollY > 1000
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative group">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <Image
                    src="/images/menu.JPG"
                    alt="Delicate Presentation"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-lg md:text-xl font-medium text-white mb-2">
                      A Cozy Space
                    </h4>
                    <p className="text-sm leading-relaxed text-white/85">
                      A place to share good food, good conversation, and good
                      moments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Statement */}
          <div
            className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-1200 ${
              scrollY > 1400
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/95 italic">
              &ldquo;We reconstruct the present on each plate, embracing change
              as the natural evolution of culinary art.&rdquo;
            </p>
          </div>

          {/* Enhanced Culinary Journey Carousel */}
          <div
            className={`transition-all duration-1000 delay-1400 ${
              scrollY > 1600
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-sm border border-white/10 shadow-2xl">
              {/* Enhanced Header */}
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-block">
                  <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mb-3 md:mb-4 mx-auto"></div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-3 md:mb-4 tracking-wider">
                    Our Culinary Journey
                  </h3>
                  <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-white/70 mt-4 md:mt-6 max-w-2xl mx-auto leading-relaxed px-4">
                  Discover the artistry behind each creation, where tradition
                  meets innovation in perfect harmony
                </p>
              </div>

              {/* Interactive Carousel Container */}
              <div className="relative">
                {/* Navigation Buttons - Show on all screen sizes */}
                <button
                  onClick={() => {
                    const container =
                      document.getElementById("culinary-carousel");
                    if (container) {
                      const scrollAmount = innerWidth < 768 ? -250 : -300;
                      container.scrollBy({
                        left: scrollAmount,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black/80 hover:bg-black/90 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-xl"
                  aria-label="Previous dishes"
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    const container =
                      document.getElementById("culinary-carousel");
                    if (container) {
                      const scrollAmount = innerWidth < 768 ? 250 : 300;
                      container.scrollBy({
                        left: scrollAmount,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black/80 hover:bg-black/90 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-xl"
                  aria-label="Next dishes"
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Carousel Content */}
                <div
                  id="culinary-carousel"
                  className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 md:pb-6 px-2 sm:px-4 md:px-8 scrollbar-hide scroll-smooth"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {dishes.map((dish, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-72 sm:w-80 md:w-80 lg:w-80 relative group transition-all duration-700 hover:scale-105 ${
                        scrollY > 1600
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                      style={{
                        transitionDelay: `${1600 + index * 100}ms`,
                      }}
                    >
                      {/* Enhanced Image Container */}
                      <div className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-xl group-hover:shadow-3xl transition-all duration-700 mb-4 md:mb-6">
                        <Image
                          src={dish.url}
                          alt={dish.nameEn}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Enhanced Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                        {/* Category Badge */}
                        {dish.isSignature && (
                          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#581f29]">
                            <span className="text-[#581f29] text-xs font-medium uppercase tracking-wider">
                              Signature
                            </span>
                          </div>
                        )}

                        {/* Enhanced Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="space-y-3">
                            <h4 className="text-xl md:text-2xl font-medium text-white group-hover:text-white/90 transition-colors duration-300">
                              {dish.nameEn}
                            </h4>
                            <p className="text-sm md:text-base leading-relaxed text-white/85 group-hover:text-white/95 transition-colors duration-300">
                              {dish.nameVi}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Dish Info */}
                      <div className="text-center px-2">
                        <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Decorative Corner - Hidden on mobile */}
                      <div className="hidden md:block absolute top-2 left-2 w-4 h-4 lg:w-6 lg:h-6 border-l-2 border-t-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
                      <div className="hidden md:block absolute bottom-16 lg:bottom-20 right-2 w-4 h-4 lg:w-6 lg:h-6 border-r-2 border-b-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action - Responsive */}
              <div className="text-center mt-8 md:mt-12">
                <p className="text-white/60 text-xs sm:text-sm md:text-base mb-4 md:mb-6 italic px-4">
                  Each dish tells a story of passion, precision, and culinary
                  excellence
                </p>

                <Link href="/menu">
                  <button className="bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/30 px-6 py-2.5 md:px-8 md:py-3 rounded-full text-white/90 hover:text-white transition-all duration-300 backdrop-blur-sm font-medium tracking-wide text-sm md:text-base">
                    View Full Menu
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 z-5 opacity-10">
        <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent"></div>
      </div>
    </section>
  );
};

const MCuisineSection = memo(CuisineSection);

const GallerySection = ({ scrollY }: { scrollY: number }) => {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                                 radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 delay-700 ${
            scrollY > 1800
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light tracking-wider text-white mb-4">
              OUR SPACES
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Every corner tells a story. From intimate dining nooks to vibrant
            social spaces, discover the carefully crafted environments that make
            XET a destination.
          </p>
        </div>

        {/* Enhanced Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              src: "/images/space-1.JPG",
              title: "Bar Area",
              description:
                "Casual seating area where you can enjoy our wine selection and relax with friends",
            },

            {
              src: "/images/space-4.JPG",
              title: "Outdoor Terrace",
              description:
                "Garden terrace dining with fresh air and natural greenery surroundings",
            },
            {
              src: "/images/space-6.JPG",
              title: "Lounge Area",
              description:
                "Comfortable seating with street views and panoramic views of the entire restaurant",
            },
          ].map((space, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 ${
                scrollY > 2000
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${800 + index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                <Image
                  src={space.src}
                  alt={space.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-medium text-white mb-3 tracking-wide">
                      {space.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {space.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-6 right-6 w-8 h-8 border border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                    <div className="absolute inset-2 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Statement */}
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-1200 ${
            scrollY > 2200
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-transparent via-white/5 to-transparent p-8 md:p-12 rounded-3xl backdrop-blur-sm">
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/95 italic mb-6">
              &ldquo;Each space within XET has been thoughtfully designed to
              create moments of connection— between people, between flavors, and
              between the artistry of cuisine and the comfort of home.&rdquo;
            </p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-white/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-500"></div>
    </section>
  );
};

const MGallerySection = memo(GallerySection);

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900/95 to-black overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        {/* Gentle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-[#581f29]/30 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/6 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-medium mb-4 tracking-wide">Visit</h3>
            <div className="space-y-3 text-white/80 text-sm">
              <p className="leading-relaxed">Everyday, 6:00pm to 10:00pm</p>
              <p className="leading-relaxed">
                32 Luong The Vinh Street
                <br />
                Phan Thiet, Binh Thuan
              </p>
              <Link
                href="tel:0908704458"
                className="block hover:text-white transition-colors duration-300 underline decoration-[#581f29]/50 underline-offset-4 hover:decoration-[#581f29]"
              >
                0908 704 458
              </Link>
            </div>
          </div>

          {/* Elegant Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-6 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/40"></div>
              <Image
                src="/logo.png"
                alt="XET. Logo"
                width={120}
                height={48}
                className="object-contain"
              />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/40"></div>
            </div>
            <p className="text-white/70 text-lg font-light tracking-wide">
              Experience Every Twist
            </p>
          </div>

          {/* Connect */}
          <div className="text-center md:text-right">
            <h3 className="text-white font-medium mb-4 tracking-wide">
              Connect
            </h3>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a
                href="https://www.instagram.com/xet.dineandwine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[#581f29]/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 border border-white/10 hover:border-[#581f29]/30"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/xetpremiumdineandwine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[#581f29]/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 border border-white/10 hover:border-[#581f29]/30"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            <button
              onClick={() => router.push("/booking")}
              className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#581f29] to-[#6d2433] hover:from-[#6d2433] hover:to-[#581f29] text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#581f29]/20"
            >
              Reserve Table
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/50 text-sm">
              &copy; 2024 XET. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/menu"
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                Menu
              </Link>
              <Link
                href="/booking"
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                Reservation
              </Link>
              <Link
                href="/contact-us"
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
const MFooter = memo(Footer);
