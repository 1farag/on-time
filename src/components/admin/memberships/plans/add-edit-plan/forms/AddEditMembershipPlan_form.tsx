"use client";

import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  InputNumber,
  Switch,
  ColorPicker,
} from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useAddEditMembershipPlan } from "../hooks/useAddEditDeleteMembershipPlan";

const { Option } = Select;
const { TextArea } = Input;

interface BenefitItem {
  key: string;
  value: boolean | number;
  type: "boolean" | "number";
}
interface AddEditMembershipPlanFormProps {
  planData?: any;
  isEdit?: boolean;
}

export const AddEditMembershipPlanForm = ({
  planData,
  isEdit = false,
}: AddEditMembershipPlanFormProps) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [benefits, setBenefits] = useState<BenefitItem[]>([]);

  const { addEditMembershipPlanMutation, addEditMembershipPlanLoading } =
    useAddEditMembershipPlan();

  const addBenefit = () => {
    setBenefits([
      ...benefits,
      {
        key: "",
        value: true,
        type: "number",
      },
    ]);
  };

  const updateBenefit = (
    index: number,
    field: keyof BenefitItem,
    value: any
  ) => {
    const updated = [...benefits];
    (updated[index][field] as BenefitItem[keyof BenefitItem]) = value;
    setBenefits(updated);
  };

  const updateBenefitValue = (index: number, value: boolean | number) => {
    const updated = [...benefits];
    updated[index].value = value;
    setBenefits(updated);
  };

  const updateBenefitType = (index: number, type: "boolean" | "number") => {
    const updated = [...benefits];
    updated[index].type = type;
    updated[index].value = type === "boolean" ? true : 0;
    setBenefits(updated);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
      price: Number(values.price),
      // durationValue:
      //   values.periodType === "lifetime"
      //     ? undefined
      //     : Number(values.durationValue),
      discountRate: Number(values.discountRate),
      pointsMultiplier: Number(values.pointsMultiplier) ?? 1,
      freeShipping: values.freeShipping ?? false,
      isActive: values.isActive ?? true,
      benefits: benefits.filter((b) => b.key),
      pointsSection: {
        title: values.pointsTitle,
        description: values.pointsDescription,
        example: values.pointsExample,
      },
    };

    console.log("FINAL PAYLOAD", payload);
    addEditMembershipPlanMutation(payload).then(() => {
      // toast.success(isEdit ? "تم التحديث بنجاح" : "تمت الإضافة بنجاح");
      router.back();
    });
  };

  useEffect(() => {
    if (!planData) return;
    form.setFieldsValue(planData);
    if (planData.benefits) {
      const mappedBenefits = planData.benefits.map((b: any) => ({
        ...b,
        type: typeof b.value === "boolean" ? "boolean" : "number",
      }));
      setBenefits(mappedBenefits);
    } else {
      setBenefits([]);
    }
  }, [planData, form]);

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      {/* ================= بيانات الخطة ================= */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h4 className="font-bold text-lg mb-6">بيانات الخطة</h4>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="المعرف الداخلي"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="المعرف الداخلي (tai_plus)" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="اسم الخطة بالإنجليزية"
                name="displayName"
                rules={[{ required: true }]}
              >
                <Input placeholder="اسم الخطة بالإنجليزية" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="اسم الخطة بالعربية"
                name="displayNameAr"
                rules={[{ required: true }]}
              >
                <Input placeholder="اسم الخطة بالعربية" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="سعر الاشتراك"
                name="price"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  className="w-full"
                  placeholder="سعر الاشتراك"
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="selectS1">
              <Form.Item
                label="نوع الاشتراك"
                name="periodType"
                rules={[{ required: true }]}
              >
                <Select placeholder="نوع الاشتراك">
                  <Option value="day">يومي</Option>
                  <Option value="month">شهري</Option>
                  <Option value="year">سنوي</Option>
                  <Option value="lifetime">مدى الحياة</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>

          {/* <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item label="مدة الاشتراك" name="durationValue">
                <Input
                  type="number"
                  className="w-full"
                  placeholder="مدة الاشتراك"
                />
              </Form.Item>
            </div>
          </Col> */}

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="نسبة الخصم"
                name="discountRate"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  className="w-full"
                  placeholder="نسبة الخصم %"
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="مضاعف النقاط"
                name="pointsMultiplier"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  className="w-full"
                  placeholder="مضاعف النقاط (مثلاً 2 يعني مضاعفة النقاط المكتسبة)"
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="اللون"
                name="color"
                rules={[{ required: true }]}
                getValueFromEvent={(color) => color.toHexString()}
              >
                <ColorPicker
                  className="w-full !min-h-[48px] flex !items-center"
                  showText
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                name="freeShipping"
                label="شحن مجاني"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                name="isActive"
                label="الخطة مفعلة"
                valuePropName="checked"
                initialValue
              >
                <Switch />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div>

      {/* ================= المميزات ================= */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h4 className="font-bold text-lg mb-4">مميزات الخطة</h4>

        <Button
          type="primary"
          icon={<FiPlus />}
          onClick={addBenefit}
          className="mb-4"
        >
          إضافة ميزة
        </Button>

        {benefits.map((b, index) => (
          <Row gutter={[16, 16]} key={index} className="mb-6">
            {/* Benefit Key */}
            <Col xs={24} lg={8}>
              <div className="inputS1">
                <Input
                  placeholder="مفتاح الميزة (free_shipping)"
                  value={b.key}
                  onChange={(e) => updateBenefit(index, "key", e.target.value)}
                />
              </div>
            </Col>

            {/* Type Selector */}
            <Col xs={24} lg={6}>
              <div className="selectS1">
                <Select
                  value={b.type}
                  onChange={(value) => updateBenefitType(index, value)}
                  placeholder="نوع القيمة"
                >
                  <Option value="boolean">نعم / لا</Option>
                  <Option value="number">قيمة مخصصة</Option>
                </Select>
              </div>
            </Col>

            {/* Value */}
            <Col xs={24} lg={6}>
              {b.type === "boolean" ? (
                <div className="selectS1">
                  <Select
                    value={b.value ? true : false}
                    onChange={(v) => updateBenefitValue(index, v === true)}
                    className="w-full"
                  >
                    <Option value={true}>نعم</Option>
                    <Option value={false}>لا</Option>
                  </Select>
                </div>
              ) : (
                <div className="inputS1">
                  <Input
                    type="number"
                    className="w-full"
                    placeholder="القيمة"
                    value={b.value as number}
                    onChange={(e) =>
                      updateBenefitValue(index, Number(e.target.value))
                    }
                  />
                </div>
              )}
            </Col>

            {/* Remove */}
            <Col xs={24} lg={4}>
              <Button
                danger
                onClick={() => removeBenefit(index)}
                className="h-full w-full"
              >
                <FiTrash />
              </Button>
            </Col>
          </Row>
        ))}
      </div>

      {/* ================= النقاط ================= */}
      {/* <div className="bg-white border rounded-xl p-6 mb-6">
        <h4 className="font-bold text-lg mb-4">نظام النقاط</h4>

        <div className="inputS1">
          <Form.Item name="pointsTitle">
            <Input placeholder="عنوان نظام النقاط" />
          </Form.Item>
        </div>

        <div className="inputS1">
          <Form.Item name="pointsDescription">
            <Input placeholder="وصف نظام النقاط" />
          </Form.Item>
        </div>

        <div className="inputS1">
          <Form.Item name="pointsExample">
            <TextArea rows={4} placeholder="مثال توضيحي" />
          </Form.Item>
        </div>
      </div> */}

      {/* ================= أزرار ================= */}
      <div className="flex justify-end gap-4">
        <Button
          type="primary"
          htmlType="submit"
          loading={addEditMembershipPlanLoading}
          disabled={addEditMembershipPlanLoading}
        >
          حفظ
        </Button>
        <Button onClick={() => router.back()}>إلغاء</Button>
      </div>
    </Form>
  );
};
