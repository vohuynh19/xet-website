import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://www.xetpasta.com" />

        <meta
          name="keywords"
          content="XET. Dine&Wine, XET., Dining Phan Thiet, Nhà hàng Phan Thiết, Ăn tối Phan Thiết, Asian fusion restaurant, fine dining, wine bar, pasta restaurant, steakhouse Phan Thiet, restaurant Phan Thiet"
        />
        <meta
          name="title"
          content="XET. Dine & Wine | Asian Fusion Restaurant in Phan Thiet"
        />
        <meta
          name="description"
          content="XET. - A unique dining experience in the heart of the city. Enjoy our carefully crafted menu featuring pasta, coffee, and dining options."
        />

        <meta
          property="og:title"
          content="XET. Dine & Wine | Asian Fusion Restaurant in Phan Thiet"
        />
        <meta
          property="og:description"
          content="XET. - A unique dining experience in the heart of the city. Enjoy our carefully crafted menu featuring pasta, coffee, and dining options."
        />
        <meta property="og:site_name" content="XET. Dine & Wine" />
        <meta property="og:image" content="/preview.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "XET. Dine & Wine",
              image: "https://www.xetpasta.com/preview.jpg",
              url: "https://www.xetpasta.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "32 Luongw The Vinh",
                addressLocality: "Phan Thiet",
                addressRegion: "Binh Thuan",
                postalCode: "800000",
                addressCountry: "VN",
              },
              telephone: "+84 937 731 494",
              priceRange: "$$$ (100,000 - 500,000 VND per person)",
              servesCuisine: [
                "Asian Fusion",
                "Steakhouse",
                "Pasta",
                "Wine Bar",
                "Beer",
              ],
            }),
          }}
        />
      </Head>
      <Main />
      <NextScript />
    </Html>
  );
}
