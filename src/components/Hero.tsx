import Image from "next/image";

interface HeroProps {
  bannerImages: string[];
  currentImageIndex: number;
  placeholders: string[];
}

export default function Hero({
  bannerImages,
  currentImageIndex,
  placeholders,
}: HeroProps) {
  return (
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
  );
}
