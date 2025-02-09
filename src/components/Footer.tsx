import Image from "next/image";

interface FooterProps {
  footerImages: string[];
}

export default function Footer({ footerImages }: FooterProps) {
  return (
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
  );
}
