import React from "react";
import { Truck, Headphones, ShieldCheck } from "lucide-react"; // Using lucide-react icons

const DeleveryDet = () => {
  const services = [
    {
      icon: <Truck className="w-8 h-8 text-white" />,
      title: "FREE AND FAST DELIVERY",
      subtitle: "Free delivery for all orders over $140",
    },
    {
      icon: <Headphones className="w-8 h-8 text-white" />,
      title: "24/7 CUSTOMER SERVICE",
      subtitle: "Friendly 24/7 customer support",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: "MONEY BACK GUARANTEE",
      subtitle: "We return money within 30 days",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            {/* Icon Circle */}
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-black">
              <div className="absolute inset-0 rounded-full bg-gray-200 scale-125 -z-10" />
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-extrabold tracking-wide text-gray-900 uppercase">
              {service.title}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-gray-500">{service.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeleveryDet;
