// import axios from 'axios';
import { useEffect, useState } from 'react';
import AddReviewForm from '../../components/customer/AddReviewForm.jsx';
import BookTable from '../../components/customer/Booktable.jsx';
import CustomerNavbar from '../../components/customer/CustomerNavBar';
import Customersidebar from '../../components/customer/CustomerSideBar';
import Card from '../../components/FoodCard.jsx';
import useAxiosPublic from '../../hooks/useAxiosPublic.js';

const Customer = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Search filter state
  const [sortOption, setSortOption] = useState(''); // Sorting option state
  const [showAddReviewForm, setShowAddReviewForm] = useState(false); // Form visibility state
  const [showBookTableForm, setShowBookTableForm] = useState(false); // Book Table form visibility state
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axiosPublic.get("/menu");
        setMenuItems(response.data);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to fetch menu items.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [axiosPublic]);

  const handleAddToCart = (item) => {
    const newItem = {
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };

    const existingItem = cartItems.find((cartItem) => cartItem.productId === item.id);
    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.productId === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    }
  };

  const filteredMenuItems = menuItems
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // No sorting
    });

  if (isLoading) return <p>Loading menu items...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="h-screen flex flex-col">
    <CustomerNavbar cartItems={cartItems.length} />
    <main className="flex-1 bg-slate-100 flex">
      <Customersidebar />
      <div className="flex-1 p-6">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#A91D3A]">Menu</h1>
            <p className="text-[#A91D3A] mt-2">Select items to add to your cart.</p>
          </div>

          {/* Buttons Section on the right */}
          <div className="flex gap-4">
            {/* Add Review Button */}
            <button
              onClick={() => setShowAddReviewForm((prev) => !prev)}
              className="p-2 bg-[#A91D3A] text-white rounded-full shadow hover:bg-[#801629] w-full sm:w-auto"
            >
              {showAddReviewForm ? 'Hide Review Form' : 'Add Review'}
            </button>

            {/* Book Table Button */}
            <button
              onClick={() => setShowBookTableForm((prev) => !prev)}
              className="p-2 bg-[#A91D3A] text-white rounded-full shadow hover:bg-[#801629] w-full sm:w-auto"
            >
              {showBookTableForm ? 'Hide Book Table Form' : 'Book Table'}
            </button>
          </div>
        </header>

        {/* Show Forms */}
        {showAddReviewForm && <AddReviewForm />}
        {showBookTableForm && <BookTable />}

          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between gap-3">
            <input
              type="text"
              placeholder="Search Foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 text-sm border border-gray-300 rounded-full shadow-sm bg-[#eeee] text-[#a91d3a] focus:outline-none focus:ring-1 focus:ring-[#A91D3A] focus:border-[#A91D3A] w-full sm:w-1/2"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 text-sm border border-gray-300 rounded-full shadow-sm bg-[#eeee] text-[#a91d3a] focus:outline-none focus:ring-1 focus:ring-[#A91D3A] focus:border-[#A91D3A] w-full sm:w-1/3"
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 rounded-full">
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <Card key={item._id} item={item} onAddToCart={() => handleAddToCart(item)} />
              ))
            ) : (
              <p className="text-center text-[#a91d3a]">No menu items match your search.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customer;
