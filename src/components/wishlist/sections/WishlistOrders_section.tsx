"use client";

import { Col, Row } from "antd";
import Link from "next/link";
import {
  useGetWishlist,
  useRemoveFromWishlist,
} from "@/components/tools/cards/hooks/wishlistHook";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

type WishlistItem = {
  _id: string;
  productId: string;
  productName: string;
  itemImage: string;
  productPrice: number;
  isAvailable: boolean;
};

export const WishlistOrders_section = () => {
  // const { wishlist } = useGetWishlist();
  const { removeFromWishlist, isRemovingFromWishlist } =
    useRemoveFromWishlist();
  // const items: WishlistItem[] = wishlist.items || [];

  return (
    <section className="py-24">
      <div className="container">
        {/* {items.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              قائمة المفضلة فارغة
            </h2>
            <p className="mb-6 text-gray-600">
              لم تقم بإضافة أي منتجات إلى المفضلة بعد.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-2 rounded-lg text-lg font-medium transition-colors text-center"
            >
              استكشف المنتجات
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <Row gutter={[30, 30]}>
            <Col span={24} lg={16}>
              <div className="flex flex-col gap-8">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="cart-card relative md:text-center"
                  >
                    <button
                      onClick={() =>
                        removeFromWishlist({ productId: item.productId })
                      }
                      disabled={isRemovingFromWishlist}
                      className="text-secondary absolute text-lg top-5 left-5 z-10"
                    >
                      <RiDeleteBin6Line />
                    </button>

                    <Row gutter={[30, 30]}>
                      <Col span={24} md={5}>
                        <div className="relative md:mx-auto w-[128px] mb-4 h-[128px] rounded-lg bg-[#F8FAFC]">
                          <Image
                            src={item.itemImage || "/images/placeholder.png"}
                            fill
                            className="object-contain"
                            alt={item.productName}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                          />
                        </div>
                      </Col>

                      <Col span={24} md={19}>
                        <div>
                          <h4 className="text-xl font-bold text-secondary mb-3">
                            {item.productName}
                          </h4>

                          <p className="text-md mb-3">
                            السعر: {item.productPrice} ر.س
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}

                <Link
                  href="/products"
                  className="flex items-center justify-center w-full bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-2 rounded-lg text-lg font-medium transition-colors text-center"
                >
                  متابعة التسوق
                </Link>
              </div>
            </Col>

            <Col span={24} lg={8}>
              <div className="order-summary">
                <h5 className="text-primary text-2xl font-bold mb-6">
                  ملخص المفضلة
                </h5>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#64748B] text-lg">
                    عدد المنتجات في المفضلة
                  </span>
                  <span className="text-secondary text-lg">{items.length}</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  يمكنك نقل المنتجات من المفضلة إلى السلة من صفحة المنتج.
                </p>
              </div>
            </Col>
          </Row>
        )} */}
      </div>
    </section>
  );
};
