// // src/App.js
// // This is the main entry point for your application.
// // It sets up the main container and renders the AdminPanel component.
// import React from 'react';
// import AdminPanel from './AdminPanel';

// export default function App() {
//   return (
//     <div className="bg-gray-100 min-h-screen font-sans antialiased">
//       <AdminPanel />
//     </div>
//   );
// }
// ```react
// // src/AdminPanel.js
// // This component manages the main application state, including authentication,
// // current view, and mock data. It renders the Sidebar and the appropriate
// // content section based on the current view.
// import React, { useState, useEffect } from 'react';
// import Dashboard from './Dashboard';
// import CategoriesSection from './CategoriesSection';
// import ProductsSection from './ProductsSection';
// import Settings from './Settings';

// // Data for demonstration purposes. In a real app, this would come from a backend API.
// const mockCategories = [
//   { id: '1', name: 'Electronics', description: 'Gadgets and gizmos', created: '2023-01-15' },
//   { id: '2', name: 'Apparel', description: 'Clothing and accessories', created: '2023-02-20' },
//   { id: '3', name: 'Home Goods', description: 'Furniture and decor', created: '2023-03-10' },
// ];

// const mockProducts = [
//   { id: 'p1', name: 'Laptop', categoryId: '1', categoryName: 'Electronics', price: 1200, stock: 50, status: 'Active' },
//   { id: 'p2', name: 'T-Shirt', categoryId: '2', categoryName: 'Apparel', price: 25, stock: 200, status: 'Active' },
//   { id: 'p3', name: 'Desk Lamp', categoryId: '3', categoryName: 'Home Goods', price: 45, stock: 75, status: 'Inactive' },
// ];

// export default function AdminPanel() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [categories, setCategories] = useState(mockCategories);
//   const [products, setProducts] = useState(mockProducts);
//   const [isAddingCategory, setIsAddingCategory] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [isAddingProduct, setIsAddingProduct] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   useEffect(() => {
//     // In a real app, this would be a more robust token/role check
//     const checkAuth = () => {
//       setIsAdmin(true); 
//     };
//     checkAuth();
//   }, []);

//   // --- Category Handlers ---
//   const handleAddCategory = (newCategory) => {
//     setCategories([...categories, { ...newCategory, id: Date.now().toString(), created: new Date().toISOString().slice(0, 10) }]);
//     setIsAddingCategory(false);
//   };

//   const handleEditCategory = (updatedCategory) => {
//     setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
//     setEditingCategory(null);
//   };

//   const handleDeleteCategory = (id) => {
//     setCategories(categories.filter(cat => cat.id !== id));
//     setProducts(products.filter(prod => prod.categoryId !== id));
//   };

//   // --- Product Handlers ---
//   const handleAddProduct = (newProduct) => {
//     const category = categories.find(cat => cat.id === newProduct.categoryId);
//     const newProductWithDetails = {
//       ...newProduct,
//       id: Date.now().toString(),
//       categoryName: category ? category.name : 'Unknown',
//     };
//     setProducts([...products, newProductWithDetails]);
//     setIsAddingProduct(false);
//   };

//   const handleEditProduct = (updatedProduct) => {
//     const category = categories.find(cat => cat.id === updatedProduct.categoryId);
//     const updatedProductWithDetails = {
//       ...updatedProduct,
//       categoryName: category ? category.name : 'Unknown',
//     };
//     setProducts(products.map(prod => prod.id === updatedProduct.id ? updatedProductWithDetails : prod));
//     setEditingProduct(null);
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter(prod => prod.id !== id));
//   };

