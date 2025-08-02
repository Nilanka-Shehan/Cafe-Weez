import axios from "axios";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // Flag to handle edit mode
  const [currentItem, setCurrentItem] = useState(null); // Store item to be edited
  const axiosSecure = useAxiosSecure();

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  // Handle Add Menu
  const handleAddMenu = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axiosSecure.post("/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update menuItems state in the Admin component
      setMenuItems((prevItems) => [...prevItems, response.data]);

      // Close form after submission
      setShowForm(false);
      e.target.reset();
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  // Handle Update Menu
  const handleUpdateMenu = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axiosSecure.put(
        `/menu/${currentItem._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedItems = menuItems.map((item) =>
        item._id === currentItem._id ? response.data : item
      );
      setMenuItems(updatedItems);
      setShowForm(false);
      setIsEdit(false);
      e.target.reset();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  // Handle Delete Menu
  const handleDeleteMenu = async (id) => {
    try {
      await axiosSecure.delete(`/menu/${id}`);
      setMenuItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Set item to edit
  const handleEditMenu = (item) => {
    setIsEdit(true);
    setShowForm(true);
    setCurrentItem(item);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Menu Management</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full py-2 mb-4 bg-[#c73659] text-white rounded-md hover:bg-[#a91d3a] transition"
      >
        {showForm ? "Close Form" : isEdit ? "Update Menu" : "Add Menu"}
      </button>

      {showForm && (
        <form
          onSubmit={isEdit ? handleUpdateMenu : handleAddMenu}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-medium">Food Name</label>
            <input
              type="text"
              name="name"
              defaultValue={isEdit ? currentItem.name : ""}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Food Code</label>
            <input
              type="text"
              name="code"
              defaultValue={isEdit ? currentItem.code : ""}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              name="category"
              defaultValue={isEdit ? currentItem.category : ""}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Foods">Foods</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
              <option value="popular">Popular</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              name="price"
              defaultValue={isEdit ? currentItem.price : ""}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#00C49F] text-white rounded-md hover:bg-[#0088FE] transition"
          >
            {isEdit ? "Update" : "Submit"}
          </button>
        </form>
      )}

      <h3 className="text-md font-semibold text-gray-800 mt-6">Menu Items</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition"
          >
            <div className="h-40 overflow-hidden mb-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>
            <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="text-xl text-gray-800 mt-2">LKR {item.price}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEditMenu(item)}
                className="px-4 py-1 bg-[#eeee] text-[#a91d3a] rounded-md hover:bg-[#ed1b24] hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMenu(item._id)}
                className="px-4 py-1 bg-[#eeee] text-[#a91d3a] rounded-md hover:bg-[#a91d3a] hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
