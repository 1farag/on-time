import { ReactNode, useState, useEffect } from "react";
import Modal from "antd/es/modal/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Form, Input, Select } from "antd";
import { useAddEditAffiliateRule } from "../hooks/useAddEditDeleteAffiliateRules";

type AddEditCommissionRuleModalType = {
  children: ReactNode;
  isEdit?: boolean;
  record?: any;
};

export const AddEditCommissionRule_modal = ({
  children,
  record,
  isEdit = false,
}: AddEditCommissionRuleModalType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { addEditRuleMutation, isPending } = useAddEditAffiliateRule(
    record?._id || ""
  );

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

      addEditRuleMutation(
        {
          ...values,
          minOrderAmount: Number(values.minOrderAmount),
          commissionRate: Number(values.commissionRate),
        },
        {
          onSuccess: () => {
            form.resetFields();
            setIsModalOpen(false);
          },
        }
      );
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <a onClick={showModal} className="cursor-pointer">
        {children}
      </a>
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
            {record ? "تعديل قاعدة عمولة" : "إضافة قاعدة عمولة جديدة"}
          </h3>
          <button className="closeBtn cursor-pointer" onClick={handleCancel}>
            <AiOutlineClose />
          </button>
        </div>

        <Form form={form} layout="vertical" className="mt-4">
          <div className="inputS1">
            <Form.Item
              label="الاسم / العنوان"
              name="name"
              rules={[{ required: true, message: "يرجى إدخال اسم القاعدة" }]}
            >
              <Input placeholder="مثال: عمولة أساسية" size="large" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="inputS1">
              <Form.Item
                label="النسبة (%)"
                name="commissionRate"
                rules={[{ required: true, message: "يرجى إدخال النسبة" }]}
              >
                <Input
                  type="number"
                  placeholder="النسبة"
                  className="w-full"
                  min={0}
                  max={100}
                />
              </Form.Item>
            </div>
            <div className="inputS1">
              <Form.Item
                label="الحد الأدنى للطلب (ر.س)"
                name="minOrderAmount"
                rules={[
                  { required: true, message: "يرجى إدخال الحد الأدنى للطلب" },
                ]}
              >
                <Input
                  type="number"
                  placeholder="الحد الأدنى للطلب"
                  className="w-full"
                  min={0}
                />
              </Form.Item>
            </div>
          </div>

          <div className="selectS1">
            <Form.Item label="الحالة" name="status" initialValue={true}>
              <Select size="large">
                <Select.Option value={"active"}>نشط</Select.Option>
                <Select.Option value={"inactive"}>غير نشط</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>

        <div className="flex items-center justify-end mt-6 gap-2">
          <Button
            type="default"
            onClick={handleCancel}
            size="large"
            className="cursor-pointer"
          >
            إلغاء
          </Button>
          <Button
            type="primary"
            loading={isPending}
            disabled={isPending}
            size="large"
            onClick={handleSubmit}
            className="cursor-pointer py-1 px-8 text-white rounded bg-orange-500 hover:bg-orange-600 border-none"
          >
            حفظ{" "}
          </Button>
        </div>
      </Modal>
    </>
  );
};
