import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useGetCheckoutDetails = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["checkoutDetails"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/cart`)
        .then((response) => response.data);

      return response.data;
    },
  });
  return { data, isLoading, error };
};
