import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

// Replace this with your Google Form URL
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScn9VR5HBZN67pc13D4OfijfJtwSILFP3KQsDaroyqBpAZS1Q/formResponse";

// Map your form fields to Google Form field IDs
const GOOGLE_FORM_FIELDS = {
  name: "entry.227524569",
  email: "entry.979665482",
  message: "entry.230928492",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body as ContactFormData;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Prepare form data for Google Forms
    const formData = new URLSearchParams({
      [GOOGLE_FORM_FIELDS.name]: name,
      [GOOGLE_FORM_FIELDS.email]: email,
      [GOOGLE_FORM_FIELDS.message]: message,
    });

    // Submit to Google Form
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to submit to Google Form");
    }

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
