"use client";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { UploadImage } from "@/components/tools/uploads/UploadImage";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAddEditUser } from "../hooks/useAddEditUser";
import { useGetAdminUser } from "../../hooks/useGetUsers";
import z, { ZodError } from "zod";

const { Option } = Select;
const { TextArea } = Input;

type SizeItem = {
  size: string;
  stock: number;
  sku: string;
};

export const AdminAddEditUserForm = () => {
  const [form] = Form.useForm();
  const { addEditUserMutation, addEditUserLoading } = useAddEditUser();
  const { userData } = useGetAdminUser();

  const router = useRouter();
  const { userId } = useParams();

  const passwordSchema = z
    .string()
    .min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل");

  const zodPasswordValidator = async (_: any, value: string) => {
    try {
      passwordSchema.parse(value);
      return Promise.resolve();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return Promise.reject(new Error(error.issues[0]?.message));
      }

      return Promise.reject(new Error("كلمة السر غير صالحة"));
    }
  };

  const handleAddEditUser = () => {
    form.validateFields().then((values) => {
      const payload = {
        ...values,
        mobile: values.mobile?.replace("+", ""),
      };
      addEditUserMutation(payload)
        .then(() => {
          form.resetFields();
          router.back();
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  useEffect(() => {
    if (!userData) return;
    form.setFieldsValue(userData?.user);
  }, [userData, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddEditUser}
      autoComplete="off"
      name="addEditUserForm"
    >
      {/* User Details */}
      <div className="bg-white border border-[#DCE3E5] rounded-xl p-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="الاسم الاول"
                name="firstName"
                rules={[{ required: true, message: "ادخل الاسم الاول" }]}
              >
                <Input placeholder="اسم الاول" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="الاسم الاخير"
                name="lastName"
                rules={[{ required: true, message: "ادخل الاسم الاخير" }]}
              >
                <Input placeholder="اسم الاخير" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label="رقم الجوال"
                name="mobile"
                rules={[{ required: true, message: "ادخل رقم الجوال" }]}
              >
                <Input placeholder="رقم الجوال" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="selectS1">
              <Form.Item
                label="الدور"
                name="role"
                rules={[{ required: true, message: "اختر الدور" }]}
              >
                <Select placeholder="اختر الدور">
                  <Option value="ADMIN">ادمن</Option>
                  <Option value="EDITOR">محرر</Option>
                  <Option value="SALES">سيلز</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
          {!userId && (
            <>
              <Col xs={24} md={24}>
                <div className="inputS1">
                  <Form.Item
                    label="الايميل"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "ادخل البريد الالكتروني  من فضلك!",
                      },
                      {
                        type: "email",
                        message: "من فضلك أدخل بريد إلكتروني صحيح",
                      },
                    ]}
                  >
                    <Input placeholder="البريد الالكتروني " />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="inputS1">
                  <Form.Item
                    label="كلمه السر"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "ادخل كلمة السر من فضلك!",
                      },
                      { validator: zodPasswordValidator },
                    ]}
                  >
                    <Input.Password placeholder="كلمة السر" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="inputS1">
                  <Form.Item
                    label="تاكيد كلمه السر"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "ادخل كلمة السر من فضلك!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("كلمتا السر غير متطابقتين")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="تاكيد كلمة السر" />
                  </Form.Item>
                </div>
              </Col>
            </>
          )}
        </Row>
        <div className="flex items-center gap-4 justify-end mt-6">
          <Button type="primary" htmlType="submit" loading={addEditUserLoading}>
            حفظ
          </Button>
          <Button type="default" onClick={() => router.push("/admin/products")}>
            إلغاء
          </Button>
        </div>
      </div>
    </Form>
  );
};
