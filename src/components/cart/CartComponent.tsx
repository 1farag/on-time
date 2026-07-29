import { CartOrders_section } from "./sections/CartOrders_section";
import { EmptyCart_section } from "./sections/EmptyCart_section";
import style from "./styles/cartPage.module.scss";

export const CartComponent: React.FC = async () => {
  return (
    <main className={style.cartPage}>
      {/* <EmptyCart_section /> */}
      <CartOrders_section />
    </main>
  );
};
