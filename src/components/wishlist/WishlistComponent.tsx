import style from "../cart/styles/cartPage.module.scss";
import { WishlistOrders_section } from "./sections/WishlistOrders_section";

export const WishlistComponent: React.FC = async () => {
  return (
    <main className={style.cartPage}>
      <WishlistOrders_section />
    </main>
  );
};

