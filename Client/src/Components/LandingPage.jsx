import React from "react";
import { FaMobileAlt, FaTshirt, FaLaptop, FaCouch, FaTv, FaPlane, FaShoppingBag, FaAppleAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const LandingPage = () => {
  // 🧭 Dynamic top category data
  const categories = [
    { icon: <FaMobileAlt size={30} />, label: "Mobiles & Tablets" },
    { icon: <FaTshirt size={30} />, label: "Fashion" },
    { icon: <FaLaptop size={30} />, label: "Electronics" },
    { icon: <FaCouch size={30} />, label: "Home & Furniture" },
    { icon: <FaTv size={30} />, label: "TVs & Appliances" },
    { icon: <FaPlane size={30} />, label: "Flight Bookings" },
    { icon: <FaShoppingBag size={30} />, label: "Beauty, Food & More" },
    { icon: <FaAppleAlt size={30} />, label: "Grocery" },
  ];

  // 🖼️ Dynamic slider/banner data
  const banners = [
    {
      id: 1,
      bg: "from-purple-500 to-indigo-600",
      title: "Roundtrip booking offers!",
      subtitle: "Up to ₹3,500 Off",
      code: "ROUNDTRIP",
      img: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    },
    {
      id: 2,
      bg: "from-orange-400 to-pink-500",
      title: "Mega Sale on Fashion!",
      subtitle: "Up to 70% Off",
      code: "STYLE70",
      img: "https://cdn-icons-png.flaticon.com/512/3184/3184984.png",
    },
    {
      id: 3,
      bg: "from-green-400 to-teal-500",
      title: "Smartphones Bonanza!",
      subtitle: "Flat ₹5,000 Off",
      code: "MOBILE5000",
      img: "https://cdn-icons-png.flaticon.com/512/3659/3659910.png",
    },
  ];

  return (
    <div className="w-full bg-gray-50">
      {/* ================= TOP NAVBAR ================= */}
      <div className="flex flex-wrap justify-center gap-8 py-6 bg-white shadow-sm">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer hover:text-blue-600">
            <div className="bg-gray-100 p-4 rounded-full">{cat.icon}</div>
            <span className="text-sm font-medium mt-2 text-center">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* ================= SLIDER SECTION ================= */}
      <div className="w-full mt-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="mySwiper w-full h-[300px] md:h-[400px] lg:h-[450px]"
        >
          {banners.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className={`flex flex-col md:flex-row justify-between items-center h-full text-white px-8 md:px-16 bg-gradient-to-r ${item.bg}`}
              >
                {/* Text */}
                <div className="max-w-lg">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{item.title}</h2>
                  <p className="text-xl md:text-3xl font-semibold mb-4">{item.subtitle}</p>
                  <button className="bg-white text-black font-semibold px-4 py-2 rounded-lg shadow">
                    USE CODE: {item.code}
                  </button>
                </div>

                {/* Image */}
                <div className="w-40 md:w-72 lg:w-80">
                  <img src={item.img} alt={item.title} className="w-full h-auto drop-shadow-lg" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LandingPage;
