import PropTypes from "prop-types";
import useAuth from "../../hooks/useAth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserTable = ({ users, setUsers }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user);

  const handleDeleteClick = async (userId) => {
    console.log("Deleting user with ID:", userId);

    // Show confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return; // Exit if the user canceled the deletion
    }

    if (!userId) {
      console.error("No userId provided!");
      return; // Stop further execution if userId is invalid
    }
    try {
      await axiosSecure.delete(`/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Failed to delete user. Server error: ${error.response.status}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Failed to delete user. No response from server.");
      } else {
        console.error("Error message:", error.message);
        alert("Failed to delete user. An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-md font-semibold text-gray-900 mt-6">Users</h3>
      <table className="w-full mt-4 text-left border">
        <thead className="text-secondary">
          <tr>
            <th className="p-2 border-b">User ID</th>
            <th className="p-2 border-b">Profile Image</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Role</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((User) => (
            <tr key={User._id}>
              <td className="p-2 border-b">{User._id}</td>
              <td className="p-2 border-b">
                <img
                  src={User.photoURL || "./logo.jpg"}
                  alt="Profile"
                  className="w-12 h-12 object-cover rounded-full"
                />
              </td>
              <td className="p-2 border-b">{User.username}</td>
              <td className="p-2 border-b">{User.email}</td>
              <td className="p-2 border-b">{User.role}</td>
              <td className="p-2 border-b">
                {User._id !== user._id ? (
                  <button
                    onClick={() => handleDeleteClick(user._id)}
                    className="px-4 py-1 bg-red text-white rounded"
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default UserTable;

