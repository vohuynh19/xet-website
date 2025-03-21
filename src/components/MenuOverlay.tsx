import Link from "next/link";
import Image from "next/image";

interface MenuOverlayProps {
  isOpen: boolean;
  onLink: (link: string) => void;
}

export default function MenuOverlay({ isOpen, onLink }: MenuOverlayProps) {
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
          onClick={() => onLink("/menu")}
          href="/menu"
          className="block text-2xl hover:text-gray-300 transition-colors"
        >
          MENU
        </Link>
        <Link
          onClick={() => onLink("/set-menus")}
          href="/set-menus"
          className="block text-2xl hover:text-gray-300 transition-colors"
        >
          DINING SET
        </Link>
        <Link
          onClick={() => onLink("/contact-us")}
          href="/contact-us"
          className="block text-2xl hover:text-gray-300 transition-colors"
        >
          CONTACT US
        </Link>
        <div style={{ height: 24 }}></div>
        <div style={{ height: 24 }}></div>
        <Link
          onClick={() => onLink("/booking")}
          href="/booking"
          className="border border-white px-8 py-3 text-lg rounded-full hover:bg-white hover:text-black transition-colors"
        >
          BOOK NOW
        </Link>
      </div>
    </div>
  );
}
