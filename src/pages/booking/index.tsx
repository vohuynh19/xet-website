import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "@/components/Navigation";

interface BookingFormData {
  fullname: string;
  phoneNumber: string;
  numberOfGuests: number;
  date: Date;
  note: string;
  otherNote?: string;
}

export default function Booking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      console.log("form data", data);
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitSuccess(true);
      reset();
      setSelectedDate(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation
        isMenuOpen={isMenuOpen}
        showNavBackground
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      <section className="min-h-screen bg-[#F1E2D1] py-32">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-black text-center mb-8">
            Book a Table
          </h1>
          <p className="text-black/80 text-center mb-12">
            Reserve your perfect dining experience with us.
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
                htmlFor="numberOfGuests"
                className="block text-sm font-medium text-black mb-2"
              >
                Number of Guests <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="numberOfGuests"
                {...register("numberOfGuests", {
                  required: "Number of guests is required",
                  min: {
                    value: 1,
                    message: "Minimum 1 guest required",
                  },
                  max: {
                    value: 20,
                    message: "Maximum 20 guests allowed",
                  },
                })}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white/50 text-black"
              />
              {errors.numberOfGuests && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.numberOfGuests.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-black mb-2"
              >
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white/50 text-black"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-black mb-2"
              >
                Date & Time <span className="text-red-600">*</span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white/50 text-black"
                placeholderText="Select date and time"
                wrapperClassName="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-black mb-2"
              >
                Special Requests
              </label>
              <select
                id="note"
                {...register("note")}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white/50 text-black"
                onChange={(e) => setShowOtherInput(e.target.value === "other")}
              >
                <option value="" className="text-black">
                  Select a request (optional)
                </option>
                <option value="table" className="text-black">
                  Table booking
                </option>
                <option value="setup" className="text-black">
                  Special table setup
                </option>
                <option value="celebration" className="text-black">
                  Birthday/Anniversary celebration
                </option>
                <option value="other" className="text-black">
                  Other
                </option>
              </select>
              {showOtherInput && (
                <div className="mt-4">
                  <input
                    type="text"
                    {...register("otherNote")}
                    placeholder="Please specify your request"
                    className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white/50 text-black"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedDate}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/80 transition-colors disabled:bg-black/50"
            >
              {isSubmitting ? "Booking..." : "Book Now"}
            </button>

            {submitSuccess && (
              <div className="text-green-600 text-center">
                {` Thank you for your booking! We'll confirm your reservation
                shortly.`}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
