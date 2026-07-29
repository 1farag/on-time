import { ReactNode, useEffect, useState } from "react";
import Modal from "antd/es/modal/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useAddEditLoyaltyPoint } from "../hooks/useAddEditDeleteLoyaltyPoints";
const { Option } = Select;

type AddLoyaltyRuleModalType = {
  children: ReactNode;
  onSubmit?: (values: any) => Promise<void>;
  submitLoading?: boolean;
  isEdit?: boolean;
  record?: any; // You can replace 'any' with the specific type of your loyalty rule record
};

const earnRuleActions = [
  "purchase",
  "favorite",
  "share",
  "review",
  "repeat_purchase",
  "registration_bonus",
  "referral_first_order",
  "referral_new_customer",
  "birthday_bonus",
  "extra_points",
  "special_discount",
  "loyalty_points",
];

const earnRuleLabels: Record<string, string> = {
  purchase: "إجراء عملية شراء",
  favorite: "إضافة للمفضلة",
  share: "مشاركة",
  review: "كتابة مراجعة",
  repeat_purchase: "إعادة الشراء",
  registration_bonus: "مكافأة التسجيل",
  referral_first_order: "أول طلب من الإحالة",
  referral_new_customer: "إحالة عميل جديد",
  birthday_bonus: "مكافأة عيد الميلاد",
  extra_points: "نقاط إضافية",
  special_discount: "خصم خاص",
  loyalty_points: "نقاط الولاء",
};

export const AddEditLoyaltyPoint_modal = ({
  children,
  onSubmit,
  submitLoading = false,
  record,
  isEdit = false,
}: AddLoyaltyRuleModalType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { addEditLoyaltyPointMutation, addEditLoyaltyPointLoading } =
    useAddEditLoyaltyPoint(record?._id || "");
  const showModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModalOpen(true);

    if (isEdit && record) {
      form.setFieldsValue(record);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      await addEditLoyaltyPointMutation({
        ...values,
        pointsPerAction: Number(values.pointsPerAction),
        isActive: values.isActive,
      });

      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  console.log(record);

  // useEffect(() => {
  //   if (isEdit && record) {
  //     form.setFieldsValue({
  //       ...record,
  //     });
  //   }
  // }, [record, isEdit, form, record]);

  return (
    <>
      <a onClick={showModal}>{children}</a>
      <Modal
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
        width="600px"
        wrapClassName="mainModal"
        footer={null}
        centered
      >
        <div className="heading !border-b-[0px] align between flex mb-4">
          <h3 className="font-bold text-xl">
            {record ? "تعديل قاعدة النقاط" : "إضافة قاعدة جديدة"}
          </h3>
          <button className="closeBtn" onClick={handleCancel}>
            <AiOutlineClose />
          </button>
        </div>

        <Form form={form} layout="vertical" className="mt-4">
          <div className="inputS1">
            <Form.Item
              label="الاسم / العنوان"
              name="displayName"
              rules={[{ required: true, message: "يرجى إدخال اسم القاعدة" }]}
            >
              <Input placeholder="مثال: المشتريات" size="large" />
            </Form.Item>
          </div>

          <div className="inputS1">
            <Form.Item
              label="قيمة النقاط"
              name="pointsPerAction"
              rules={[{ required: true, message: "يرجى إدخال قيمة النقاط" }]}
            >
              <Input
                type="number"
                placeholder="قيمة النقاط"
                className="w-full"
                min={1}
              />
            </Form.Item>
          </div>
          <div className="selectS1">
            <Form.Item label="الشرط" name="action">
              <Select placeholder="اختر الإجراء">
                {earnRuleActions.map((action) => (
                  <Option key={action} value={action}>
                    {earnRuleLabels[action]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="inputS1">
            <Form.Item
              label="الشرط"
              name="conditionText"
              tooltip="مثال: إذا كانت القاعدة تعتمد على المشتريات، يمكنك وضع الحد الأدنى لقيمة المشتريات التي يجب أن يحققها العميل للحصول على النقاط."
            >
              <Input
                type="number"
                placeholder="الشرط"
                className="w-full"
                min={0}
              />
            </Form.Item>
          </div>
          <div className="selectS1">
            <Form.Item label="الحالة" name="isActive" initialValue={true}>
              <Select size="large">
                <Select.Option value={true}>نشط</Select.Option>
                <Select.Option value={false}>غير نشط</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>

        <div className="flex items-center justify-end mt-6 gap-2">
          <Button type="default" onClick={handleCancel} size="large">
            إلغاء
          </Button>
          <Button
            type="primary"
            loading={addEditLoyaltyPointLoading}
            disabled={addEditLoyaltyPointLoading}
            size="large"
            onClick={handleSubmit}
          >
            حفظ{" "}
          </Button>
        </div>
      </Modal>
    </>
  );
};
