import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaThList } from 'react-icons/fa';
import MenuManagement from '../../../components/admin/MenuManagement';

const MenuManagementDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch menu items from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuResponse = await axios.get('http://localhost:3001/api/menu');
        setMenuItems(menuResponse.data);
      } catch {
        setError("There was an error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate unique categories dynamically
  const uniqueCategories = new Set(menuItems.map((item) => item.category));

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-gray-600 mt-2">
         Manage menu items and categories efficiently.
        </p>
      </header>

      {/* Content Grid for Menu and Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Total Menu Items</h2>
            <p className="text-gray-600 mt-1">{menuItems.length} items</p>
          </div>
          <FaThList className="text-4xl text-green-500" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Total Categories</h2>
            <p className="text-gray-600 mt-1">{uniqueCategories.size} categories</p>
          </div>
          <FaThList className="text-4xl text-indigo-600" />
        </div>
      </div>

      <div className="gap-6 mb-6">
        <MenuManagement
          menuItems={menuItems}
          setMenuItems={setMenuItems}
        />
      </div>
    </div>
  );
};

export default MenuManagementDashboard;
