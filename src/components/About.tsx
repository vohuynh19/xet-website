import Image from "next/image";

export default function About() {
  return (
    <section className="py-20 bg-[#F1E2D1]">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-md md:text-xl mb-8 text-black font-semibold tracking-wide">
            DINE & WINE IN PHAN THIET CITY
          </h2>
          <p className="text-xl md:text-2xl text-black/80 leading-relaxed max-w-3xl mx-auto mb-10 font-medium uppercase">
            XET. Dine & Wine fuses Asian and Western flavors, featuring premium
            steaks and Asian-inspired pasta paired with fine wines. Experience
            the perfect blend of East and West in every dish.
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
              <div key={index} className="flex items-center space-x-8 shrink-0">
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
  );
}
