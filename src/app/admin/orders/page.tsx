import { OrdersComponent } from "@/components/admin/orders/OrdersComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة الطلبات",
};

const OrdersPage: React.FC = (): JSX.Element => {
  return <OrdersComponent />;
};

export default OrdersPage;
