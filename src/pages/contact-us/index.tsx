import { useState } from "react";
import { useForm } from "react-hook-form";
import Navigation from "@/components/Navigation";
import Head from "next/head";

interface ContactFormData {
  fullname: string;
  email: string;
  message: string;
}

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    console.log("form data", data);
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>XET. Contact Us | Get in Touch - Restaurant in Phan Thiet</title>
        <meta
          name="description"
          content="Contact XET. Dine & Wine for reservations, inquiries, or feedback. We're here to assist you with your dining experience in Phan Thiet."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="XET contact, restaurant contact, Phan Thiet restaurant, contact form, get in touch"
        />
        <link rel="icon" href="/favicon.ico" />
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
        <meta
          property="og:title"
          content="XET. Contact Us | Get in Touch - Restaurant in Phan Thiet"
        />
        <meta
          property="og:description"
          content="Contact XET. Dine & Wine for reservations, inquiries, or feedback. We're here to assist you with your dining experience in Phan Thiet."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/menu.JPG" />
        <meta property="og:url" content="https://www.xetpasta.com/contact-us" />
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
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              url: "https://www.xetpasta.com/contact-us",
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
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-black text-center mb-8">
            Contact Us
          </h1>
          <p className="text-black/80 text-center mb-12">
            {` Have a question or comment? We'd love to hear from you.`}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-white/50 backdrop-blur-sm p-8 rounded-lg"
          >
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-black mb-2"
              >
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="fullname"
                {...register("fullname", { required: "Full name is required" })}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white/50 text-black"
              />
              {errors.fullname && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-2"
              >
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white/50 text-black"
              />
              {errors.email && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-black mb-2"
              >
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("message", { required: "Message is required" })}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white/50 resize-none text-black"
              />
              {errors.message && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/80 transition-colors disabled:bg-black/50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitSuccess && (
              <div className="text-green-600 text-center">
                {`Thank you for your message! We'll get back to you soon.`}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
