import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAth";

const AdminNavbar = () => {
  // const [userEmail, setUserEmail] = useState('Weez cafe'); // Default value
  // const [profileImage, setProfileImage] = useState('/logo.png'); // Default profile image

  // useEffect(() => {
  //   // Fetch the logged-in user's data from the backend
  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); // Get the token from localStorage
  //       if (!token) {
  //         console.error('Token not found');
  //         return;
  //       }

  //       const response = await axios.get('http://localhost:3001/api/auth/user', {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Send the token for authentication
  //         },
  //       });

  //       console.log('Backend Response:', response.data); // Log the response data

  //       // Ensure the backend response has correct field names
  //       const { email = 'Unknown', profileImage = '/logo.png' } = response.data || {};
  //       setUserEmail(email); // Set the email in state
  //       setProfileImage(profileImage); // Set the profile picture, fallback to default if not provided
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData(); // Fetch user data when the component mounts
  // }, []);

  const { user } = useAuth();

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.jpg" alt="Company Logo" className="w-10 h-10" />
          <span className="ml-3 text-gray-800 font-bold text-lg">
            WEEZ CAFE
          </span>
        </Link>
      </div>

      {/* Right Section: User Email and Profile */}
      <div className="flex items-center space-x-4">
        <p className="hidden md:block text-gray-600 text-sm font-medium">
          {user.email}
        </p>
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-[#a91d3a]"
        />
      </div>
    </header>
  );
};

export default AdminNavbar;
