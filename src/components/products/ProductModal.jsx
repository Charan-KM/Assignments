import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, editProduct } from "../../store/reducers/products";
import { selectCategories } from "../../store/selectors/products";

const ProductModal = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories) || [];
  const isEditing = Boolean(product);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: product?.title || "",
        category: product?.category || "",
        price: product?.price || "",
      });
    }
  }, [isOpen, product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = { ...formData, price: Number(formData.price) };
  
    if (isEditing) {
      dispatch(editProduct(product.id, processedData));
    } else {
      dispatch(createProduct(processedData));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit" : "Add"} Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded mb-4"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {isEditing ? "Update" : "Add"}
            </button>
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;