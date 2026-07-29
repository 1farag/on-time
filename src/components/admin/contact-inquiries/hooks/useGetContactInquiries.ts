import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetContactInquiries = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "contact-inquiries"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/contact-inquiries");
      return response.data?.data;
    },
  });

  return { data, isLoading, error, refetch };
};
