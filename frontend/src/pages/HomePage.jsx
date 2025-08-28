import React, { useState, useEffect } from 'react';



// Main HomePage component
const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  

  const slides = [
    {
      title: "Up to 10% off Voucher",
      subtitle: "iPhone 14 Series",
      image: "https://placehold.co/400x400/000000/ffffff?text=iPhone"
    },
    {
      title: "New Arrivals",
      subtitle: "Summer Collection",
      image: "https://placehold.co/400x400/000000/ffffff?text=Summer"
    },
    {
      title: "Limited Edition",
      subtitle: "Gaming Gear",
      image: "https://placehold.co/400x400/000000/ffffff?text=Gaming"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [slides.length]);

  return (
    <div className="bg-gray-100 min-h-screen">
      
      <div className="flex flex-col md:flex-row ">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white p-6 shadow-lg md:shadow-md flex-shrink-0">
          <nav>
            <ul className="space-y-1">
              {/* Nav Item with sub-menu indicator */}
              <li className="group">
                <a href="#" className="flex justify-between items-center text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 sidebar-item">
                  <span>Woman's Fashion</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 arrow-icon transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
              <li className="group">
                <a href="#" className="flex justify-between items-center text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 sidebar-item">
                  <span>Men's Fashion</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 arrow-icon transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
              {/* Nav Items without sub-menu indicator */}
              <li>
                <a href="#" className="block text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">Electronics</a>
              </li>
              <li>
                <a href="#" className="block text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">Home & Lifestyle</a>
              </li>
              <li>
                <a href="#" className="block text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">Medicine</a>
              </li>
              <li>
                <a href="#" className="block text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">Sports & Outdoor</a>
              </li>
              <li>
                <a href="#" className="block text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">Baby's & Toys</a>
              </li>
              <li>
                <a href="#" className="block text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">Groceries & Pets</a>
              </li>
              <li>
                <a href="#" className="block text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">Health & Beauty</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8">
          {/* Hero Banner */}
          <div className="relative w-full h-[344px] rounded-xl overflow-hidden shadow-lg bg-black text-white p-8 flex items-center justify-between transition-colors duration-500">
            {/* Background Image or Gradient (using a gradient for a clean look) */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black"></div>

            {/* Text Content */}
            <div className="relative z-10 flex flex-col space-y-4 max-w-sm">
              <p className="text-sm font-semibold text-gray-400">{slides[currentSlide].subtitle}</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">{slides[currentSlide].title}</h1>
              <a href="#" className="flex items-center space-x-2 text-white font-semibold group">
                <span>Shop Now</span>
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            {/* Image Placeholder */}
            <div className="relative z-10 flex-shrink-0 hidden lg:block">
              <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-64 md:w-80 h-auto object-contain" />
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-opacity duration-300 ${index === currentSlide ? 'bg-white opacity-100' : 'bg-white opacity-50'}`}
                ></button>
              ))}
            </div>
          </div>
        </main>
      </div>
      

      <div className='py-12 space-y-12'>
        
       <section>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
              <h2 className="text-xl font-semibold text-red-500">
                Today's
              </h2>
              <h3 className="text-4xl font-semibold">
                Flash Sales
              </h3>
            </div>
            {/* Countdown and Products grid would go here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Product Card - Example */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative">
                  <img src="https://placehold.co/300x200/F5F5F5/4B5563?text=Controller" alt="Controller" className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-35%</div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold">HAVIT HV-G92 Gamepad</h4>
                  <div className="text-red-500 font-bold mt-2">$120 <span className="text-gray-400 line-through ml-2">$160</span></div>
                  <div className="flex items-center space-x-1 text-yellow-400 mt-2">
                    {/* Stars would go here */}
                    <span>(88)</span>
                  </div>
                </div>
              </div>
              {/* Repeat Product Card for other items */}
            </div>
            <div className="flex justify-center mt-8">
              <button className="bg-red-500 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-200 hover:bg-red-600">
                View All Products
              </button>
            </div>
          </section>

      </div>
    </div>
  );
};

export default HomePage;
