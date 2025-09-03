import React from 'react'
import ProductCard from './ProductCard';

const Products = ({ filteredProducts = [] }) => {
  return (
    <>
      {filteredProducts.map((prod) => {
        const avgRating = prod.reviews && prod.reviews.length > 0
          ? prod.reviews.reduce((acc, r) => acc + r.rating, 0) / prod.reviews.length
          : 0;

        const discountPercentage = prod.discountPercentage || 0;

        return (
          <ProductCard key={prod._id} prod={prod} avgRating={avgRating} discountPercentage={discountPercentage} />
          // <div key={prod._id} className="p-2">
          //   <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 relative group">
          //     <div className="relative h-60 w-full flex justify-center items-center p-4 bg-gray-200">
          //       <img
          //         src={prod.images?.[0]}
          //         alt={prod.name}
          //         className="max-h-full max-w-full object-contain"
          //       />
          //       {discountPercentage > 0 && (
          //         <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          //           -{discountPercentage}%
          //         </div>
          //       )}
          //       <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          //         <button className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
          //           <Heart className="h-5 w-5 text-gray-700" />
          //         </button>
          //         <button className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
          //           <Eye className="h-5 w-5 text-gray-700" />
          //         </button>
          //       </div>
          //     </div>
          //     <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white text-center opacity-0 group-hover:opacity-50 transition-opacity">
          //       <button className="w-full font-semibold">Add To Cart</button>
          //     </div>
          //     <div className="p-4">
          //       <h4 className="text-lg font-semibold truncate">{prod.name}</h4>
          //       <div className="text-red-500 font-bold mt-2">
          //         ${prod.price}{" "}
          //         {prod.originalPrice && (
          //           <span className="text-gray-400 line-through ml-2">
          //             ${prod.originalPrice}
          //           </span>
          //         )}
          //       </div>
          //       <div className="flex items-center space-x-1 text-yellow-400 mt-2">
          //         {[...Array(5)].map((_, i) => (
          //           <svg
          //             key={i}
          //             xmlns="http://www.w3.org/2000/svg"
          //             fill={i < avgRating ? "currentColor" : "none"}
          //             viewBox="0 0 24 24"
          //             stroke="currentColor"
          //             className="w-5 h-5"
          //           >
          //             <path
          //               strokeLinecap="round"
          //               strokeLinejoin="round"
          //               strokeWidth={2}
          //               d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.261a1 1 0 00.95.69h6.58c.969 0 1.371 1.24.588 1.81l-5.33 3.867a1 1 0 00-.364 1.118l2.036 6.262c.3.921-.755 1.688-1.54 1.118l-5.33-3.867a1 1 0 00-1.176 0l-5.33 3.867c-.784.57-1.838-.197-1.539-1.118l2.036-6.262a1 1 0 00-.364-1.118L2.414 11.688c-.783-.57-.38-1.81.588-1.81h6.58a1 1 0 00.95-.69l2.036-6.261z"
          //             />
          //           </svg>
          //         ))}
          //         <span className="text-gray-600 ml-2">
          //           ({prod.reviews?.length || 0})
          //         </span>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        );
      })}
    </>
  );
}

export default Products;
