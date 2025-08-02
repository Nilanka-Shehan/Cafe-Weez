import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL; // Replace with your backend URL
const axiosPublic = axios.create({
    baseURL:baseURL //http://localhost:3001
})

const useAxiosPublic = () => {
  return axiosPublic;
}

export default useAxiosPublic;