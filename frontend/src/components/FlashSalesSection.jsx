import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

const FlashSalesSection = ({products, type}) => {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date("2025-09-05T23:59:59"))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date("2025-09-17T23:59:59")));
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft(targetDate) {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const renderTime = (value) =>
    String(value).length === 1 ? `0${value}` : value;

  return (
    <section className="py-12 space-y-12 container mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
          <div>
            <h2 className="text-xl font-semibold text-red-500">Today's</h2>
            <h3 className="text-4xl font-semibold">Flash Sales</h3>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-center md:text-left">
          {Object.keys(timeLeft).length > 0 ? (
            <>
              <div>
                <span className="text-2xl font-bold">{renderTime(timeLeft.days)}</span>
                <p className="text-sm">Days</p>
              </div>
              <span className="text-red-500 text-2xl font-bold">:</span>
              <div>
                <span className="text-2xl font-bold">{renderTime(timeLeft.hours)}</span>
                <p className="text-sm">Hours</p>
              </div>
              <span className="text-red-500 text-2xl font-bold">:</span>
              <div>
                <span className="text-2xl font-bold">{renderTime(timeLeft.minutes)}</span>
                <p className="text-sm">Minutes</p>
              </div>
              <span className="text-red-500 text-2xl font-bold">:</span>
              <div>
                <span className="text-2xl font-bold">{renderTime(timeLeft.seconds)}</span>
                <p className="text-sm">Seconds</p>
              </div>
            </>
          ) : (
            <p>Flash sale has ended!</p>
          )}
        </div>
      </div>
 <div className="flash-sales-slider"  >


      <Slider  {...settings}>
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
              </div>)
        })}
      </Slider>
      </div>

      <div className="flex justify-center mt-8">
        <button className="bg-red-500 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-200 hover:bg-red-600">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default FlashSalesSection;