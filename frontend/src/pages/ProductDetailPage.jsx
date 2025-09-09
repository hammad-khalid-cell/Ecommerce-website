import React, { useState, useEffect } from "react";
import { Heart, Eye, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useGetProductByIdQuery } from "../redux/api/products";
import { useParams } from "react-router-dom";
import { useAddToCartMutation } from "../redux/api/cart";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [addToCartApi] = useAddToCartMutation();

  const [mainImage, setMainImage] = useState(null);
  const [initialQuantity, setInitialQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setMainImage(product.images?.[0] || null);
      setInitialQuantity(product.quantity || 1);
    }
  }, [product]);
  

  const handleAddToCart = async () => {
    try {
      if (user) {
        await addToCartApi({
          productId: product._id,
          quantity: initialQuantity,
          userId: user._id,
        }).unwrap();
        toast.success("Item added to cart ✅");
      } else {
        dispatch(
          addToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            quantity: initialQuantity,
          })
        );
        toast.success("Item added to cart ✅");
      }
    } catch (err) {
      toast.error("Failed to add item ❌");
      console.error("Error while adding the product to cart", err);
    }
  };

  if (isLoading)
    return <div className="text-center py-20">Loading product...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading product.
      </div>
    );
  if (!product)
    return (
      <div className="text-center py-20 text-gray-500">No product found.</div>
    );

  return (
    <div className="container mx-auto px-4 md:px-0 py-12">
      {/* Main Product View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Left images code ... */}
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
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-600 border-b border-gray-300 pb-4">
            {product.description}
          </p>

          {/* Quantity and Action Buttons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-400 rounded-md">
              <button
                className="p-2 border-r border-gray-400 text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                onClick={() => setInitialQuantity((prev) => Math.max(1, prev - 1))}
              >
                <Minus size={20} />
              </button>
              <span className="w-12 text-center text-lg">{initialQuantity}</span>
              <button
                className="p-2 border-l border-gray-400 text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                onClick={() => setInitialQuantity((prev) => prev + 1)}
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Buy Now button */}
            <button className="flex-1 bg-red-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-600 transition-colors">
              Buy Now
            </button>
          </div>

          {/* ✅ Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>

          {/* Delivery and return info ... */}
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
     
    </div>
  );
};

export default ProductDetailPage;
