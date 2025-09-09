import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetCartQuery } from "../redux/api/cart";
import { useCreateOrderMutation } from "../redux/api/order";
import { clearCart } from "../redux/slices/cartSlice";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const cartDataLocal = useSelector((state) => state.cart.items);
  const { data: backendCart } = useGetCartQuery(undefined, { skip: !user });

  const [cartItems, setCartItems] = useState([]);
  const [createOrderApi, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  // Normalize cart items for UI and backend
  const normalizeCartItems = (items = []) =>
    items.map((item) => ({
      productId: item.product?._id || item.productId,
      name: item.product?.name || item.name,
      image: item.product?.images?.[0] || item.image,
      price: item.priceAtTime || item.product?.price || item.price,
      quantity: item.quantity,
      _id: item._id,
    }));

  useEffect(() => {
    if (user && backendCart?.items) {
      setCartItems(normalizeCartItems(backendCart.items));
    } else {
      setCartItems(normalizeCartItems(cartDataLocal));
    }
  }, [user, backendCart, cartDataLocal]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

 const handlePlaceOrder = async (e) => {
  e.preventDefault();

  if (!cartItems.length) {
    alert("Your cart is empty!");
    return;
  }

  const orderData = {
    products: cartItems.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price,
    })),
    totalAmount: total,
    shippingAddress: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Lahore",
      postalCode: "54000",
      country: "Pakistan",
    },
  };

  try {
    const res = await createOrderApi(orderData).unwrap(); 
    console.log("✅ Order created:", res);

    dispatch(clearCart()); // clear cart
    alert("Order placed successfully!");
  } catch (err) {
    console.error("❌ Failed to place order:", err);
    alert("Failed to place order. Please try again.");
  }
};


  return (
    <div className="bg-gray-100 flex items-center justify-center p-4 min-h-screen">
      <div className="container mx-auto max-w-7xl bg-white rounded-lg shadow-lg p-8 md:p-12">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-8">
          <span className="hover:underline cursor-pointer">Home</span> /
          <span className="hover:underline cursor-pointer"> Cart</span> /
          <span className="font-semibold text-gray-700"> Checkout</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Billing Details
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Billing Details Form */}
          <div className="flex-1">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    First Name*
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Street Address*
                </label>
                <input
                  type="text"
                  placeholder="House number and street name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  required
                />
                <input
                  type="text"
                  placeholder="Apartment, floor, etc. (optional)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Town/City*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="flex-1 lg:max-w-lg">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Summary */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between mb-2 text-gray-600">
                  <p>Subtotal:</p>
                  <p className="font-semibold text-gray-800">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between mb-2 text-gray-600">
                  <p>Shipping:</p>
                  <p className="font-semibold text-gray-800">Free</p>
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-lg">
                  <p>Total:</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>

              {/* Payment Options */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Payment Method
                </h3>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      className="form-radio text-blue-500 h-5 w-5"
                      defaultChecked
                    />
                    <span className="ml-3 text-gray-700">Bank</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      className="form-radio text-blue-500 h-5 w-5"
                    />
                    <span className="ml-3 text-gray-700">Cash on delivery</span>
                  </label>
                </div>
              </div>

              {/* Place Order */}
              <div className="mt-8">
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-red-500 text-white font-semibold py-4 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                >
                  Place Order 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
