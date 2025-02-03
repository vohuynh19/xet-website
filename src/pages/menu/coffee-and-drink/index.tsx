import Head from "next/head";

export default function CoffeeAndDrinkMenu() {
  return (
    <>
      <Head>
        <title>XET. Pasta</title>
        <meta name="description" content="XET. Coffee & Drink Menu" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>

      <iframe
        src="coffee-and-drink/index.html"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
        }}
      />
    </>
  );
}
