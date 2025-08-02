import React, { useEffect, useState } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { FaUserFriends, FaUserTie } from 'react-icons/fa';
import UserForm from '../../../components/admin/UserForm';
import UserTable from '../../../components/admin/UserTable';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UsermanagementDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get('/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newUser = {
      firstName: formData.get('name'),
      lastName: '', // Optional
      email: formData.get('email'),
      password: 'password123', // Default password
      userName: formData.get('name').toLowerCase(),
      role: formData.get('role'),
    };

    try {
      const response = await axiosSecure.post('/user/add-user', newUser);
      alert(response.data.message || 'User created successfully!');

      // Refresh user list
      const updatedUsers = await axiosSecure.get('/user');
      setUsers(updatedUsers.data);

      e.target.reset();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
      alert(error.response?.data?.message || 'Failed to create user.');
    }
  };

  // Calculate counts
  const totalUsers = users.length;
  const totalWaiters = users.filter((user) => user.role?.toLowerCase() === 'waiter').length;
  const totalAdmins = users.filter((user) => user.role?.toLowerCase() === 'admin').length;

  return (
    <div className="flex-1 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600 mt-2">Manage users and assign roles.</p>
      </header>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Users Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Total Users</h2>
            <p className="text-gray-600 mt-1">{totalUsers} users</p>
          </div>
          <FaUserFriends className="text-4xl text-blue-500" />
        </div>

        {/* Total Waiters Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Total Waiters</h2>
            <p className="text-gray-600 mt-1">{totalWaiters} waiters</p>
          </div>
          <BsBoxSeam className="text-4xl text-teal-400" />
        </div>

        {/* Total Admins Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Total Admins</h2>
            <p className="text-gray-600 mt-1">{totalAdmins} admins</p>
          </div>
          <FaUserTie className="text-4xl text-indigo-600" />
        </div>
      </div>

      {/* User Management Form */}
      <UserForm
        onAddUser={handleAddUser}
        toggleForm={() => setShowForm(!showForm)}
        showForm={showForm}
        setUsers={setUsers} // Pass setUsers to UserForm
      />

      {/* User List */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <UserTable users={users} setUsers={setUsers} /> 
      )}
    </div>
  );
};

export default UsermanagementDashboard;
