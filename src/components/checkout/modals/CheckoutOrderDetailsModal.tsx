import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";
import { Modal, Button, Divider, Typography } from "antd";
import React from "react";

const { Text, Title } = Typography;

interface CheckoutOrderDetailsModalProps {
  isOpen: boolean;
  orderData: any;
  onOk: () => void;
  onCancel: () => void;
}

export const CheckoutOrderDetailsModal: React.FC<
  CheckoutOrderDetailsModalProps
> = ({ isOpen, orderData, onOk, onCancel }) => {
  if (!orderData) return null;

  return (
    <Modal
      title={<Title level={4}>تفاصيل الطلب</Title>}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          إغلاق
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          متابعة الدفع
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-2 my-4">
        <div className="flex justify-between">
          <Text strong>رقم الطلب:</Text>
          <Text>{orderData.orderId || orderData._id}</Text>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between">
          <Text strong>المجموع الفرعي:</Text>
          <Text>
            <CurrencyFormatter
              amount={orderData.subtotal}
              currency={orderData.currency}
              amountClassName="text-md font-bold text-gray-700"
              iconSize={18}
            />
          </Text>
        </div>
        <div className="flex justify-between">
          <Text strong>رسوم الشحن:</Text>
          <Text>
            <CurrencyFormatter
              amount={orderData.shippingFee}
              currency={orderData.currency}
              amountClassName="text-md font-bold text-gray-700"
              iconSize={18}
            />
          </Text>
        </div>
        <div className="flex justify-between">
          <Text strong>الخصم:</Text>
          <Text>
            <CurrencyFormatter
              amount={orderData.discountTotal}
              currency={orderData.currency}
              amountClassName="text-md font-bold text-gray-700"
              iconSize={18}
            />
          </Text>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between">
          <Title level={5} className="!m-0 text-primary">
            الإجمالي:
          </Title>
          <Title level={5} className="!m-0 text-primary">
            <CurrencyFormatter
              amount={orderData.total}
              currency={orderData.currency}
              amountClassName="text-md font-bold text-gray-700"
              iconSize={18}
            />
          </Title>
        </div>
      </div>
    </Modal>
  );
};
