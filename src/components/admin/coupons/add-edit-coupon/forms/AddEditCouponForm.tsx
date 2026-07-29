"use client";

import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
  Checkbox,
  Switch,
} from "antd";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useCreateCoupon,
  useUpdateCoupon,
  useGetCouponById,
} from "../../hooks/useCoupons";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const { Option } = Select;

export const AddEditCouponForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEdit = !!id;

  const { data: couponData, isLoading: isFetching } = useGetCouponById(id);
  const { mutateAsync: createCoupon, isPending: isCreating } =
    useCreateCoupon();
  const { mutateAsync: updateCoupon, isPending: isUpdating } =
    useUpdateCoupon();

  const onFinish = async (values: any) => {
    const formattedValues = {
      ...values,
      startDate: values.startDate?.toISOString(),
      endDate: values.endDate?.toISOString(),
      maxDiscountAmount: Number(values.maxDiscountAmount) || null,
      minOrderAmount: Number(values.minOrderAmount) || null,
      usageLimit: Number(values.usageLimit) || null,
      amount: Number(values.amount) || null,
    };

    try {
      if (isEdit) {
        await updateCoupon({ id, data: formattedValues });
      } else {
        await createCoupon(formattedValues);
      }
      router.push("/admin/coupons");
    } catch (error) {
      // Error is handled in the hook's onError
    }
  };

  useEffect(() => {
    if (couponData) {
      form.setFieldsValue({
        ...couponData,
        startDate: couponData.startDate ? dayjs(couponData.startDate) : null,
        endDate: couponData.endDate ? dayjs(couponData.endDate) : null,
      });
    }
  }, [couponData, form]);

  if (isEdit && isFetching) {
    return (
      <div className="flex justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#385B66]"></div>
      </div>
    );
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      name="addEditCouponForm"
      initialValues={{
        type: "percentage",
        isActive: true,
      }}
    >
      <div className="bg-white border border-[#DCE3E5] rounded-xl p-6">
        <h4 className="p-6 pt-0 ps-0 mb-6 border-b border-[#DCE3E5] font-bold">
          بيانات الكوبون الأساسية
        </h4>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="كود الكوبون"
                name="code"
                rules={[{ required: true, message: "ادخل كود الكوبون" }]}
              >
                <Input placeholder="مثال: SUMMER20" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="selectS1">
              <Form.Item
                label="نوع الخصم"
                name="type"
                rules={[{ required: true, message: "اختر نوع الخصم" }]}
              >
                <Select placeholder="اختر النوع">
                  <Option value="percentage">نسبة مئوية (%)</Option>
                  <Option value="fixed">مبلغ ثابت (ر.س)</Option>
                  <Option value="shipping">شحن مجاني</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="قيمة الخصم"
                name="amount"
                rules={[{ required: true, message: "ادخل القيمة" }]}
              >
                <Input type="number" placeholder="القيمة" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="حد الاستخدام"
                name="usageLimit"
                rules={[{ required: true, message: "ادخل حد الاستخدام" }]}
              >
                <Input type="number" placeholder="مثال: 100" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item label="تاريخ البدء" name="startDate">
                <DatePicker className="w-full" placeholder="تاريخ البدء" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item label="تاريخ الانتهاء" name="endDate">
                <DatePicker className="w-full" placeholder="تاريخ الانتهاء" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item label="الحد الأدنى للطلب" name="minOrderAmount">
                <Input type="number" placeholder="ر.س" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item label="أقصى مبلغ للخصم" name="maxDiscountAmount">
                <Input type="number" placeholder="ر.س" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="isActive"
              valuePropName="checked"
              className="pt-8"
              label="حاله الكوبون"
            >
              <Switch checkedChildren="تفعيل" unCheckedChildren="تعطيل" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item label="الوصف" name="description">
                <Input.TextArea rows={3} placeholder="وصف الكوبون..." />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <div className="flex items-center justify-end gap-4 mt-8">
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
            className="px-8 h-10 font-bold"
          >
            حفظ
          </Button>
          <Button
            type="default"
            onClick={() => router.push("/admin/coupons")}
            className="px-8 h-10 font-bold"
          >
            إلغاء
          </Button>
        </div>
      </div>
    </Form>
  );
};
