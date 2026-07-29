import { ReactNode, useEffect, useState } from "react";
import Modal from "antd/es/modal/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Form, Input, Select } from "antd";
import { useAddEditLoyaltyReward } from "../hooks/useAddEditLoyaltyReward";
import { useGetAdminLoyaltyReward } from "../hooks/useGetAdminLoyaltyRewards";
import { useGetAdminLoyaltyOverview } from "../../hooks/useGetLoyalty";

const { Option } = Select;

type AddEditLoyaltyRewardModalProps = {
  children: ReactNode;
  rewardId?: string; // 🔹 if exists → edit mode
  rewardObject?: {
    name: string;
    type: string;
    pointsRequired: number;
    value: number;
    description: string;
    isActive: boolean;
    validityDays: number;
    maxRedemptionsPerUser: number;
  }; // 🔹 to fill form in edit mode
};

export const AddEditLoyaltyReward_modal = ({
  children,
  rewardId,
  rewardObject,
}: AddEditLoyaltyRewardModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const isEdit = !!rewardId;

  const { addEditLoyaltyRewardMutation, addEditLoyaltyRewardLoading } =
    useAddEditLoyaltyReward(rewardId || "");

  // 🔹 Fill form in edit mode
  useEffect(() => {
    if (isEdit && rewardObject) {
      form.setFieldsValue({
        name: rewardObject.name,
        type: rewardObject.type,
        pointsRequired: rewardObject.pointsRequired,
        value: rewardObject.value,
        description: rewardObject.description,
        isActive: String(rewardObject.isActive),
        validityDays: rewardObject.validityDays,
        maxRedemptionsPerUser: rewardObject.maxRedemptionsPerUser,
      });
    }
  }, [rewardObject, isEdit, form, rewardObject]);

  const showModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      await addEditLoyaltyRewardMutation({
        ...values,
        maxRedemptionsPerUser: Number(values.maxRedemptionsPerUser),
        pointsRequired: Number(values.pointsRequired),
        validityDays: Number(values.validityDays),
        value: Number(values.value),
        rewardId, // 🔹 send id if editing
        isActive: values.isActive === "true",
      });

      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    // form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <a onClick={showModal}>{children}</a>

      <Modal
        open={isModalOpen}
        footer={null}
        centered
        width={600}
        onCancel={handleCancel}
        wrapClassName="mainModal"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">
            {isEdit ? "تعديل المكافأة" : "إضافة مكافأة جديدة"}
          </h3>
          <button onClick={handleCancel}>
            <AiOutlineClose />
          </button>
        </div>

        <Form form={form} layout="vertical" className="mt-4">
          <div className="inputS1">
            <Form.Item
              label="الاسم / العنوان"
              name="name"
              rules={[{ required: true, message: "يرجى إدخال الاسم" }]}
            >
              <Input size="large" />
            </Form.Item>
          </div>

          <div className="selectS1">
            <Form.Item
              label="النوع"
              name="type"
              rules={[{ required: true, message: "يرجى اختيار النوع" }]}
            >
              <Select size="large">
                <Option value="discount">خصم</Option>
                <Option value="shipping">توصيل</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="inputS1">
            <Form.Item
              label="قيمة النقاط"
              name="pointsRequired"
              rules={[{ required: true }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
          </div>

          <div className="inputS1">
            <Form.Item label="القيمة" name="value" rules={[{ required: true }]}>
              <Input type="number" min={1} />
            </Form.Item>
          </div>

          <div className="inputS1">
            <Form.Item
              label="الوصف"
              name="description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="selectS1">
            <Form.Item label="الحالة" name="isActive" initialValue="true">
              <Select size="large">
                <Option value="true">نشط</Option>
                <Option value="false">غير نشط</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="inputS1">
            <Form.Item
              label="عدد الأيام"
              name="validityDays"
              rules={[{ required: true }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
          </div>
          <div className="inputS1">
            <Form.Item
              label="الحد الأقصى لعمليات الاسترداد لكل مستخدم"
              name="maxRedemptionsPerUser"
            >
              <Input type="number" min={1} />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={handleCancel} size="large">
              إلغاء
            </Button>
            <Button
              type="primary"
              size="large"
              loading={addEditLoyaltyRewardLoading}
              onClick={handleSubmit}
            >
              حفظ
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
