import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "../useQueryWithRefresh";

export interface UserOrderItem {
  productId?: string;
  size?: string;
  color?: string;
  itemSku?: string;
  productName: string;
  productType: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  productImage?: string;
}

export interface UserOrder {
  _id: string;
  orderNumber: string;
  status: string;
  items: UserOrderItem[];
  subtotal: number;
  discountTotal: number;
  shippingFee: number;
  total: number;
  currency?: string;
  paymentMethod: string;
  createdAt: string;
  accurateTrackingUrl?: string | null;
}

export interface UserOrdersPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface UserOrdersResponse {
  orders: UserOrder[];
  pagination: UserOrdersPagination;
}

export const getUserOrdersAPI = async (
  page: number,
  limit: number
): Promise<UserOrdersResponse> => {
  const response = await axiosInstance.get("/orders", {
    params: { page, limit },
  });

  const data = response.data?.data;

  return {
    orders: data?.orders || [],
    pagination: data?.pagination || {
      page,
      limit,
      total: data?.orders?.length || 0,
      pages: 1,
    },
  };
};

export const useGetUserOrders = (page: number, limit: number) => {
  const {
    data,
    isLoading,
    error,
  } = useQueryWithRefresh<UserOrdersResponse, any>({
    queryKey: ["userOrders", page, limit],
    queryFn: () => getUserOrdersAPI(page, limit),
    tokenType: "user",
  });

  return {
    orders: data?.orders || [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
};

