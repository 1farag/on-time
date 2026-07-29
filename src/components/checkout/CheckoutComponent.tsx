"use client";
import style from "./style/checkout.module.scss";
import { Col, Form, Row } from "antd";
import { useEffect, useState } from "react";
import { CheckoutOrderDetailsModal } from "./modals/CheckoutOrderDetailsModal";
import { OrderSummary_section } from "./sections/OrderSummary_section";
import { useForm } from "antd/es/form/Form";
import { UserDetails } from "./sections/UserDetails";
import { useCheckout } from "./hooks/useCheckout";
import { getAffiliateRef } from "@/lib/affiliateRef";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

export const CheckoutComponent = () => {
  const [form] = useForm();
  const { checkoutMutation, checkoutLoading } = useCheckout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const affiliateRef = getAffiliateRef();
      const response = await checkoutMutation({
        ...values,
        paymentMethod: "MY_FATOORAH",
        shippingType: values.shippingType,
        phone: `966${values.phone}`,
        ...(affiliateRef ? { affiliateCode: affiliateRef } : {}),
      });

      const resData = response?.data?.data || response?.data || response || {};
      setOrderData(resData);
      setIsModalOpen(true);
    } catch (errors) {
      // handleFormErrors(form, errors);
    }
  };

  const handleModalOk = () => {
    const checkoutUrl =
      orderData?.payment?.checkoutUrl || orderData?.checkoutUrl;

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      setIsModalOpen(false);
      form.resetFields();
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.mobile?.replace(/^(\+?966)/, "") || "",
      });
    }
  }, [user, form]);

  return (
    <main className={style.checkout}>
      <CheckoutOrderDetailsModal
        isOpen={isModalOpen}
        orderData={orderData}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
      />
      <Form
        name="checkout_form"
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <section className="py-24">
          <div className="container">
            <Row gutter={[30, 30]}>
              <Col span={24} lg={16}>
                <UserDetails />
              </Col>
              <Col span={24} lg={8}>
                <OrderSummary_section checkoutLoading={checkoutLoading} />
              </Col>
            </Row>{" "}
          </div>
        </section>{" "}
      </Form>
    </main>
  );
};
