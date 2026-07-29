import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useGetAllCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/categories`)
        .then((response) => response.data);

      return response.data;
    },
  });
  return { categories: data, isLoading, error };
};

export const useGetAdminCategory = () => {
  const { categoryId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "categories", categoryId],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/categories/${categoryId}`)
        .then((response) => response.data);

      return response.data;
    },
    enabled: !!categoryId,
  });
  return { categoryData: data, isLoading, error };
};
