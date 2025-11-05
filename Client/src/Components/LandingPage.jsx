import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const LandingPage = () => {
  const categories = [
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  const banners = [
    {
      id: 1,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
      btnText: "Shop Now",
      bgImg:
        "https://graphicdesigneye.com/images/product-with-accessories.jpg",
    },
    {
      id: 2,
      title: "Smart Watch Collection",
      subtitle: "Flat 40% Off",
      btnText: "Explore Now",
      bgImg:
        "https://graphicdesigneye.com/assets/uploads/blogs/2025/Jul/04072025_68677e2d29c29.jpg",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-sm border rounded-lg overflow-hidden">
      {/* LEFT CATEGORY MENU */}
      <div className="hidden md:flex flex-col w-full md:w-1/4 border-r bg-white">
        <ul className="py-4">
          {categories.map((cat, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-200"
            >
              <span>{cat}</span>
              <FaAngleRight className="text-gray-400" />
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SLIDER SECTION */}
      <div className="w-full md:w-3/4 p-2">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-[250px] md:h-[350px] lg:h-[450px] rounded-lg overflow-hidden"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div
                className="relative flex items-center justify-start h-full text-white px-8 md:px-14 rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${banner.bgImg})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat : "no-repeat",
                  backgroundPosition: "start",
                }}
              >
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* TEXT CONTENT */}
                <div className="relative z-10 max-w-md">
                  <h3 className="text-lg md:text-2xl font-semibold opacity-80">
                    {banner.title}
                  </h3>
                  <h2 className="text-2xl md:text-4xl font-bold my-3 leading-tight">
                    {banner.subtitle}
                  </h2>
                  <button className="bg-white text-black px-5 py-2 mt-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                    {banner.btnText} →
                  </button>
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
