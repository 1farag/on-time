import {
  useRemoveFromCart,
  useUpdateCartItem,
} from "@/components/tools/cards/hooks/cartHook";
import QuantityInput from "@/components/tools/inputs/QuantityInput";
import { Col, Row } from "antd";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";

export interface ItemType {
  _id: string;
  productName: string;
  itemImage: string;
  size: string;
  quantity: number;
  lineTotal: number;
  productPrice: number;
}

export const CartCard = ({
  item,
  currency,
}: {
  item: ItemType;
  currency: string;
}) => {
  const { updateCartItem, isUpdatingCartItem } = useUpdateCartItem();
  const { removeFromCart, isRemovingFromCart } = useRemoveFromCart();

  const [quantity, setQuantity] = useState(item.quantity);

  // store previous value for rollback
  const prevQuantityRef = useRef(item.quantity);

  const handleDeleteProduct = () => {
    removeFromCart({
      itemId: item._id,
      size: item.size,
    });
  };

  const handleChangeQuantityCart = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    // optimistic update in UI
    setQuantity(newQuantity);

    try {
      updateCartItem({
        itemId: item._id,
        quantity: newQuantity,
      });

      // success → lock new value
      prevQuantityRef.current = newQuantity;
    } catch (err) {
      // rollback if failed
      setQuantity(prevQuantityRef.current);
      toast.error("فشل تحديث الكمية، تم الرجوع للقيمة السابقة");
    }
  };

  useEffect(() => {
    setQuantity(item.quantity);
    prevQuantityRef.current = item.quantity;
  }, [item.quantity]);

  console.log(item);
  return (
    <div className="cart-card relative md:text-center">
      <button
        onClick={handleDeleteProduct}
        disabled={isRemovingFromCart}
        className="text-secondary absolute text-lg top-5 left-5 z-10"
      >
        <RiDeleteBin6Line />
      </button>

      <Row gutter={[30, 30]}>
        <Col span={24} md={5}>
          <div className="relative md:mx-auto w-[128px] mb-4 h-[128px] rounded-lg bg-[#F8FAFC]">
            <Image
              src={item.itemImage}
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

            <p className="text-md mb-3">المقاس : {item.size}</p>

            <div className="flex justify-center sm:justify-between items-center sm:items-end flex-col md:flex-row gap-2">
              <QuantityInput
                value={quantity}
                onChange={handleChangeQuantityCart}
                // disabled={isUpdatingCartItem}
                min={1}
              />

              <div className="flex flex-col items-end">
                <span className="text-secondary font-bold text-xl">
                  {item.lineTotal} {currency}
                </span>
                <div className="flex gap-2 dir-rtl">
                  <span>
                    <CurrencyFormatter
                      amount={item.productPrice}
                      currency={currency}
                      amountClassName="text-sm font-bold text-gray-700"
                      iconSize={18}
                    />
                  </span>
                  <span> × {item.quantity}</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
