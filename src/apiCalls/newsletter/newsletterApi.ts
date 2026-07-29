// apiCalls/newsletter/newsletterApi.ts
import axiosInstance from "@/lib/axios";

export const subscribeToNewsletterAPI = async (data: { email: string }) => {
  const response = await axiosInstance.post("/newsletter/subscribe", data);
  return response.data;
};

export interface NewsletterSubscriber {
  _id: number | string;
  email: string;
  name?: string | null;
  createdAt?: string;
  isActive?: boolean;
}

export const getNewsletterSubscribersAPI = async () => {
  const response = await axiosInstance.get("/admin/newsletter/subscribers");
  return response.data as {
    data: {
      subscribers: [];
      pagination: { total: number };
    };
  };
};

export const exportNewsletterSubscribersAPI = async () => {
  const response = await axiosInstance.get(
    "/admin/newsletter/subscribers/export",
    {
      responseType: "blob",
    }
  );
  return response.data as Blob;
};

export const deleteNewsletterSubscriberAPI = async (id: number | string) => {
  const response = await axiosInstance.delete(
    `/admin/newsletter/subscribers/${id}`
  );
  return response.data;
};

export const sendNewsletterAPI = async (data: {
  subject: string;
  content: string;
}) => {
  const response = await axiosInstance.post("/admin/newsletter/send", data);
  return response.data;
};
