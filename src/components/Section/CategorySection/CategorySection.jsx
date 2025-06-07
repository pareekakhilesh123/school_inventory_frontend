import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategorySection = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
const [editCategoryName, setEditCategoryName] = useState('');


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/category');
      setCategories(res.data);
    } catch (error) {
      console.error('Fetch Error:', error.message);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users/category', {
        category_name: categoryName.trim()
      });
      setCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Add Error:', error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this category?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/category/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Delete Error:', error.message);
    }
  };
const handleEditClick = (cat) => {
  setEditingId(cat.id);
  setEditCategoryName(cat.category_name);
};

const handleUpdateCategory = async (id) => {
  try {
    await axios.put('http://localhost:5000/api/users/category', {
      id,
      category_name: editCategoryName,
    });
    setEditingId(null);
    setEditCategoryName('');
    fetchCategories();
  } catch (error) {
    console.error('Update Error:', error.message);
  }
};

const handleCancelEdit = () => {
  setEditingId(null);
  setEditCategoryName('');
};


  return (
    <div className="w-full p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800"> Add Category</h2>

        <form onSubmit={handleAddCategory} className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full md:w-1/3 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">Category List</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Category Name</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
          <tbody>
  {categories.map((cat) => (
    <tr key={cat.id} className="hover:bg-gray-50">
      <td className="p-3 border">{cat.id}</td>

      <td className="p-3 border">
        {editingId === cat.id ? (
          <input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            className="border p-1 rounded w-full"
          />
        ) : (
          cat.category_name
        )}
      </td>

      <td className="p-3 border text-center">
        {editingId === cat.id ? (
          <>
            <button
              onClick={() => handleUpdateCategory(cat.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleEditClick(cat)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  ))}

  {categories.length === 0 && (
    <tr>
      <td colSpan="3" className="text-center p-4 text-gray-500">
        No categories found.
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

export default CategorySection;
