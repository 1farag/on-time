import React, { useEffect } from "react";
import { Modal, Form, InputNumber, Button, Input } from "antd";
import {
  useGetWithdrawalLimit,
  useSetWithdrawalLimit,
  useUpdateWithdrawalLimit,
} from "../hooks/useAffiliateWithdrawalLimit";

interface WithdrawalLimitModalProps {
  open: boolean;
  onClose: () => void;
}

export const WithdrawalLimitModal = ({
  open,
  onClose,
}: WithdrawalLimitModalProps) => {
  const [form] = Form.useForm();

  const { data: limitData, isLoading } = useGetWithdrawalLimit();
  const { mutateAsync: setLimit, isPending: isSetting } =
    useSetWithdrawalLimit();
  const { mutateAsync: updateLimit, isPending: isUpdating } =
    useUpdateWithdrawalLimit();

  const currentLimit = limitData?.data?.amount;

  useEffect(() => {
    if (open) {
      if (currentLimit !== undefined) {
        form.setFieldsValue({ amount: Number(currentLimit) });
      } else {
        form.resetFields();
      }
    }
  }, [open, currentLimit, form]);

  const handleFinish = async (values: { amount: number }) => {
    try {
      if (currentLimit !== undefined) {
        // If a limit already exists, PATCH it
        await updateLimit({ amount: Number(values.amount) });
      } else {
        // If no limit exists yet, POST it
        await setLimit(values);
      }
      onClose();
    } catch (error) {
      // Error handled in hook toast
    }
  };

  return (
    <Modal
      title="تغيير الحد الأدنى للسحب"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-4"
        disabled={isLoading}
      >
        <div className="inputS1">
          <Form.Item
            name="amount"
            label="الحد الأدنى للسحب (بالريال)"
            rules={[
              { required: true, message: "يرجى إدخال الحد الأدنى للسحب" },
            ]}
          >
            <Input type="number" className="w-full" placeholder="مثال: 100" />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose} disabled={isSetting || isUpdating}>
            إلغاء
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSetting || isUpdating}
          >
            حفظ التغييرات
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
