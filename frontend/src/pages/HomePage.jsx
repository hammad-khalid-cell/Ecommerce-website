import React, { useState, useEffect } from "react";
import { slides } from "../assets/images/slides";
import { useGetProductsQuery } from "../redux/api/products";
import { useDispatch } from "react-redux";
import { setProducts, clearProducts } from "../redux/slices/ProductSlice";
import { setCategory } from "../redux/slices/categorySlice";
import FlashSalesSection from "../components/flashSalesSection";
import BrowseByCategory from "../components/BrowseByCategory";
import { useGetCategoryQuery } from "../redux/api/category";
import BestSellingProducts from "../components/BestSellingProducts";
import ExploreProducts from "../components/ExploreProducts";
import { Truck, Headphones, ShieldCheck, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NewArrival from "../components/NewArrival";
import { useAddToCartMutation } from "../redux/api/cart";
import { clearCart } from "../redux/slices/cartSlice";


const HomePage = () => {
  const dispatch = useDispatch();
  const cartDataLocal =  useSelector((state)=> state.cart.items);
  const {user} =  useSelector((state)=> state.user) 
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: productsData } = useGetProductsQuery();
  const { data: categoryData } = useGetCategoryQuery();
  // const [cartDataLocal , setcartDataLocal] =  useState([]);
  const [addToCartApi] =  useAddToCartMutation();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const type = "";
  const settings = {
    dots: true,
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

  const mergeCart = async () => {
  if (cartDataLocal.length > 0 && user?._id) {
    try {
      for (const item of cartDataLocal) {
        await addToCartApi({
          userId: user._id,
          productId: item.productId,
          quantity: item.quantity,
        }).unwrap();
      }

      console.log("Cart merged to backend ✅");

      dispatch(clearCart());
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Error merging cart:", err);
    }
  }
};
   useEffect(() => {
  if (user?._id && cartDataLocal.length > 0) {
    mergeCart();
  }
}, [user?._id]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    dispatch(setProducts(productsData));
    dispatch(setCategory(categoryData));
    console.log("this is the products data", productsData);
    console.log("this is the category data", categoryData);
    console.log("this is the cart data", cartDataLocal);
  }, [productsData]);

  


  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row ">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white p-6 shadow-lg md:shadow-md flex-shrink-0">
          <nav>
            <ul className="space-y-1">
              {categoryData?.map((cat, index) => (
                <li key={index}>
                  <Link to={`/products/byCategory/${cat.name}`}>
                    <p
                      className="block text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      {cat.name}
                    </p>
                  </Link>
                </li>
              ))}
              {/* Nav Item with sub-menu indicator */}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8">
          {/* Hero Banner */}
          <div className="relative w-full h-[344px] rounded-xl overflow-hidden shadow-lg bg-black text-white p-8 flex items-center justify-between transition-colors duration-500">
            {/* Background Image or Gradient (using a gradient for a clean look) */}
            <div className="absolute inset-0 z-0 bg-black"></div>

            {/* Text Content */}
            <div className="relative z-10 flex flex-col space-y-8 max-w-sm">
              <p className="text-md font-semibold text-white">
                {slides[currentSlide].subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {slides[currentSlide].title}
              </h1>
              <a
                href="#"
                className="flex items-center space-x-2 text-white font-semibold group"
              >
                <span>Shop Now</span>
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>

            {/* Image Placeholder */}
            <div className="relative z-10 flex-shrink-0 hidden lg:block">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-64 md:w-120 h-auto object-contain"
              />
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-opacity duration-300 ${
                    index === currentSlide
                      ? "bg-white opacity-100"
                      : "bg-white opacity-50"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </main>
      </div>

      <div className="py-12 space-y-12">
        <FlashSalesSection products={productsData || []} type="flashSale" />
        <div className="h-1 bg-gray-200 w-full mx-8 m-4"></div>
        <BrowseByCategory categories={categoryData || []} type="byCategory" />
        <div className="h-1 bg-gray-200 w-full mx-8 m-4"></div>
        <BestSellingProducts products={productsData || []} type="bestSelling" />
        <div className="h-1 bg-gray-200 w-full mx-8 m-4"></div>
        <ExploreProducts products={productsData || []} type="exploreProduct" />
        <div className="h-1 bg-gray-200 w-full mx-8 m-4"></div>
        <NewArrival />

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-0">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-20">
              {/* Feature 1: Free and Fast Delivery */}
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6">
                  <Truck size={36} color="white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  FREE AND FAST DELIVERY
                </h3>
                <p className="text-sm font-normal">
                  Free delivery for all orders over $140
                </p>
              </div>

              {/* Feature 2: 24/7 Customer Service */}
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6">
                  <Headphones size={36} color="white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  24/7 CUSTOMER SERVICE
                </h3>
                <p className="text-sm font-normal">
                  Friendly 24/7 customer support
                </p>
              </div>

              {/* Feature 3: Money Back Guarantee */}
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck size={36} color="white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  MONEY BACK GUARANTEE
                </h3>
                <p className="text-sm font-normal">
                  We return money within 30 days
                </p>
              </div>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 p-2 rounded-full shadow-lg"
          >
            <ArrowUp size={24} className="text-gray-700" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
