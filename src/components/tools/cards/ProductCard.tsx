"use client";

import Image from "next/image";
import { FiHeart, FiEye } from "react-icons/fi";
import { BsBagPlus, BsCheckLg } from "react-icons/bs";
import { ProductType } from "@/types/types";
import { RenderStars } from "@/utils/renderStars";
import Link from "next/link";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useAddToCart, useGetCart } from "./hooks/cartHook";
import { getCookie } from "cookies-next";
import {
  useAddToWishlist,
  useGetWishlist,
  useRemoveFromWishlist,
} from "./hooks/wishlistHook";
import { CurrencyFormatter } from "../CurrencyFormatter";

export default function ProductCard({ product }: { product: ProductType }) {
  const getLink = useLocalizedLink();
  const router = useRouter();
  const pathname = usePathname();
  const UserToken = getCookie("UserToken");

  console.log(UserToken, !!UserToken);

  const isAuthenticated = !!UserToken;
  const { addToCart, isAddingToCart } = useAddToCart();
  const { cart, isLoadingCart } = useGetCart();
  const { addToWishlist, isAddingToWishlist } = useAddToWishlist();
  const { removeFromWishlist, isRemovingFromWishlist } =
    useRemoveFromWishlist();
  const { wishlist } = useGetWishlist();

  // Check if product is already in cart
  const isInCart = cart?.items?.some(
    (item: any) =>
      item.productId === product.id || item.product?._id === product.id
  );

  const isInWishlist = wishlist?.items?.some(
    (item: any) => item.productId === product.id
  );

  const handleAddToCart = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("يجب تسجيل الدخول أولاً لإضافة المنتجات إلى السلة");
      router.push(getLink(`/user/login?redirect=${pathname}`));
      return;
    }

    // // Check if already in cart
    // if (isInCart) {
    //   message.info("المنتج موجود بالفعل في السلة");
    //   router.push(getLink("/cart"));
    //   return;
    // }

    // Add to cart via API
    addToCart({
      productId: product.id,
      quantity: 1,
      size: product.defaultSize || product.availableSizes?.[0] || "M",
    });
  };

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist({ productId: product.id });
    } else {
      addToWishlist({ productId: product.id });
    }
  };

  return (
    <div className="relative rounded-2xl border-2 border-primary bg-white p-4 transition-all hover:shadow-lg">
      {/* Discount Badge */}
      {product.discountRate > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-white">
            خصم {product.discountRate}%
          </span>
        </div>
      )}

      {/* Stock Badge */}
      {product.totalStock === 0 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-white">
            نفذت الكمية
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleAddToWishlist}
          className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white text-primary transition-colors disabled:opacity-50 
            ${
              isInWishlist
                ? "border-primary text-primary hover:border-primary hover:text-primary"
                : "border-primary hover:border-primary hover:text-primary"
            }
          `}
          disabled={isAddingToWishlist || isRemovingFromWishlist}
          aria-label="Add to wishlist"
        >
          <FiHeart
            size={18}
            className={isInWishlist ? "text-primary fill-primary" : ""}
          />
        </button>
        <Link
          href={getLink(`/products/${product.id}`)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary bg-white text-primary transition-colors hover:text-secondary hover:border-secondary"
          aria-label="Quick view"
        >
          <FiEye size={18} />
        </Link>
      </div>

      {/* Product Image */}
      <Link
        href={getLink(`/products/${product.id}`)}
        className="relative mx-auto mb-4 block h-[300px] w-full bg-gray-100 rounded-lg overflow-hidden"
      >
        {product?.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            لا توجد صورة
          </div>
        )}
      </Link>

      <div className="flex items-end justify-between gap-3">
        <Link
          href={getLink(`/products/${product.id}`)}
          className="text-right flex-1 min-w-0"
        >
          <span className="inline-block mb-1 text-base font-semibold text-gray-800 hover:text-primary line-clamp-2">
            {product.name}
          </span>
          <div className="mb-1 flex items-center justify-end gap-2">
            {product.discountRate > 0 && (
              <span className="text-sm text-gray-400 line-through">
                <CurrencyFormatter
                  amount={product.price}
                  currency={product.currency}
                  amountClassName="font-normal"
                  iconSize={16}
                />
              </span>
            )}
            <CurrencyFormatter
              amount={product.finalPrice}
              currency={product.currency}
              amountClassName="text-sm font-bold text-gray-700"
              iconSize={18}
            />
          </div>
          <div className="flex items-center justify-end gap-1" dir="ltr">
            <RenderStars rating={product.averageRating} />
            {product.reviewCount > 0 && (
              <span className="text-xs text-gray-400 mr-1">
                ({product.reviewCount})
              </span>
            )}
          </div>
        </Link>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={
            isInCart ||
            isAddingToCart ||
            isLoadingCart ||
            product.totalStock === 0
          }
          className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors flex-shrink-0
            ${
              product.totalStock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : isInCart
                  ? "bg-primary cursor-default"
                  : isAddingToCart || isLoadingCart
                    ? "bg-gray-400 cursor-wait"
                    : "bg-primary "
            }
          `}
          aria-label={isInCart ? "تمت الإضافة إلى السلة" : "أضف إلى السلة"}
          title={
            product.totalStock === 0
              ? "نفذت الكمية"
              : isInCart
                ? "تمت الإضافة إلى السلة"
                : isAddingToCart || isLoadingCart
                  ? "جاري الإضافة..."
                  : isAuthenticated
                    ? "أضف إلى السلة"
                    : "يجب تسجيل الدخول أولاً"
          }
        >
          {isAddingToCart || isLoadingCart ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : isInCart ? (
            <BsCheckLg size={20} />
          ) : (
            <BsBagPlus size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
