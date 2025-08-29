import React from 'react'

const Dashboard = ({categories, products, users}) => {
  return (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-600">Total Categories</h3>
        <p className="text-4xl font-bold text-gray-900 mt-2">{categories.length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
        <p className="text-4xl font-bold text-gray-900 mt-2">{products.length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-600">Active Products</h3>
        <p className="text-4xl font-bold text-gray-900 mt-2">{products.filter(p => p.status === 'Active').length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-600">Users</h3>
        <p className="text-4xl font-bold text-gray-900 mt-2">{users.length}</p>
      </div>
    </div>  )
}

export default Dashboard

