import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import Navigation from "@/components/Navigation";
import Head from "next/head";

export default function Booking() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>XET. Book a Table | Restaurant Reservations in Phan Thiet</title>
        <meta
          name="description"
          content="Book your dining experience at XET. Dine & Wine. Easy online reservations for lunch, dinner, and special occasions in our Phan Thiet restaurant."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="XET restaurant booking, Phan Thiet restaurant reservation, table booking, dining reservation, special occasion booking"
        />
        <meta
          property="og:title"
          content="XET. Book a Table | Restaurant Reservations in Phan Thiet"
        />
        <meta
          property="og:description"
          content="Book your dining experience at XET. Dine & Wine. Easy online reservations for lunch, dinner, and special occasions in our Phan Thiet restaurant."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/menu.JPG" />
        <meta property="og:url" content="https://www.xetpasta.com/booking" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "XET. Dine & Wine",
            image: "https://www.xetpasta.com/images/menu.JPG",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Phan Thiet",
              addressCountry: "VN",
            },
            servesCuisine: ["Asian Fusion", "International"],
            potentialAction: {
              "@type": "ReserveAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://www.xetpasta.com/booking",
                inLanguage: "en-US",
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/IOSPlatform",
                  "http://schema.org/AndroidPlatform",
                ],
              },
            },
          })}
        </script>
      </Head>
      <Navigation
        isMenuOpen={isMenuOpen}
        showNavBackground
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      <section className="min-h-screen bg-[#F1E2D1] py-32">
        <div className="w-full flex justify-center px-4 h-full">
          <iframe
            src="https://booking.ipos.vn/public/booking/8ea59cf7-89d7-4624-98d7-3d55b2b97a56?restaurant_uuid=f3554130-6d9b-4048-b242-45e4f88131bf&source=IFRAME&restaurant_disabled=true"
            className="w-full md:w-[600px] min-h-[800px]"
            style={{
              border: 0,
            }}
          />
        </div>
      </section>
    </>
  );
}
