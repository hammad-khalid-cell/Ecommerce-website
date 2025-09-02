import React from 'react';
import image1 from "../assets/images/women.png"
import image2 from "../assets/images/speakers.png"
import image3 from "../assets/images/ps5.png"
import image4 from "../assets/images/perfume.png"

const NewArrival = () => {
  return (
    <section className="py-12 space-y-8 container mx-auto px-4 md:px-0">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
        <h2 className="text-xl font-semibold text-red-500">Featured</h2>
        <h3 className="text-4xl font-semibold text-black">New Arrival</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Large Left Card - PlayStation 5 */}
        <div
          className="relative bg-black h-[600px] md:row-span-2 overflow-hidden rounded-lg shadow-lg bg-center object-contain bg-no-repeat  "
          // Corrected: Added background-size and background-position
          style={{ backgroundImage: `url(${image3})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white z-10 p-4">
            <h4 className="text-3xl font-bold mb-2">PlayStation 5</h4>
            <p className="text-sm font-light mb-4 max-w-sm">
              Black and White version of the PS5 coming out on sale.
            </p>
            <a href="#" className="border-b-2 border-white pb-1 font-medium transition-colors duration-200 hover:text-gray-300 hover:border-gray-300">
              Shop Now
            </a>
          </div>
        </div>

        {/* Smaller Top-Right Card - Women's Collections */}
        <div
          className="relative bg-black  h-[284px]  overflow-hidden rounded-lg shadow-lg  bg-right object-contain bg-no-repeat"
          // Corrected: Added background-size and background-position
          style={{ backgroundImage: `url(${image1})` }}
        >
          {/* <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent"></div> */}
          
          <div className="absolute bottom-8 left-8 text-white z-10 p-4">
            <h4 className="text-2xl font-bold mb-2">Women's Collections</h4>
            <p className="text-xs font-light mb-4 max-w-xs">
              Featured women collections that give you another vibe.
            </p>
            <a href="#" className="border-b-2 border-white pb-1 font-medium transition-colors duration-200 hover:text-gray-300 hover:border-gray-300">
              Shop Now
            </a>
          </div>
        </div>

        {/* Grid for the two bottom-right cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Bottom-Right Card 1 - Speakers */}
          <div
            className="relative bg-black h-[284px] overflow-hidden object-contain rounded-lg shadow-lg bg-center bg-no-repeat"
            // Corrected: Added background-size and background-position
            style={{ backgroundImage: `url(${image2})`,  backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white z-10 p-4">
              <h4 className="text-2xl font-bold mb-2">Speakers</h4>
              <p className="text-xs font-light mb-4">
                Amazon wireless speakers
              </p>
              <a href="#" className="border-b-2 border-white pb-1 font-medium transition-colors duration-200 hover:text-gray-300 hover:border-gray-300">
                Shop Now
              </a>
            </div>
          </div>

          {/* Bottom-Right Card 2 - Perfume */}
          <div
            className="relative bg-black   h-[284px] overflow-hidden rounded-lg object-contain  shadow-lg bg-center bg-no-repeat"
            // Corrected: Added background-size and background-position
            style={{ backgroundImage: `url(${image4})`, backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white z-10 p-4">
              <h4 className="text-2xl font-bold mb-2">Perfume</h4>
              <p className="text-xs font-light mb-4">
                GUCCI INTENSE OUD EDP
              </p>
              <a href="#" className="border-b-2 border-white pb-1 font-medium transition-colors duration-200 hover:text-gray-300 hover:border-gray-300">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;