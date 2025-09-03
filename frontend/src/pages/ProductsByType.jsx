import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/products";
import Products from "../components/Products";

const ProductsByType = () => {
  const { type, name } = useParams();
  console.log("params:", { type, name });

  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading products.
      </div>
    );
  }

  let filteredProducts = [];

  if (type === "flashSale") {
    filteredProducts = products?.filter(
      (prod) => prod.discountPercentage && prod.discountPercentage > 0
    );
  } else if (type === "byCategory") {
    filteredProducts = products?.filter(
      (prod) => prod.category === name || prod.category?.name === name
    );
  } else if (type === "bestSelling") {
    console.log("this is the best selling");
    
    filteredProducts = [...products]
      .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0))
      .slice(0, 10); // top 10
  } else if (type === "exploreProduct") {
    
    filteredProducts = [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 12); // latest 12
  }

  console.log("filtered products", filteredProducts);

  return (
    <section className="py-12 container mx-auto px-4 md:px-0">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
        <h3 className="text-4xl font-semibold capitalize">{name || type}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          <Products filteredProducts={filteredProducts} />
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No products
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsByType;
