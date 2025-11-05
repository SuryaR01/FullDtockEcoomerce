import React from "react";

const Featured = () => {
  return (
    <section className="px-6 md:px-16 py-10 bg-white">
      {/* Section Header */}
      <div className="mb-8">
        <span className="inline-block bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-semibold">
          Featured
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3">New Arrival</h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* PlayStation 5 */}
        <div className="relative col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl overflow-hidden group">
          <img
            src="https://graphicdesigneye.com/images/infographic-style-product-images.jpg"
            alt="PlayStation 5"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl md:text-2xl font-semibold">PlayStation 5</h3>
            <p className="text-sm opacity-90 mb-3">
              Black and White version of the PS5 coming out on sale.
            </p>
            <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">
              Shop Now
            </button>
          </div>
        </div>

        {/* Women's Collections */}
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1592117571616-eace2cc0be4c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=686"
            alt="Women's Collections"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">Camera Collections</h3>
            <p className="text-sm opacity-90 mb-3">
              Featured woman collections that give you another vibe.
            </p>
            <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">
              Shop Now
            </button>
          </div>
        </div>

        {/* Speakers */}
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
            alt="Speakers"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">Speakers</h3>
            <p className="text-sm opacity-90 mb-3">
              Amazon wireless speakers.
            </p>
            <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">
              Shop Now
            </button>
          </div>
        </div>

        {/* Perfume */}
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1581868608505-ace259397b88?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1014"
            alt="Mobile "
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">Mobile Acc</h3>
            <p className="text-sm opacity-90 mb-3">
              GUCCI INTENSE-OUD EDP.
            </p>
            <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">
              Shop Now
            </button>
          </div>
        </div>

          <div className="relative rounded-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1590688560938-57c514814ddb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=729"
            alt="watch"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">Smort Watch</h3>
            <p className="text-sm opacity-90 mb-3">
              GUCCI INTENSE-OUD EDP.
            </p>
            <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">
              Shop Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Featured;
