import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useMenu = () => {
    const axiosPublic = useAxiosPublic();

    const {data:menu=[],isLoading:isMenuLoading,refetch} = useQuery({
        queryKey : ['menu'],
        queryFn : async () => {
            const res = await axiosPublic.get('/menu');
            //console.log(res.data);
            return res.data;
        }
    });
  return [menu,isMenuLoading,refetch];
}

export default useMenu;