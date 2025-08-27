import React from 'react'
import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import CategoriesSection from '../components/categorySection';
import ProductsSection from '../components/ProductSection';
import Settings from '../components/settings';



const mockCategories = [
  { id: '1', name: 'Electronics', description: 'Gadgets and gizmos', created: '2023-01-15' },
  { id: '2', name: 'Apparel', description: 'Clothing and accessories', created: '2023-02-20' },
  { id: '3', name: 'Home Goods', description: 'Furniture and decor', created: '2023-03-10' },
];

const mockProducts = [
  { id: 'p1', name: 'Laptop', categoryId: '1', categoryName: 'Electronics', price: 1200, stock: 50, status: 'Active' },
  { id: 'p2', name: 'T-Shirt', categoryId: '2', categoryName: 'Apparel', price: 25, stock: 200, status: 'Active' },
  { id: 'p3', name: 'Desk Lamp', categoryId: '3', categoryName: 'Home Goods', price: 45, stock: 75, status: 'Inactive' },
];

const AdminPanel = () => {
    
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [categories, setCategories] = useState(mockCategories);
  const [products, setProducts] = useState(mockProducts);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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
  const handleAddProduct = (newProduct) => {
    const category = categories.find(cat => cat.id === newProduct.categoryId);
    const newProductWithDetails = {
      ...newProduct,
      id: Date.now().toString(),
      categoryName: category ? category.name : 'Unknown',
    };
    setProducts([...products, newProductWithDetails]);
    setIsAddingProduct(false);
  };

  const handleEditProduct = (updatedProduct) => {
    const category = categories.find(cat => cat.id === updatedProduct.categoryId);
    const updatedProductWithDetails = {
      ...updatedProduct,
      categoryName: category ? category.name : 'Unknown',
    };
    setProducts(products.map(prod => prod.id === updatedProduct.id ? updatedProductWithDetails : prod));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(prod => prod.id !== id));
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

