import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateMenu = () => {
  const { menuId } = useParams();
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axiosSecure.get(`/menu/${menuId}`);
        const menuItem = response.data;

        // Set form values with fetched data
        setValue("name", menuItem.name);
        setValue("code", menuItem.code);
        setValue("category", menuItem.category);
        setValue("price", menuItem.price);
        setValue("image", menuItem.image);
      } catch (error) {
        console.error("Failed to fetch menu item details:", error);
      }
    };

    fetchMenuItem();
  }, [menuId, axiosSecure, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("code", data.code);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);

    try {
      const response = await axiosSecure.put(`/menu/${menuId}`, formData);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Menu item updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin-dashboard/manage-items");
      }
    } catch (error) {
      console.error("Failed to update menu item:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update the menu item. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center text-black py-4">
        Update Menu Item
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="border-rose-red max-w-4xl mx-auto"
      >
        {/* 1st row */}
        <div className="flex flex-row gap-4">
          <div className="form-control w-full py-2">
            <label className="label">
              <span className="label-text text-secondary">Recipe Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              className="input input-bordered w-full bg-white"
            />
          </div>

          <div className="form-control w-full py-2">
            <label className="label">
              <span className="label-text text-secondary">Item Code</span>
            </label>
            <input
              type="text"
              {...register("code", { required: true })}
              placeholder="code"
              className="input input-bordered w-full bg-white"
              required
            />
          </div>
        </div>

        {/* 2rd row */}
        <div className="flex items-center gap-4 py-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-secondary">Category</span>
            </label>
            <select
              {...register("category")}
              className="select select-bordered bg-white"
            >
              <option value="" disabled>
                Select a Category
              </option>
              <option value="rice">Rice</option>
              <option value="pasta">Pasta</option>
              <option value="kottu">Kottu</option>
              <option value="street-food">Street Food</option>
              <option value="main-meals">Main Meals</option>
              <option value="noodles">Noodles</option>
              <option value="seafood">Seafood</option>
              <option value="soups">Soups</option>
              <option value="salad">Salad</option>
              <option value="chicken">Chicken</option>
              <option value="juice">Juice</option>
              <option value="soft-drinks">Soft Drinks</option>
              <option value="hot-beverages">Hot Beverages</option>
              <option value="deserts">Deserts</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-secondary">Price</span>
            </label>
            <input
              type="number"
              {...register("price")}
              className="input input-bordered w-full bg-white"
            />
          </div>
        </div>

        {/* 3rd row */}
        <div className="form-control w-full py-5">
          <label className="label">
            <span className="label-text text-secondary">Item Image</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="fileUpload"
              type="file"
              {...register("image")}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="file-input-label text-white cursor-pointer px-4 py-2 rounded"
            >
              Choose File
            </label>
            <span className="text-gray-500">No file chosen</span>
          </div>
        </div>

        {/* 4th row */}
        <div className="py-2">
          <input
            type="submit"
            className="btn bg-rose-red hover:bg-carmine w-full text-white"
            value="Update Item"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateMenu;
