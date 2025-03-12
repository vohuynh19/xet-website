import Image from "next/image";
import Link from "next/link";
import MenuOverlay from "./MenuOverlay";
import { useRouter } from "next/router";

interface NavigationProps {
  isMenuOpen: boolean;
  showNavBackground: boolean;
  toggleMenu: () => void;
}

export default function Navigation({
  isMenuOpen,
  showNavBackground,
  toggleMenu,
}: NavigationProps) {
  const router = useRouter();
  return (
    <>
      <MenuOverlay isOpen={isMenuOpen} onLink={() => toggleMenu()} />
      <nav
        className={`fixed top-0 left-0 w-full z-[1001] flex justify-between items-center px-4 md:px-8 py-4 transition-all duration-300 ${
          showNavBackground && !isMenuOpen ? "bg-black/50 backdrop-blur-sm" : ""
        }`}
      >
        <Link href="/booking">
          <button
            onClick={() => router.push("/booking")}
            className={`hidden md:block text-white border border-white px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-full hover:bg-white hover:text-black transition-colors transform transition-transform duration-300 ${
              isMenuOpen
                ? "opacity-0 -translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            BOOK NOW
          </button>
        </Link>
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
    </>
  );
}
