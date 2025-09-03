import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

// Import all necessary icons from lucid-react
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad,
  HeartPulse,
  ShoppingBasket,
  Shirt,
  Rose,
  PersonStanding,
} from 'lucide-react';

const BrowseByCategory = ({ categories, type }) => {
  // Create a ref to access the slider methods
  const sliderRef = useRef(null);
  

  // Mapping object to link category names to Lucid icons
  const iconMap = {
    'Electronics': Monitor,
    'Home & Lifestyle': Watch,
    'Medicine': HeartPulse,
    'Sports & Outdoor': Gamepad,
    'Baby’s & Toys': Camera,
    'Groceries & Pets': ShoppingBasket,
    'Health & Beauty': HeartPulse,
    'Woman’s Fashion': Rose,
    'Men’s Fashion': PersonStanding,
  };

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  const handleWheel = (e) => {
    // Check if the scroll direction is horizontal
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault(); // Prevent default vertical scrolling behavior

      if (sliderRef.current) {
        if (e.deltaX > 0) {
          // Swipe right (scrolls left), move to next slide
          sliderRef.current.slickNext();
        } else {
          // Swipe left (scrolls right), move to previous slide
          sliderRef.current.slickPrev();
        }
      }
    }
  };

  return (
    <section className="py-12 space-y-12 container mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
          <div>
            <h2 className="text-xl font-semibold text-red-500">Categories</h2>
            <h3 className="text-4xl font-semibold">Browse By Category</h3>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {/* Custom navigation arrows */}
          <div className="slick-prev bg-gray-200 hover:bg-gray-300 rounded-full p-2 cursor-pointer transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="slick-next bg-gray-200 hover:bg-gray-300 rounded-full p-2 cursor-pointer transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flash-sales-slider">


      <Slider  {...settings} ref={sliderRef} onWheel={handleWheel}>
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.name];
          
          if (!IconComponent) return null;
          
          return (
            <Link to={`/products/${type}/${category.name}`}>
            <div key={index} className="p-2">
              <div className="flex flex-col items-center justify-center p-8 border border-gray-300 rounded-lg h-40 w-full hover:bg-red-500 hover:text-white transition-colors duration-200 cursor-pointer">
                <IconComponent size={40} className="mb-4" strokeWidth={1.5} />
                <span className="text-center font-medium">{category.name}</span>
              </div>
            </div>

            </Link>
            
          );
        })}
      </Slider>
</div>

    </section>
  );
};

export default BrowseByCategory;