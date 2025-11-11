

import React, { useRef, useState } from "react";
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_nbz7cic",    
        "template_gp9lsfv",   
        form.current,
        "44a9ao4p2AvUQAzSW"     
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          toast.success("Message sent successfully!");
          e.target.reset();
          setLoading(false);
        },
        (error) => {
          console.error("Email send failed:", error);
          toast.error("Failed to send message. Try again!");
          setLoading(false);
        }
      );
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-12 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to={"/"}> Home </Link> /{" "}
        <span className="text-cyan-600 font-medium">Contact</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-2xl p-6 md:p-10">
        {/* Left Side – Contact Info */}
        <div className="space-y-8 border-r border-gray-200 pr-0 md:pr-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-100 rounded-full">
              <Phone className="text-cyan-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Call To Us</h3>
              <p className="text-gray-600 text-sm mt-1">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-gray-800 font-medium mt-2">
                Phone: +8801611112222
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-100 rounded-full">
              <Mail className="text-cyan-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Write To Us</h3>
              <p className="text-gray-600 text-sm mt-1">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-gray-800 mt-2">
                Emails:{" "}
                <span className="font-medium text-cyan-700">
                  customer@exclusive.com
                </span>
              </p>
              <p className="text-gray-800">
                Emails:{" "}
                <span className="font-medium text-cyan-700">
                  support@exclusive.com
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side – Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name *"
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email *"
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="tel"
              name="user_phone"
              placeholder="Your Phone *"
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition duration-200 w-full sm:w-auto"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
