import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UserForm = ({ toggleForm, showForm , setUsers }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    id: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state to true
    try {
      const response = await axiosSecure.put(
        `/user/${formData.id}`, 
        { role: formData.role }
      );
  
      // Update the user in the state after successful API response
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === formData.id ? { ...user, role: response.data.role } : user
        )
      );
  
      // Reset the form and loading state
      setLoading(false);
      toggleForm(); // Close the form after successful submission
    } catch (error) {
      setLoading(false);
      console.error('Error updating user:', error);
      
      if (error.response) {
        // Server responded with an error
        console.error('Error response:', error.response.data);  // Detailed error from the server
        alert(`Failed to update user. Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // No response from the server
        console.error('Error request:', error.request);
        alert('Failed to update user. No response from the server.');
      } else {
        // General errors
        console.error('Error message:', error.message);
        alert(`Failed to update user. Error: ${error.message}`);
      }
    }
  };
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <button
        onClick={toggleForm}
        className="w-full py-2 mb-4 bg-[#c73659] text-white rounded-md hover:bg-[#a91d3a] transition"
      >
        {showForm ? 'Close Form' : 'Update User Role'}
      </button>

      {showForm && (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">User ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Waiter">Waiter</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#00C49F] text-white rounded-md hover:bg-[#0088FE] transition"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UserForm;
