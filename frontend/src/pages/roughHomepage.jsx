import React, { useState, useEffect } from "react";
import { Heart, Eye, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useGetProductByIdQuery } from "../redux/api/products";
import { useParams } from "react-router-dom";
import { useAddToCartMutation } from "../redux/api/cart";
import { addToCart } from "../redux/slices/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [addToCartApi] = useAddToCartMutation();
  
    const handleAddToCart = async () => {
      try {
        if (user) {
          await addToCartApi({
            productId: prod._id,
            quantity: 1,
            userId: user._id,
          }).unwrap();
  
          toast.success(` Added to cart !`);
        } else {
          dispatch(
            addToCart({
              productId: prod._id,
              name: prod.name,
              price: prod.price,
              image: prod.images?.[0],
              quantity: 1,
            })
          );
  
          toast.success(` Added to cart !`);
        }
      } catch (err) {
        toast.error("Failed to add item to cart ❌");
        console.error("Error while adding the product to cart", err);
      }
    };
  

  // Use hardcoded data directly
  const defaultColors = ["red", "blue", "black"];
  const defaultSizes = ["S", "M", "L", "XL"];

  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(defaultColors[0]);
  const [selectedSize, setSelectedSize] = useState(defaultSizes[0]);
  const [stock, setStock] = useState(1);

  useEffect(() => {
    if (product) {
      setMainImage(product.images?.[0] || null);
      setStock(product.stock || 1);
      // Since you don't have these properties from the API,
      // you should not try to set state based on them.
      // The initial state set above is what you want.
    }
  }, [product]);

  if (isLoading) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error loading product.</div>;
  }

  if (!product) {
    return <div className="text-center py-20 text-gray-500">No product found.</div>;
  }
  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
      : 0;

  const relatedProducts = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: 120,
      originalPrice: 160,
      discount: 40,
      rating: 4.5,
      reviews: 88,
      image: "https://i.imgur.com/m2X2T8o.png",
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: 960,
      originalPrice: 1160,
      discount: 35,
      rating: 4.0,
      reviews: 75,
      image: "https://i.imgur.com/c6F25eQ.png",
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: 370,
      originalPrice: 400,
      discount: 30,
      rating: 5.0,
      reviews: 99,
      image: "https://i.imgur.com/b5u4jYc.png",
    },
    {
      id: 4,
      name: "RGB Liquid CPU Cooler",
      price: 160,
      originalPrice: 170,
      discount: 25,
      rating: 4.5,
      reviews: 65,
      image: "https://i.imgur.com/c6F25eQ.png",
    },
  ];
  const StarRating = ({ rating, reviews }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const star = "⭐";

    return (
      <div className="flex items-center text-yellow-400 text-lg">
        <div className="flex">
          {[...Array(fullStars)].map((_, i) => (
            <span key={`full-${i}`}>{star}</span>
          ))}
          {hasHalfStar && <span className="text-gray-400">½</span>}
          {[...Array(emptyStars)].map((_, i) => (
            <span key={`empty-${i}`} className="opacity-30">
              {star}
            </span>
          ))}
        </div>
        <span className="text-gray-500 text-sm ml-2">({reviews} Reviews)</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-0 py-12">
      {/* Main Product View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Left Section: Images */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-4">
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto w-full lg:w-32">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition-colors duration-200 ${
                  mainImage === img
                    ? "border-red-500"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="flex-1 max-h-[500px] flex items-center justify-center p-8 bg-gray-100 rounded-lg">
            <img
              src={mainImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <div className="flex items-center space-x-2">
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
                ({product.reviews?.length || 0})
              </span>
            </div>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm font-semibold text-green-500">
              {product.status}
            </span>
          </div>
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-600 border-b border-gray-300 pb-4">
            {product.description}
          </p>

          {/* Color Selector */}
          <div>
            <span className="text-sm font-semibold">Colours:</span>
            <div className="flex space-x-2 mt-2">
              {/* Change this to use the hardcoded array */}
              {defaultColors.map((color, index) => (
                <div
                  key={index}
                  className={`w-5 h-5 rounded-full cursor-pointer border-2 ${
                    selectedColor === color
                      ? "border-gray-600"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <span className="text-sm font-semibold">Size:</span>
            <div className="flex space-x-2 mt-2">
              {/* Change this to use the hardcoded array */}
              {defaultSizes.map((size, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 border rounded-md font-semibold transition-colors duration-200 ${
                    selectedSize === size
                      ? "bg-red-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Action Buttons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-400 rounded-md">
              <button
                className="p-2 border-r border-gray-400 text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                onClick={() => setStock((prev) => Math.max(1, prev - 1))}
              >
                <Minus size={20} />
              </button>
              <span className="w-12 text-center text-lg">{stock}</span>
              <button
                className="p-2 border-l border-gray-400 text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                onClick={() => setStock((prev) => prev + 1)}
              >
                <Plus size={20} />
              </button>
            </div>
            <button className="flex-1 bg-red-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-600 transition-colors">
              Buy Now
            </button>
            <button className="p-3 border border-gray-400 rounded-md text-gray-700 hover:bg-red-500 hover:text-white transition-colors">
              <Heart size={24} />
            </button>
          </div>

          {/* Delivery and Return Info */}
          <div className="border border-gray-300 rounded-lg mt-4">
            <div className="flex items-center p-4 border-b border-gray-300">
              <Truck size={24} className="mr-4" />
              <div>
                <h5 className="font-semibold">Free Delivery</h5>
                <p className="text-sm text-gray-600">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-center p-4">
              <RotateCcw size={24} className="mr-4" />
              <div>
                <h5 className="font-semibold">Return Delivery</h5>
                <p className="text-sm text-gray-600">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      <div className="py-12 space-y-8">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
          <h2 className="text-xl font-semibold">Related Item</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedProducts.map((prod) => (
            <div key={prod.id} className="relative group">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64 overflow-hidden relative">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="max-h-full max-w-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{prod.discount}%
                </div>
                <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition-colors">
                    <Heart size={20} />
                  </div>
                  <div className="bg-white p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition-colors">
                    <Eye size={20} />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold">{prod.name}</h4>
                <div className="flex items-center space-x-2 my-1">
                  <span className="text-red-500 font-semibold">
                    ${prod.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${prod.originalPrice.toFixed(2)}
                  </span>
                </div>
                <StarRating rating={prod.rating} reviews={prod.reviews} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;