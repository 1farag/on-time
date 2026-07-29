import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

export const useGetPartners = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["partners", page],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/partners`, { params: { page } })
        .then((response) => response.data);

      return response;
    },
  });
  return { data, isLoading, error };
};
