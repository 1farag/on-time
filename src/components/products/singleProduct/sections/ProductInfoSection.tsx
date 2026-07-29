// components/products/singleProduct/sections/ProductInfoSection.tsx
"use client";

import { RenderStars } from "@/utils/renderStars";
import { Button, Col, Row, Space, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { CiShare2 } from "react-icons/ci";
import Image from "next/image";
import QuantityInput from "@/components/tools/inputs/QuantityInput";
import { FiTruck, FiShield } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { useCookies } from "react-cookie";
import { useRouter, usePathname } from "next/navigation";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import toast from "react-hot-toast";
import {
  useAddToCart,
  useGetCart,
  useUpdateCartItem,
} from "@/components/tools/cards/hooks/cartHook";
import { useAuth } from "@/hooks/auth/useAuth";
import { ProductType } from "@/types/types";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";

interface ProductInfoSectionProps {
  product: ProductType;
}

export const ProductInfoSection = ({ product }: ProductInfoSectionProps) => {
  const { cart } = useGetCart();

  const [activeImage, setActiveImage] = useState(
    product?.images[0] || "/placeholder.jpg"
  );
  const [size, setSize] = useState(product.availableSizes[0] || "M");
  const [quantity, setQuantity] = useState(1);

  const cartItem = cart?.items?.find(
    (item: { productId: string; size: string }) =>
      item.productId === (product.id || product._id) && item.size === size
  );

  const router = useRouter();
  const pathname = usePathname();
  const getLink = useLocalizedLink();
  const { isAuthenticated } = useAuth();
  const { addToCart, isAddingToCart } = useAddToCart();
  const { updateCartItem, isUpdatingCartItem } = useUpdateCartItem();
  const isInCart = !!cartItem;

  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  // Calculate discount percentage
  const discountPercentage = product.discountRate;

  // Check if product is in stock
  const isInStock = product.totalStock > 0;

  // Get stock for selected size
  const selectedSizeStock =
    product.items.find((item) => item.size === size)?.stock || 0;

  const handleShareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          url: productUrl,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard?.writeText(productUrl);
      toast.success("تم نسخ الرابط");
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("يجب تسجيل الدخول أولاً");
      router.push(getLink(`/user/login?redirect=${pathname}`));
      return;
    }

    if (!isInStock || selectedSizeStock < quantity) {
      toast.error("الكمية المطلوبة غير متوفرة");
      return;
    }

    if (isInCart && cartItem) {
      updateCartItem({
        itemId: cartItem._id, // use the _id of the cart item
        quantity,
      });
    } else {
      addToCart({
        productId: product.id || product._id,
        quantity,
        size,
        color: product.color,
      });
    }
  };

  useEffect(() => {
    const sizeItem = cart?.items?.find(
      (i: { productId: string; size: string }) =>
        i.productId === (product.id || product._id) && i.size === size
    );

    if (sizeItem) {
      setQuantity(sizeItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [size, cart]);

  return (
    <section>
      <Row gutter={[64, 64]}>
        <Col span={24} md={12}>
          <div>
            {/* Main Image */}
            <div className="relative mx-auto mb-4 h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={activeImage}
                fill
                className="object-contain"
                alt={product.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                priority
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto justify-center">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`relative h-20 w-20 flex-shrink-0 rounded-lg border transition
                      ${
                        activeImage === img
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-gray-200 hover:border-gray-400"
                      }
                    `}
                  >
                    <Image
                      src={img}
                      fill
                      className="object-contain p-2"
                      alt={`${product.name} - صورة ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Col>
        <Col span={24} md={12}>
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-4">
              {product.name}
            </h1>

            <div className="flex items-center justify-end gap-2" dir="ltr">
              <RenderStars rating={product.averageRating} />
              <span className="flex ms-2">
                {product.averageRating.toFixed(1)} ({product.reviewCount} تقييم)
              </span>
            </div>

            <div className="mb-1 flex items-center gap-2 mt-2">
              <CurrencyFormatter
                amount={product.finalPrice}
                currency={product.currency}
                amountClassName="text-xl font-bold text-gray-700"
                iconSize={22}
              />

              {product.discountRate > 0 && (
                <>
                  <CurrencyFormatter
                    amount={product.price}
                    currency={product.currency}
                    amountClassName="text-xl text-gray-400 line-through"
                    iconSize={20}
                  />
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                    خصم {discountPercentage}%
                  </span>
                </>
              )}
            </div>

            <span
              className={`${
                isInStock ? "bg-primary" : "bg-red-500"
              } text-white text-[12px] px-2 rounded-lg inline-block my-6`}
            >
              {isInStock ? "متوفر في المخزون" : "غير متوفر"}
            </span>

            <div className="space-y-6 text-right">
              {/* Size Selection */}
              {product.availableSizes.length > 0 && (
                <div className="border-t border-[#e5e5e5] pt-6">
                  <Typography.Text className="block mb-3 font-medium">
                    اختر المقاس
                  </Typography.Text>

                  <Space wrap>
                    {product.availableSizes.map((s) => {
                      const sizeStock =
                        product.items.find((item) => item.size === s)?.stock ||
                        0;
                      const isSizeAvailable = sizeStock > 0;

                      return (
                        <button
                          key={s}
                          onClick={() => isSizeAvailable && setSize(s)}
                          disabled={!isSizeAvailable}
                          className={`w-14 h-14 rounded-lg border-2 transition ${
                            !isSizeAvailable
                              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : size === s
                                ? "bg-primary text-white border-primary"
                                : "border-[#E5E7EB] hover:border-primary"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </Space>

                  {selectedSizeStock > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      متوفر: {selectedSizeStock} قطعة
                    </p>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div>
                <Typography.Text className="block mb-3 font-medium">
                  الكمية
                </Typography.Text>
                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                  max={selectedSizeStock}
                  min={1}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <Button
                  type="primary"
                  size="large"
                  icon={<LuShoppingCart />}
                  className="flex-1 h-12 rounded-md"
                  onClick={handleAddToCart}
                  loading={isAddingToCart || isUpdatingCartItem}
                  disabled={!isInStock || selectedSizeStock < quantity}
                >
                  {isInCart ? "تحديث السلة" : "أضف إلى السلة"}
                </Button>

                <button
                  onClick={handleShareLink}
                  className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-primary text-primary text-2xl hover:bg-primary hover:text-white transition"
                >
                  <CiShare2 />
                </button>
              </div>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-4 border-t border-[#e5e5e5] pt-6 mt-6">
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1F5F9] text-secondary rounded-full text-xl">
                  <FiTruck />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary">شحن مجاني</span>
                  <span className="text-[#2D2D31] flex items-center gap-1">
                    للطلبات فوق <CurrencyFormatter amount={300} iconSize={16} />
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1F5F9] text-secondary rounded-full text-xl">
                  <TbReload />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary">إرجاع مجاني</span>
                  <span className="text-[#2D2D31]">خلال 14 يوم من الشراء</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F1F5F9] text-secondary rounded-full text-xl">
                  <FiShield />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary">منتج أصلي</span>
                  <span className="text-[#2D2D31]">100% من نادي الطائي</span>
                </div>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  );
};
