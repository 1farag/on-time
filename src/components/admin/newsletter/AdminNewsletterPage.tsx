"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNewsletterSubscriberAPI,
  exportNewsletterSubscribersAPI,
  getNewsletterSubscribersAPI,
  sendNewsletterAPI,
  NewsletterSubscriber,
} from "@/apiCalls/newsletter/newsletterApi";
import { Button, Form, Input, Modal, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import toast from "react-hot-toast";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export default function AdminNewsletterPage() {
  const queryClient = useQueryClient();
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      const res = await getNewsletterSubscribersAPI();
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (ـid: number | string) => deleteNewsletterSubscriberAPI(ـid),
    onSuccess: () => {
      toast.success("تم حذف المشترك من النشرة البريدية");
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          "حدث خطأ أثناء حذف المشترك من النشرة البريدية"
      );
    },
  });

  const exportMutation = useMutation({
    mutationFn: () => exportNewsletterSubscribersAPI(),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "newsletter-subscribers.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("تم تصدير المشتركين بنجاح");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "حدث خطأ أثناء تصدير قائمة المشتركين"
      );
    },
  });

  const sendMutation = useMutation({
    mutationFn: (values: { subject: string; content: string }) =>
      sendNewsletterAPI(values),
    onSuccess: () => {
      toast.success("تم إرسال النشرة البريدية بنجاح");
      form.resetFields();
      setIsSendModalOpen(false);
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "حدث خطأ أثناء إرسال النشرة البريدية"
      );
    },
  });

  const columns = [
    {
      title: "البريد الإلكتروني",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "تاريخ الاشتراك",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => (
        <span>
          {dayjs(value).locale("ar").format("DD-MM-YYYY")} |
          {dayjs(value).locale("ar").format(" hh:mm A")}
        </span>
      ),
    },
    {
      title: "الإجراءات",
      key: "actions",
      render: (_: any, record: { _id: string }) => (
        <Space>
          <Button
            danger
            size="small"
            loading={
              deleteMutation.isPending &&
              deleteMutation.variables === record._id
            }
            onClick={() => deleteMutation.mutate(record._id)}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  const handleOpenSendModal = () => {
    setIsSendModalOpen(true);
  };

  const handleSendNewsletter = () => {
    form
      .validateFields()
      .then((values) => {
        sendMutation.mutate(values);
      })
      .catch(() => {});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title level={4} className="!mb-1">
            إدارة النشرة البريدية
          </Title>
          <Text type="secondary">عرض المشتركين وإرسال النشرة البريدية.</Text>
        </div>
        <Space>
          <Button onClick={handleOpenSendModal} type="primary">
            إرسال نشرة بريدية
          </Button>
          {/* <Button
            onClick={() => exportMutation.mutate()}
            loading={exportMutation.isPending}
          >
            تصدير المشتركين
          </Button> */}
        </Space>
      </div>
      <TableServerPagination
        columns={columns}
        data={data?.subscribers || []}
        totalItems={data?.pagination?.total || 0}
        isLoading={isLoading}
        // pagination={{ pageSize: 20 }}
      />
      <Modal
        title="إرسال نشرة بريدية"
        open={isSendModalOpen}
        onCancel={() => setIsSendModalOpen(false)}
        onOk={handleSendNewsletter}
        confirmLoading={sendMutation.isPending}
        okText="إرسال"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical">
          <div className="inputS1">
            <Form.Item
              name="subject"
              label="عنوان الرسالة"
              rules={[
                { required: true, message: "الرجاء إدخال عنوان الرسالة" },
              ]}
            >
              <Input placeholder="اكتب عنوان الرسالة" />
            </Form.Item>
          </div>
          <Form.Item
            name="htmlContent"
            label="محتوى الرسالة"
            rules={[{ required: true, message: "الرجاء إدخال محتوى الرسالة" }]}
          >
            <Input.TextArea rows={4} placeholder="اكتب محتوى الرسالة" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
