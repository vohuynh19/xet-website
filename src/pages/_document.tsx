import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://www.xetpasta.com" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />

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
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/preview.jpg" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="XET. Dine & Wine" />
        <meta
          name="twitter:description"
          content="Experience exceptional dining at XET. Discover our unique menu featuring pasta, coffee, and dining options."
        />
        <meta name="twitter:image" content="/preview.jpg" />

        <link rel="canonical" href="https://xetpasta.com/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="XET." />
        <meta property="og:locale" content="en_US" />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
