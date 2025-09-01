import React, { useState } from "react";

export default function ProductForm({
  onSave,
  initialData,
  categories,
  onCancel,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      category: "",
      price: "",
      description: "",
      images: "",
      stock: "",
      status: "Active",
    }
  );
  console.log(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "Active" : "Inactive") : value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSave(formData);
  // };

  const handleDeleteImage = async (index) => {
    const imageToDelete = formData.images[index];
    const productId = initialData?._id; // <-- get from initialData

    if (typeof imageToDelete === "string") {
      // Cloudinary image (already saved in DB)
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/${productId}/image`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ imageUrl: imageToDelete }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to delete");

        // Update UI
        setFormData((prev) => ({
          ...prev,
          images: prev.images.filter((_, i) => i !== index),
        }));
      } catch (err) {
        console.error("Image delete error:", err);
        alert("Failed to delete image");
      }
    } else {
      // Local file (not uploaded yet)
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  const formPayload = new FormData();

  formPayload.append("name", formData.name);
  formPayload.append("price", formData.price);
  formPayload.append("stock", formData.stock);
  // formPayload.append("category", formData.category);
  formPayload.append("category", formData.category?._id || formData.category);

  formPayload.append("description", formData.description);
  formPayload.append("status", formData.status);

  if (formData.images && formData.images.length > 0) {
    formData.images.forEach((file) => {
      formPayload.append("images", file);
    });
  }

  if (initialData?._id) {
    // Edit mode
    await onSave({ id: initialData._id, formData: formPayload });
  } else {
    // Create mode
    await onSave(formPayload);  // 👈 send raw FormData
  }
};

  console.log(formData);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md  mx-auto">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Product" : "Add New Product"}
      </h3>
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
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category._id}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
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

        <div>
          <label className="block text-gray-700 mb-1">Images</label>

          {/* Hidden input */}
          <input
            type="file"
            id="imageUpload"
            name="images"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) =>
              setFormData({ ...formData, images: Array.from(e.target.files) })
            }
          />

          {/* Custom button */}
          <button
            type="button"
            onClick={() => document.getElementById("imageUpload").click()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Upload Images
            {}
          </button>

          {/* Show selected files */}
          {formData.images && formData.images.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
              {formData.images.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  {typeof file === "string" ? (
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      <img
                        src={file}
                        alt={`img-${index}`}
                        className="w-16 h-16 object-cover rounded mr-2 inline"
                      />
                    </a>
                  ) : (
                    <span>{file.name}</span>
                  )}

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Stock/Inventory</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="status"
            checked={formData.status === "Active"}
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
            Save Product
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
