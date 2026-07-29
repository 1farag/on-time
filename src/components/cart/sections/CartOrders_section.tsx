"use client";
import { Col, Row } from "antd";
import { CartCard, ItemType } from "./CartCard";
import { OrderSummary } from "./OrderSummary";
import Link from "next/link";
import { useGetCart } from "@/components/tools/cards/hooks/cartHook";
import { EmptyCart_section } from "./EmptyCart_section";
import { ProductType } from "@/types/types";

export const CartOrders_section = () => {
  const { cart } = useGetCart();

  return (
    <section className="py-24">
      <div className="container">
        {cart?.items.length === 0 && <EmptyCart_section />}
        {cart?.items.length > 0 && (
          <Row gutter={[30, 30]}>
            <Col span={24} lg={16}>
              <div className="flex flex-col gap-8">
                {cart?.items.map((item: ItemType) => (
                  <CartCard
                    key={item._id}
                    item={item}
                    currency={cart.currency}
                  />
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
              <OrderSummary cart={cart} />
            </Col>
          </Row>
        )}
      </div>
    </section>
  );
};
