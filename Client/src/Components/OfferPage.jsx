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
    <div className="relative w-full h-[90vh] flex flex-col md:flex-row items-center justify-center text-white overflow-hidden">
      {/* 🖼️ New Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1616423032374-9b9cb37a6822?auto=format&fit=crop&w=1400&q=80')",
        }}
      ></div>

      {/* 🎨 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* 🧱 Left Section */}
      <div className="relative z-10 w-full md:w-1/2 px-10 md:px-20 text-center md:text-left space-y-6">
        <h4 className="text-green-400 font-semibold uppercase tracking-wide">
          Limited Time Offer
        </h4>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
          Up to <span className="text-green-400">50% OFF</span> <br /> on
          Premium Headphones 🎧
        </h1>
        <p className="text-gray-300 text-base md:text-lg">
          Experience crystal-clear sound with our top-rated headphones. Hurry!
          Offer ends soon.
        </p>

        {/* Countdown */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl w-20 h-20 flex flex-col items-center justify-center shadow-md"
            >
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-xs uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="mt-8 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
          Shop Now
        </button>
      </div>

      {/* 🎧 Product Image Side */}
      <div className="relative z-10 w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src="https://pngimg.com/uploads/headphones/headphones_PNG7641.png"
          alt="Headphones"
          className="w-[300px] md:w-[400px] drop-shadow-2xl animate-pulse-slow"
        />
      </div>
    </div>
  );
};

export default OfferPage;
