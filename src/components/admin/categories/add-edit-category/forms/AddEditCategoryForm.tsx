"use client";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import { useRouter } from "next/navigation";
import { useGetAdminCategory } from "../../../categories/hooks/useGetAllCategories";
import { useAddEditCategory } from "../hooks/useGetAdminCategory";
import toast from "react-hot-toast";

const { Option } = Select;

export const AddEditCategoryForm = () => {
  const [form] = Form.useForm();
  const { addEditCategoryMutation, addEditCategoryLoading } =
    useAddEditCategory();
  const { categoryData } = useGetAdminCategory();

  const router = useRouter();

  const handleAddProduct = () => {
    form.validateFields().then((values) => {
      addEditCategoryMutation({
        ...values,
      })
        .then(() => {
          form.resetFields();
          toast.success("تم نشر الصنف بنجاح");
          router.push("/admin/categories");
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  useEffect(() => {
    if (!categoryData) return;

    form.setFieldsValue(categoryData);
  }, [categoryData]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddProduct}
      autoComplete="off"
      name="addEditCategoryForm"
    >
      <div className="bg-white border border-[#DCE3E5] rounded-xl p-6">
        <h4 className="p-6 pt-0 ps-0 mb-6 border-b border-[#DCE3E5] font-bold">
          بيانات الصنف الأساسية{" "}
        </h4>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="اسم الصنف"
                name="name"
                rules={[{ required: true, message: "ادخل اسم الصنف" }]}
              >
                <Input placeholder="اسم الصنف" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="slug"
                name="slug"
                rules={[{ required: true, message: "ادخل الصنف" }]}
              >
                <Input placeholder="slug" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="selectS1">
              <Form.Item label="الحاله" name="status">
                <Select placeholder="الحاله">
                  <Option value="active">نشط</Option>
                  <Option value="notActive">غير نشط</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="description"
                name="description"
                rules={[{ required: true, message: "ادخل الصنف" }]}
              >
                <Input placeholder="الوصف" />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <div className="flex items-center justify-end gap-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={addEditCategoryLoading}
            className="w-fit"
          >
            حفظ{" "}
          </Button>
          <Button
            type="default"
            className="w-fit"
            onClick={() => router.push("/admin/products")}
          >
            إلغاء
          </Button>
        </div>
      </div>
    </Form>
  );
};
