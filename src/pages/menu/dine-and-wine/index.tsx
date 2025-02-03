import Head from "next/head";

export default function DineAndWineMenu() {
  return (
    <>
      <Head>
        <title>XET. Pasta</title>
        <meta name="description" content="XET. Dine & Wine Menu" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta name="google" content="notranslate" />
      </Head>

      <iframe
        src="dine-and-wine/index.html"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
        }}
      />
    </>
  );
}
