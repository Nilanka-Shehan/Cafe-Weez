import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAth";

const useCart = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const baseURL = import.meta.env.VITE_BACKEND_URL; // Replace with your backend URL

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${baseURL}/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
