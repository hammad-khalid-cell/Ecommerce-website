import React from 'react'
import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import CategoriesSection from '../components/categorySection';
import ProductsSection from '../components/ProductSection';
import Settings from '../components/settings';
import { useGetProductsQuery, useCreateProductsMutation, useDeleteProductsMutation,useEditProductsMutation}  from "../redux/api/products.js"
import {useGetCategoryQuery} from "../redux/api/category"

const AdminPanel = () => {
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const { data:productsData, error : getProductsError , isLoading: getProductsIsLoading} =  useGetProductsQuery();
  const [addProduct, {error: create, isLoading : createLoading}] =  useCreateProductsMutation();
  const {data:categoryData, error : getCategoriesError, isLoading :getCategoryIsLoading} =  useGetCategoryQuery();
  
const [editProduct] = useEditProductsMutation();
const [deleteProduct, ] = useDeleteProductsMutation();

// Edit Product

const handleEditProduct = async (updatedProduct) => {
  try {
    const res = await editProduct({
      id: updatedProduct._id,   // pass id separately
      ...updatedProduct,        // spread other fields
    }).unwrap();

    // update local state
    setProducts((products) =>
      products.map((prod) => (prod._id === res._id ? res : prod))
    );

    setEditingProduct(null);
    console.log("Product updated successfully:", res);
  } catch (err) {
    console.error("Error updating product:", err);
  }
};
// Delete Product
const handleDeleteProduct = async (id) => {
  console.log("This is the id to delete", id);
  
  try {
    await deleteProduct(id).unwrap(); // call backend delete
    // Update local state
    setProducts((products) => products.filter((prod) => prod._id !== id));
    console.log("Product deleted successfully");
  } catch (err) {
    console.error("Error deleting :", err);
  }
};

  
  
  useEffect(() => {
    if (productsData && Array.isArray(productsData)) {
      setProducts(productsData);
    }
  }, [productsData]);

  useEffect(() => {
    if (categoryData && Array.isArray(categoryData)) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  
  
  useEffect(() => {
    // In a real app, this would be a more robust token/role check
    const checkAuth = () => {
      setIsAdmin(true); 
    };
    checkAuth();
  }, []);

  // --- Category Handlers ---
  const handleAddCategory = (newCategory) => {
    setCategories([...categories, { ...newCategory, id: Date.now().toString(), created: new Date().toISOString().slice(0, 10) }]);
    setIsAddingCategory(false);
  };

  const handleEditCategory = (updatedCategory) => {
    setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setProducts(products.filter(prod => prod.categoryId !== id));
  };



  // --- Product Handlers ---
const handleAddProduct = async (newProduct) => {
  try {
    // Call RTK Query mutation
    const res = await addProduct(newProduct).unwrap(); 
    console.log(res);
    

    // Optional: If your backend returns the saved product
    setProducts((products) => [...products, res]);
    setIsAddingProduct(false);
    setEditingProduct(null);
    console.log("Product added successfully:", res);
  } catch (err) {
    console.error(" Error adding product:", err);
  }
};



  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-semibold">Access Denied. Please log in as an administrator.</h1>
      </div>
    );
  }
  return (
 <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white shadow-xl flex flex-col p-4 space-y-4">
        <div className="text-2xl font-bold p-4">Admin Panel</div>
        <nav className="flex-1">
          <ul>
            <li>
              <button 
                onClick={() => {
                  setCurrentView('dashboard');
                  setIsAddingCategory(false);
                  setIsAddingProduct(false);
                  setEditingCategory(null);
                  setEditingProduct(null);
                }} 
                className={"w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " + (currentView === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700')}
              >
                🏠 Dashboard
              </button>
            </li>
            <li className="mt-2">
              <button 
                onClick={() => {
                  setCurrentView('categories');
                  setIsAddingCategory(false);
                  setIsAddingProduct(false);
                  setEditingCategory(null);
                  setEditingProduct(null);
                }} 
                className={"w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " + (currentView === 'categories' ? 'bg-gray-700' : 'hover:bg-gray-700')}
              >
                📂 Categories
              </button>
            </li>
            <li className="mt-2">
              <button 
                onClick={() => {
                  setCurrentView('products');
                  setIsAddingCategory(false);
                  setIsAddingProduct(false);
                  setEditingCategory(null);
                  setEditingProduct(null);
                }} 
                className={"w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " + (currentView === 'products' ? 'bg-gray-700' : 'hover:bg-gray-700')}
              >
                📦 Products
              </button>
            </li>
            <li className="mt-2">
              <button 
                onClick={() => {
                  setCurrentView('settings');
                  setIsAddingCategory(false);
                  setIsAddingProduct(false);
                  setEditingCategory(null);
                  setEditingProduct(null);
                }} 
                className={"w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " + (currentView === 'settings' ? 'bg-gray-700' : 'hover:bg-gray-700')}
              >
                ⚙️ Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 capitalize">{currentView}</h1>
        
        {/* Render content based on currentView */}
        {currentView === 'dashboard' && <Dashboard categories={categories} products={products} />}
        {currentView === 'categories' && 
          <CategoriesSection 
            categories={categories}
            isAdding={isAddingCategory}
            setIsAdding={setIsAddingCategory}
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
            onAdd={handleAddCategory}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        }
        {currentView === 'products' && 
          <ProductsSection 
            products={products}
            categories={categories}
            isAdding={isAddingProduct}
            setIsAdding={setIsAddingProduct}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        }
        {currentView === 'settings' && <Settings />}
      </main>
    </div>  )
}

export default AdminPanel

