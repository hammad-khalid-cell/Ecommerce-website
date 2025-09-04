import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";

const CartPage = () => {
  const cartDataLocal = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (Array.isArray(cartDataLocal)) {
      setCartItems(cartDataLocal);
    }
  }, [cartDataLocal]);


  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id)); // removes from Redux + localStorage
  };


  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId: id, quantity: newQuantity }));
    

  };

  // ✅ Totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 0 : 0; // free shipping
  const total = subtotal + shipping;

  return (
    <section className="py-12 container mx-auto px-4 md:px-0">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        / Cart
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-5 font-semibold text-center border-b pb-4 text-gray-500">
        <div className="text-left">Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
        <div>Action</div>
      </div>

      {/* Cart Items */}
      <div className="space-y-6 md:space-y-0">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="grid grid-cols-1 md:grid-cols-5 items-center text-center py-4 border-b"
          >
            {/* Product */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain"
              />
              <span className="text-lg font-medium">{item.name}</span>
            </div>

            {/* Price */}
            <div className="mb-2 md:mb-0 text-gray-700">
              ${item.price.toFixed(2)}
            </div>

            {/* Quantity */}
            <div className="flex justify-center mb-2 md:mb-0">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  className="px-3 py-1 text-gray-500 hover:bg-gray-100 transition-colors rounded-l-lg"
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.productId, parseInt(e.target.value) || 0)
                  }
                  className="w-12 text-center bg-transparent"
                />
                <button
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  className="px-3 py-1 text-gray-500 hover:bg-gray-100 transition-colors rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="text-gray-700 font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            {/* Remove */}
            <div>
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start mt-8 space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-4 md:w-1/2">
          <div className="flex space-x-4">
            <Link to="/">
              <button className="border border-gray-400 py-3 px-6 rounded-md hover:bg-gray-100 transition-colors">
                Return To Shop
              </button>
            </Link>
          </div>
        </div>

        <div className="border border-gray-400 rounded-md p-6 w-full md:w-1/3">
          <h4 className="text-xl font-semibold mb-4">Cart Total</h4>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-red-500 text-white font-semibold py-3 mt-6 rounded-md hover:bg-red-600 transition-colors">
            Proceed to checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
