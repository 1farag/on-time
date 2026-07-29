import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface ContactUsValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export const useContactUs = () => {
  const {
    mutateAsync: contactUsMutation,
    isPending: contactUsLoading,
    error,
  } = useMutation({
    mutationFn: (values: ContactUsValues) =>
      axiosInstance.post("/contact-us", values),
    onSuccess: () => {
      toast.success("Your message has been sent successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while sending your message. Please try again."
      );
    },
  });

  return {
    contactUsMutation,
    contactUsLoading,
    error,
  };
};
