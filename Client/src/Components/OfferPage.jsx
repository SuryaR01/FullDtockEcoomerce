import React, { useEffect, useState } from "react";

const OfferPage = () => {
  // Countdown target date (5 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage:
            "url('https://devrims.com/blog/wp-content/uploads/2024/08/ecommerce-product-images-BLOG.jpg')",
        }}
      ></div>

      {/* Optional Dark Overlay for extra contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-20">
        <h4 className="text-green-400 font-semibold uppercase mb-2">
          Categories
        </h4>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 drop-shadow-lg">
          Enhance Your <br /> Music Experience
        </h1>

        {/* Countdown */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-md"
            >
              <p className="text-3xl font-bold">{item.value}</p>
              <p className="text-xs uppercase">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-semibold shadow-md transition-all duration-200">
          Buy Now!
        </button>
      </div>
    </div>
  );
};

export default OfferPage;
