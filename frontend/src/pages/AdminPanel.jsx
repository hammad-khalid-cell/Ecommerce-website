import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import CategoriesSection from "../components/categorySection";
import ProductsSection from "../components/ProductSection";
import {
  useGetProductsQuery,
  useCreateProductsMutation,
  useDeleteProductsMutation,
  useEditProductsMutation,
} from "../redux/api/products.js";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
} from "../redux/api/category";
import {useGetUsersQuery} from "../redux/api/users.js"
import { Link } from "react-router-dom";
import { setupListeners } from "@reduxjs/toolkit/query";

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [users, setUsers] = useState([]);

  const{data: usersData} = useGetUsersQuery();

  const {data: productsData} = useGetProductsQuery();
  const {data: categoryData} = useGetCategoryQuery();

  const [addProduct] = useCreateProductsMutation();
  const [addCategory] = useCreateCategoryMutation();

  const [editProduct] = useEditProductsMutation();
  const [editCategory] = useEditCategoryMutation();

  const [deleteProduct] = useDeleteProductsMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

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
  useEffect(()=>{
    if(usersData && Array.isArray(usersData)){
      setUsers(usersData);
    }
  },[usersData]);

  useEffect(() => {
    // In a real app, this would be a more robust token/role check
    const checkAuth = () => {
      setIsAdmin(true);
    };
    checkAuth();
  }, []);

  const handleEditCategory = async (updatedCategory) => {
    try {
      const res = await editCategory({
        id: updatedCategory._id,
        ...updatedCategory,
      }).unwrap();
      setCategories((categories) =>
        categories.map((cat) => (cat._id === res._id ? res : cat))
      );
      setEditingCategory(null);
      console.log("Category edited successfully", res);
    } catch (err) {
      console.log("Error editing category frontend", err);
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const res = await editProduct({
        id: updatedProduct._id, // pass id separately
        ...updatedProduct, // spread other fields
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

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      setCategories((categories) => categories.filter((cat) => cat._id !== id));
      setProducts(products.filter((prod) => prod.category._id !== id));
      console.log("Category deleted successfully");
    } catch (err) {
      console.log("Error deleting Category", err);
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

  const handleAddCategory = async (newCategory) => {
    try {
      const res = await addCategory(newCategory).unwrap();
      console.log(res);
      setCategories((categories) => [...categories, res]);
      setIsAddingCategory(false);
      setEditingCategory(null);
      console.log("Category added successfully :", res);
    } catch (err) {
      console.log("Error editing category frontend : ", err);
    }
  };

  // --- Product Handlers ---
  const handleAddProduct = async (newProduct) => {
    try {
      // Call RTK Query mutation
      const res = await addProduct(newProduct).unwrap();

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
        <h1 className="text-xl font-semibold">
          Access Denied. Please log in as an administrator.
        </h1>
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
                  setCurrentView("dashboard");
                  setIsAddingCategory(false);
                  setIsAddingProduct(false);
                  setEditingCategory(null);
                  setEditingProduct(null);
                }}
                className={
                  "w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " +
                  (currentView === "dashboard"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700")
                }
              >
                🏠 Dashboard
              </button>
            </li>
            <li className="mt-2">
              <button
                onClick={() => {
                  setCurrentView("categories");
                  setIsAddingCategory(false);
                  setIsAddingProduct(false);
                  setEditingCategory(null);
                  setEditingProduct(null);
                }}
                className={
                  "w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " +
                  (currentView === "categories"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700")
                }
              >
                📂 Categories
              </button>
            </li>
            <li className="mt-2">
              <button
                onClick={() => {
                  setCurrentView("products");
                  setIsAddingCategory(false);
                  setIsAddingProduct(false);
                  setEditingCategory(null);
                  setEditingProduct(null);
                }}
                className={
                  "w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " +
                  (currentView === "products"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700")
                }
              >
                📦 Products
              </button>
            </li>
            <li className="mt-2">
              <Link to="/">

              <button
                onClick={() => {
                  setIsAddingCategory(false);
                  setIsAddingProduct(false);
                  setEditingCategory(null);
                  setEditingProduct(null);
                }}
                className={
                  "w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 " +
                  (currentView === "settings"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700")
                }
              >
                Back to Website
              </button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto   ">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 capitalize   ">
          {currentView}
        </h1>

        {/* Render content based on currentView */}
        {currentView === "dashboard" && (
          <  Dashboard categories={categories} products={products} users = {users} />
        )}
        {currentView === "categories" && (
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
        )}
        {currentView === "products" && (
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
        )}
        
      </main>
    </div>
  );
};

export default AdminPanel;
