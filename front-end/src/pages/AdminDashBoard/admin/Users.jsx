import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  //create Admin
  const handleMakeAdmin = (user) => {
    axiosSecure.put(`/user/admin/${user._id}`).then((res) => {
      alert(`${user.email} is now Admin`);
      refetch();
    });
  };

  //delete User
  const handleDeleteUser = (user) => {
    axiosSecure.delete(`/user/${user._id}`).then((res) => {
      alert(`${user.email} is removed`);
      refetch();
    });
  };

  //console.log(users)
  return (
    <div>
      <div className="flex items-center justify-between m-4 text-black">
        <h5>All Users</h5>
        <h5>Total Users : <span className="text-carmine">{users.length}</span></h5>
      </div>
      <div>
        <div className="overflow-x-auto flex items-center m-4">
          <table className="table md:w-[900px]">
            {/* head */}
            <thead className="bg-rose-red text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role?.toLowerCase() === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-circle bg-indigo-500 text-white btn-xs"
                      >
                        <FaUsers />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost text-red btn-xs"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
