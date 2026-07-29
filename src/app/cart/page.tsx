import { CartComponent } from "@/components/cart/CartComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "السلة",
};

const CartPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <CartComponent />
    </Suspense>
  );
};

export default CartPage;
