import { AllOrders_table } from "./tables/AllOrders_table";
import style from "./styles/orders.module.scss";

export const OrdersComponent = () => {
  return (
    <main className={style.orders}>
      <div className="flex items-center justify-between flex-col md:flex-row mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            إدارة الطلبات{" "}
          </h1>
          <p className="text-lg text-primary">
            عرض وإدارة جميع الطلبات في المنصة{" "}
          </p>
        </div>
      </div>
      <AllOrders_table />
    </main>
  );
};
