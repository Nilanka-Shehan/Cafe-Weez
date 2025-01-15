import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  //create Admin
  const handleApprove = (booking) => {
    axiosSecure.put(`/bookings/${booking._id}`).then((res) => {
      alert("Approved");
      refetch();
    });
  };

  //delete User
  const handleDeleteUser = (booking) => {
    axiosSecure.delete(`/bookings/${booking._id}`).then((res) => {
      alert("Booking is Removed");
      refetch();
    });
  };

  //console.log(users)
  return (
    <div>
      <div className="flex items-center justify-between m-4 text-black">
        <h5>Manage Bookings</h5>
        <h5>Total Bookings : <span className="text-carmine">{bookings.length}</span></h5>
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
                <th>ContactNo:</th>
                <th>Date</th>
                <th>Time</th>
                <th>Event</th>
                <th>Booking Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              {/* row 1 */}
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.contactNo}</td>
                  <td>{booking.date.split("T")[0]}</td>
                  <td>{booking.time}</td>
                  <td>{booking.event || "NO"}</td>
                  <td>
                    {booking.bookingStatus?.toLowerCase() === "approved" ? (
                      "Approved"
                    ) : (
                      <button
                        onClick={() => handleApprove(booking)}
                        className="bg-rose-red text-white rounded-sm w-full"
                      >
                        Pending
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost text-red btn-xs"
                      onClick={() => handleDeleteUser(booking)}
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

export default ManageBookings;
