import React from 'react';
import CategoryForm from './CategoryForm';

export default function CategoriesSection({ categories, isAdding, setIsAdding, editingCategory, setEditingCategory, onAdd, onEdit, onDelete }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Categories</h2>
        <button 
          onClick={() => setIsAdding(true)} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add New Category
        </button>
      </div>

      {(isAdding || editingCategory) ? (
        <CategoryForm 
          onSave={editingCategory ? onEdit : onAdd}
          initialData={editingCategory}
          onCancel={() => {
            setIsAdding(false);
            setEditingCategory(null);
          }}
        />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button 
                      onClick={() => setEditingCategory(cat)} 
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(cat.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}