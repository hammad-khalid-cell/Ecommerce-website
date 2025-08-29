import React, { useState } from 'react';


export default function CategoryForm({ onSave, initialData, onCancel }) {


  const [formData, setFormData] = useState(initialData || { name: '', description: '', image: '' });

  const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    setFormData({ ...formData, 
      [name]: type === 'checkbox' ? (checked ? 'Active' : 'Inactive') : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Category' : 'Add New Category'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
         <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            name="status"
            checked={formData.status === 'Active'}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="text-gray-700">Active</label>
        </div>
        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
          >
            Save Category
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}