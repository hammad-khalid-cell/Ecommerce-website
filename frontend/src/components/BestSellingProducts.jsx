import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const BestSellingProducts = ({ products, type }) => {
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
            <h2 className="text-xl font-semibold text-red-500">This Month</h2>
            <h3 className="text-4xl font-semibold">Best Selling Products</h3>
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
      <div className="flash-sales-slider">
        <Slider {...settings}>
          {products.map((prod) => {
            const avgRating =
              prod.reviews && prod.reviews.length > 0
                ? prod.reviews.reduce((acc, r) => acc + r.rating, 0) /
                  prod.reviews.length
                : 0;
                    const discountPercentage = prod.discountPercentage || 0;
            return (
              <div key={prod._id} className="p-2">
                <ProductCard
                  prod={prod}
                  avgRating={avgRating}
                  discountPercentage={discountPercentage}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default BestSellingProducts;
