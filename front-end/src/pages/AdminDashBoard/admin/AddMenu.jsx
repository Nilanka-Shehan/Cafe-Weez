import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("category", data.category);
    formData.append("price", data.price);

    formData.append("image", data.image[0]); // Append the file directly

    try {
      const response = await axiosSecure.post("/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin-dashboard/manage-items");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center text-black py-4">
        Upload a New <span className="text-carmine">Menu Item</span>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-rose-red max-w-4xl mx-auto"
      >
        <div>
          {/* 1st row */}
          <div className="flex flex-row gap-4">
            <div className="form-control w-full py-5">
              <label className="label">
                <span className="label-text text-secondary">Recipe Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Recipe Name"
                className="input input-bordered w-full bg-white"
                required
              />
            </div>
            <div className="form-control w-full py-5">
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

          {/* 2nd row */}
          <div className="flex items-center gap-3 py-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-secondary">Category</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered bg-white"
                required
              >
                <option value="">Select a Category</option>
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
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full bg-white"
                required
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
                {...register("image", { required: true })}
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
          <div className="py-5">
            <input
              type="submit"
              className="btn bg-rose-red hover:bg-carmine w-full text-white"
              value="Add Item"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;
