import React, { useState } from "react";
import { useUpdateOrderStatusMutation } from "../redux/api/order";

const OrdersSection = ({ orders }) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      alert(`Order ${orderId} updated to ${newStatus}`);
    } catch (err) {
      console.error("❌ Failed to update order:", err);
      alert("Failed to update order status");
    }
  };

  if (!orders?.length) {
    return <p className="text-gray-500">No orders found.</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">Order ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">User</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Total</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{order._id}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {order.user?.username || "Guest"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  ${order.totalAmount}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing order */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">
              Order Details - {selectedOrder._id}
            </h3>
            <p className="mb-2">
              <span className="font-semibold">User:</span>{" "}
              {selectedOrder.user?.username || "Guest"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Total:</span> $
              {selectedOrder.totalAmount}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              {selectedOrder.status}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            <h4 className="font-semibold mb-2">Products:</h4>
            <ul className="space-y-2 mb-4">
              {selectedOrder.products.map((p, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between border p-2 rounded"
                >
                  <div>
                    <p className="font-medium">
                      {p.product?.name || "Unknown Product"}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {p.quantity}</p>
                  </div>
                  <p className="font-semibold">${p.price}</p>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mb-2">Shipping Address:</h4>
            <p className="text-gray-700">
              {selectedOrder.shippingAddress.fullName},{" "}
              {selectedOrder.shippingAddress.address},{" "}
              {selectedOrder.shippingAddress.city},{" "}
              {selectedOrder.shippingAddress.postalCode},{" "}
              {selectedOrder.shippingAddress.country}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
