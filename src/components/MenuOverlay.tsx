import Link from "next/link";
import Image from "next/image";

interface MenuOverlayProps {
  isOpen: boolean;
}

export default function MenuOverlay({ isOpen }: MenuOverlayProps) {
  return (
    <div
      className={`fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center text-white transition-all duration-300 ${
        isOpen
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
        <Link
          href="/menu"
          className="block text-2xl hover:text-gray-300 transition-colors"
        >
          MENU
        </Link>
        <Link
          href="/set-menus"
          className="block text-2xl hover:text-gray-300 transition-colors"
        >
          SET MENUS
        </Link>
        {/* <Link
          href="/spaces"
          className="block text-2xl hover:text-gray-300 transition-colors"
        >
          OUR SPACES
        </Link>
        <Link
          href="/menu/coffee-and-drink"
          className="block text-2xl hover:text-gray-300 transition-colors"
        >
          GALLERY
        </Link> */}
        <div style={{ height: 24 }}></div>
        <button className="border border-white px-8 py-3 text-lg rounded-full hover:bg-white hover:text-black transition-colors">
          BOOK NOW
        </button>
      </div>
    </div>
  );
}