//   if (!isAdmin) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <h1 className="text-xl font-semibold">Access Denied. Please log in as an administrator.</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white shadow-xl flex flex-col p-4 space-y-4">
//         <div className="text-2xl font-bold p-4">Admin Panel</div>
//         <nav className="flex-1">
//           <ul>
//             <li>
//               <button 
//                 onClick={() => {
//                   setCurrentView('dashboard');
//                   setIsAddingCategory(false);
//                   setIsAddingProduct(false);
//                   setEditingCategory(null);
//                   setEditingProduct(null);
//                 }} 
//                 className={"w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " + (currentView === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700')}
//               >
//                 🏠 Dashboard
//               </button>
//             </li>
//             <li className="mt-2">
//               <button 
//                 onClick={() => {
//                   setCurrentView('categories');
//                   setIsAddingCategory(false);
//                   setIsAddingProduct(false);
//                   setEditingCategory(null);
//                   setEditingProduct(null);
//                 }} 
//                 className={"w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " + (currentView === 'categories' ? 'bg-gray-700' : 'hover:bg-gray-700')}
//               >
//                 📂 Categories
//               </button>
//             </li>
//             <li className="mt-2">
//               <button 
//                 onClick={() => {
//                   setCurrentView('products');
//                   setIsAddingCategory(false);
//                   setIsAddingProduct(false);
//                   setEditingCategory(null);
//                   setEditingProduct(null);
//                 }} 
//                 className={"w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " + (currentView === 'products' ? 'bg-gray-700' : 'hover:bg-gray-700')}
//               >
//                 📦 Products
//               </button>
//             </li>
//             <li className="mt-2">
//               <button 
//                 onClick={() => {
//                   setCurrentView('settings');
//                   setIsAddingCategory(false);
//                   setIsAddingProduct(false);
//                   setEditingCategory(null);
//                   setEditingProduct(null);
//                 }} 
//                 className={"w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " + (currentView === 'settings' ? 'bg-gray-700' : 'hover:bg-gray-700')}
//               >
//                 ⚙️ Settings
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800 capitalize">{currentView}</h1>
        
//         {/* Render content based on currentView */}
//         {currentView === 'dashboard' && <Dashboard categories={categories} products={products} />}
//         {currentView === 'categories' && 
//           <CategoriesSection 
//             categories={categories}
//             isAdding={isAddingCategory}
//             setIsAdding={setIsAddingCategory}
//             editingCategory={editingCategory}
//             setEditingCategory={setEditingCategory}
//             onAdd={handleAddCategory}
//             onEdit={handleEditCategory}
//             onDelete={handleDeleteCategory}
//           />
//         }
//         {currentView === 'products' && 
//           <ProductsSection 
//             products={products}
//             categories={categories}
//             isAdding={isAddingProduct}
//             setIsAdding={setIsAddingProduct}
//             editingProduct={editingProduct}
//             setEditingProduct={setEditingProduct}
//             onAdd={handleAddProduct}
//             onEdit={handleEditProduct}
//             onDelete={handleDeleteProduct}
//           />
//         }
//         {currentView === 'settings' && <Settings />}
//       </main>
//     </div>
//   );
// }
// ```react
// // src/Dashboard.js
// // This component displays quick statistics for the admin panel.
// import React from 'react';

// export default function Dashboard({ categories, products }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
//         <h3 className="text-lg font-semibold text-gray-600">Total Categories</h3>
//         <p className="text-4xl font-bold text-gray-900 mt-2">{categories.length}</p>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
//         <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
//         <p className="text-4xl font-bold text-gray-900 mt-2">{products.length}</p>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
//         <h3 className="text-lg font-semibold text-gray-600">Active Products</h3>
//         <p className="text-4xl font-bold text-gray-900 mt-2">{products.filter(p => p.status === 'Active').length}</p>
//       </div>
//     </div>
//   );
// }
// ```react
// // src/CategoriesSection.js
// // This component displays the list of categories and handles the display of
// // the add/edit category forms.
// import React from 'react';
// import CategoryForm from './CategoryForm';

// export default function CategoriesSection({ categories, isAdding, setIsAdding, editingCategory, setEditingCategory, onAdd, onEdit, onDelete }) {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold text-gray-800">Manage Categories</h2>
//         <button 
//           onClick={() => setIsAdding(true)} 
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
//         >
//           Add New Category
//         </button>
//       </div>

