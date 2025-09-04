import React from "react";
import {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "../redux/api/cartApiSlice";

const CartPage = () => {
  const { data: cart, isLoading } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  if (isLoading) return <p>Loading cart...</p>;

  return (
    <div>
      <h2>My Cart</h2>
      {cart?.items?.map((item) => (
        <div key={item._id}>
          <p>{item.product.name} - {item.quantity} x ${item.priceAtTime}</p>
          <button onClick={() => updateCartItem({ itemId: item._id, quantity: item.quantity + 1 })}>
            +
          </button>
          <button onClick={() => updateCartItem({ itemId: item._id, quantity: item.quantity - 1 })}>
            -
          </button>
          <button onClick={() => removeCartItem(item._id)}>Remove</button>
        </div>
      ))}

      {/* Example of adding item manually */}
      <button
        onClick={() =>
          addToCart({ productId: "PRODUCT_ID_HERE", quantity: 1 })
        }
      >
        Add Test Item
      </button>
    </div>
  );
};

export default CartPage;
