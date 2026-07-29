import { Suspense } from "react";
import { Metadata } from "next";
import { WishlistComponent } from "@/components/wishlist/WishlistComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";

export const metadata: Metadata = {
  title: "Wishlist",
};

const WishlistPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <WishlistComponent />
    </Suspense>
  );
};

export default WishlistPage;