//       {(isAdding || editingCategory) ? (
//         <CategoryForm 
//           onSave={editingCategory ? onEdit : onAdd}
//           initialData={editingCategory}
//           onCancel={() => {
//             setIsAdding(false);
//             setEditingCategory(null);
//           }}
//         />
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {categories.map(cat => (
//                 <tr key={cat.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">{cat.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{cat.description}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{cat.created}</td>
//                   <td className="px-6 py-4 whitespace-nowrap space-x-2">
//                     <button 
//                       onClick={() => setEditingCategory(cat)} 
//                       className="text-indigo-600 hover:text-indigo-900"
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => onDelete(cat.id)} 
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// ```react
// // src/CategoryForm.js
// // This component provides the form for adding or editing a category.
// import React, { useState } from 'react';

// export default function CategoryForm({ onSave, initialData, onCancel }) {
//   const [formData, setFormData] = useState(initialData || { name: '', description: '', image: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
//       <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Category' : 'Add New Category'}</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Name</label>
//           <input 
//             type="text" 
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Description</label>
//           <textarea 
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Image URL (Optional)</label>
//           <input 
//             type="text" 
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="flex space-x-4">
//           <button 
//             type="submit" 
//             className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
//           >
//             Save Category
//           </button>
//           <button 
//             type="button" 
//             onClick={onCancel} 
//             className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition-colors duration-200"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// ```react
// // src/ProductsSection.js
// // This component displays the list of products and handles the display of
// // the add/edit product forms.
// import React from 'react';
// import ProductForm from './ProductForm';

// export default function ProductsSection({ products, categories, isAdding, setIsAdding, editingProduct, setEditingProduct, onAdd, onEdit, onDelete }) {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>
//         <button 
//           onClick={() => setIsAdding(true)} 
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
//         >
//           Add New Product
//         </button>
//       </div>

//       {(isAdding || editingProduct) ? (
//         <ProductForm 
//           categories={categories}
//           onSave={editingProduct ? onEdit : onAdd}
//           initialData={editingProduct}
//           onCancel={() => {
//             setIsAdding(false);
//             setEditingProduct(null);
//           }}
//         />
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {products.map(prod => (
//                 <tr key={prod.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">{prod.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{prod.categoryName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">${prod.price}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{prod.stock}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${prod.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                       {prod.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap space-x-2">
//                     <button 
//                       onClick={() => setEditingProduct(prod)} 
//                       className="text-indigo-600 hover:text-indigo-900"
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => onDelete(prod.id)} 
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// ```react
// // src/ProductForm.js
// // This component provides the form for adding or editing a product.
// import React, { useState } from 'react';

// export default function ProductForm({ onSave, initialData, categories, onCancel }) {
//   const [formData, setFormData] = useState(initialData || { name: '', categoryId: '', price: '', description: '', imageUrl: '', stock: '', status: 'Active' });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? (checked ? 'Active' : 'Inactive') : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
//       <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Product' : 'Add New Product'}</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Name</label>
//           <input 
//             type="text" 
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Category</label>
//           <select
//             name="categoryId"
//             value={formData.categoryId}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select a category</option>
//             {categories.map(cat => (
//               <option key={cat.id} value={cat.id}>{cat.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-gray-700">Price</label>
//           <input 
//             type="number" 
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Description</label>
//           <textarea 
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Image URL</label>
//           <input 
//             type="text" 
//             name="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Stock/Inventory</label>
//           <input 
//             type="number" 
//             name="stock"
//             value={formData.stock}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <input 
//             type="checkbox" 
//             name="status"
//             checked={formData.status === 'Active'}
//             onChange={handleChange}
//             className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label className="text-gray-700">Active</label>
//         </div>
//         <div className="flex space-x-4">
//           <button 
//             type="submit" 
//             className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
//           >
//             Save Product
//           </button>
//           <button 
//             type="button" 
//             onClick={onCancel} 
//             className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition-colors duration-200"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// ```react
// // src/Settings.js
// // This component is a placeholder for the settings section.
// import React from 'react';

// export default function Settings() {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <p className="text-gray-600">This is the settings section. Content will be added later.</p>
//     </div>
//   );
// }
