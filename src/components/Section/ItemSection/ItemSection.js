import React, { useEffect, useState } from 'react'; 
import axios from 'axios';

const ItemSection = () => {
  const [itemName, setItemName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/items');
      setItems(res.data);
    } catch (error) {
      console.error('Item Fetch Error:', error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/category');
      setCategories(res.data);
    } catch (error) {
      console.error('Category Fetch Error:', error.message);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemName.trim() || !categoryId || !quantity.trim()) {
      alert("All fields are required.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users/items', {
        item_name: itemName.trim(),
        category_id: categoryId,
        quantity: parseInt(quantity),
      });
      setItemName('');
      setCategoryId('');
      setQuantity('');
      fetchItems();
    } catch (error) {
      console.error('Add Error:', error.message);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">➕ Add Item</h2>

        <form onSubmit={handleAddItem} className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full md:w-1/4"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
            className="w-full md:w-1/3 border border-gray-300 p-2 rounded"
          />

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="w-full md:w-1/6 border border-gray-300 p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4 text-gray-700"> Item List</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Item Name</th>
                <th className="p-3 border">Category Name</th>
                <th className="p-3 border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.id}</td>
                  <td className="p-3 border">{item.item_name}</td>
                  <td className="p-3 border">
                    {categories.find(cat => cat.id === item.category_id)?.category_name || 'N/A'}
                  </td>
                  <td className="p-3 border">{item.quantity}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemSection;
