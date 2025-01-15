import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenu";
import useRoleCheck from "../../../hooks/useRoleCheck";

const ManageItems = () => {
  const [menu, isMenuLoading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isAdmin] = useRoleCheck(["admin"]);

  const handleDeleteItem = (menuItem) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const itemId = menuItem._id;
        const res = await axiosSecure.delete(`/menu/${itemId}`);
        Swal.fire({
          title: "Deleted!",
          text: "Item has been deleted.",
          icon: "success",
        });
        refetch();
      }
    });
  };
  return (
    <div className="w-full md:w-[870px] px-4 m-8">
      <h2 className="text-2xl font-semibold my-4 text-secondary">
        Manage All <span className="text-carmine">Menu Item</span>
      </h2>

      {/* Menu items table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="text-white bg-rose-red">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((menuItem, index) => (
                <tr key={index} className="text-secondary">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={menuItem.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{menuItem.name}</td>
                  <td>{menuItem.price} LKR</td>
                  <td>
                    <Link to={`/admin-dashboard/update-menu/${menuItem._id}`}>
                      <button className="btn btn-ghost btn-xs bg-orange-500  text-white">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(menuItem)}
                      className="btn btn-ghost text-red btn-xs"
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

export default ManageItems;
