import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Products from "./Products";
const ExploreProducts = ({ products, type }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-12 space-y-12 container mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
          <div>
            <h2 className="text-xl font-semibold text-red-500">Our Products</h2>
            <h3 className="text-4xl font-semibold">Explore Our Products</h3>
          </div>
        </div>
        <div className="flex justify-center mt-8">
         
            <Link to={`/products/${type}/`}>

          <button className="bg-red-500 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-200 hover:bg-red-600">
            View All Products
          </button> 
           </Link>
        </div>
      </div>

      <div className="flash-sales-slider"  >


        {/* <Products products = {products}/> */}
      <Slider  {...settings}>
        {products.map((prod) => {
          const avgRating =
            prod.reviews && prod.reviews.length > 0
              ? prod.reviews.reduce((acc, r) => acc + r.rating, 0) /
                prod.reviews.length
              : 0;

          return (
            <div key={prod._id} className="p-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 relative">
                <div className="relative h-60 w-full flex justify-center items-center p-4 bg-gray-200">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -35%
                  </div>
                  <div className="absolute top-2 right-2 flex flex-col space-y-2">
                    <button className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                    <button className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white text-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="w-full font-semibold">Add To Cart</button>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold truncate">
                    {prod.name}
                  </h4>
                  <div className="text-red-500 font-bold mt-2">
                    ${prod.price}{" "}
                    <span className="text-gray-400 line-through ml-2">
                      ${prod.price + (prod.price / 100) * 35}
                    </span>
                  </div>
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 text-yellow-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < avgRating ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.261a1 1 0 00.95.69h6.58c.969 0 1.371 1.24.588 1.81l-5.33 3.867a1 1 0 00-.364 1.118l2.036 6.262c.3.921-.755 1.688-1.54 1.118l-5.33-3.867a1 1 0 00-1.176 0l-5.33 3.867c-.784.57-1.838-.197-1.539-1.118l2.036-6.262a1 1 0 00-.364-1.118L2.414 11.688c-.783-.57-.38-1.81.588-1.81h6.58a1 1 0 00.95-.69l2.036-6.261z"
                        />
                      </svg>
                    ))}
                    <span className="text-gray-600 ml-2">
                      ({prod.reviews?.length || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      </div>
    </section>
  );
};

export default ExploreProducts;
