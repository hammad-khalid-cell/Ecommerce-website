// cartPersistence.js
export const saveCart = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart:", e);
  }
};

export const loadCart = () => {
  try {
    const serialized = localStorage.getItem("cart");
    return serialized ? JSON.parse(serialized) : [];
  } catch (e) {
    console.error("Failed to load cart:", e);
    return [];
  }
};
