"use client";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { useAddEditProduct } from "../hooks/useAddEditProduct";
import { useEffect, useState } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { UploadImage } from "@/components/tools/uploads/UploadImage";
import { useParams, useRouter } from "next/navigation";
import { CategoryType } from "@/types/types";
import Image from "next/image";
import { useGetAdminProduct } from "../../hooks/useGetAdminProducts";
import toast from "react-hot-toast";

const { Option } = Select;
const { TextArea } = Input;

type SizeItem = {
  size: string;
  stock: number;
  sku: string;
};

export const AdminAddEditProductForm = () => {
  const [form] = Form.useForm();
  const { addEditPostMutation, addEditPostLoading } = useAddEditProduct();
  const { productData } = useGetAdminProduct();
  const { productId } = useParams();

  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [sizeItems, setSizeItems] = useState<SizeItem[]>([
    { size: "", stock: 0, sku: "" },
  ]);

  const handleAddProduct = () => {
    form.validateFields().then((values) => {
      // Validate that all size items have required fields
      const hasInvalidItems = sizeItems.some(
        (item) => !item.size || !item.sku || item.stock < 0
      );

      if (hasInvalidItems) {
        message.error("يرجى إكمال جميع بيانات المقاسات");
        return;
      }

      addEditPostMutation({
        ...values,
        images: uploadedImages,
        items: sizeItems,
        trackStock: true,
        discountRate: Number(values.discountRate) || 0,
        price: Number(values.price),
      })
        .then(() => {
          form.resetFields();
          setUploadedImages([]);
          setSizeItems([{ size: "", stock: 0, sku: "" }]);
          router.push("/admin/products");
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  const handleAddSizeItem = () => {
    setSizeItems([...sizeItems, { size: "", stock: 0, sku: "" }]);
  };

  const handleRemoveSizeItem = (index: number) => {
    if (sizeItems.length > 1) {
      setSizeItems(sizeItems.filter((_, i) => i !== index));
    }
  };

  const handleSizeItemChange = (
    index: number,
    field: keyof SizeItem,
    value: string | number
  ) => {
    const updatedItems = [...sizeItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setSizeItems(updatedItems);
  };

  useEffect(() => {
    if (!productData) return;

    setUploadedImages(productData.images || []);

    // Set size items from product data
    if (productData.items && productData.items.length > 0) {
      setSizeItems(productData.items);
    }

    // Set form values without the items field (we handle it separately)
    const { items, ...restProductData } = productData;
    form.setFieldsValue(restProductData);
  }, [productData, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddProduct}
      autoComplete="off"
    >
      <Row gutter={[32, 32]}>
        {/* Product Details */}
        <Col xs={24} md={16}>
          <div className="bg-white border border-[#DCE3E5] rounded-xl p-6">
            <h4 className="p-6 pt-0 ps-0 mb-6 border-b border-[#DCE3E5] font-bold">
              بيانات المنتج الأساسية
            </h4>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <div className="inputS1">
                  <Form.Item
                    label="اسم المنتج"
                    name="name"
                    rules={[{ required: true, message: "ادخل اسم المنتج" }]}
                  >
                    <Input placeholder="اسم المنتج" />
                  </Form.Item>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div className="inputS1">
                  <Form.Item label="اللون" name="color">
                    <Input placeholder="اللون" />
                  </Form.Item>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div className="inputS1">
                  <Form.Item label="السعر الأساسي" name="price">
                    <Input type="number" placeholder="السعر الأساسي" />
                  </Form.Item>
                </div>
              </Col>

              <Col xs={24} md={24}>
                <div className="inputS1">
                  <Form.Item label="نسبة التخفيض %" name="discountRate">
                    <Input
                      type="number"
                      placeholder="نسبة التخفيض"
                      min={0}
                      max={100}
                    />
                  </Form.Item>
                </div>
              </Col>

              <Col xs={24}>
                <div className="inputS1">
                  <Form.Item label="وصف المنتج" name="description">
                    <TextArea rows={4} placeholder="وصف المنتج" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </div>

          {/* Size Items Section */}
          <div className="bg-white border border-[#DCE3E5] rounded-xl p-6 mt-8">
            <div className="flex justify-between items-center p-6 pt-0 ps-0 mb-6 border-b border-[#DCE3E5]">
              <h4 className="font-bold">المقاسات والمخزون</h4>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddSizeItem}
              >
                إضافة مقاس
              </Button>
            </div>

            {sizeItems.map((item, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-[#DCE3E5] rounded-lg relative"
              >
                {sizeItems.length > 1 && (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    className="absolute top-2 left-2"
                    onClick={() => handleRemoveSizeItem(index)}
                  />
                )}

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <div className="selectS1">
                      <label className="block mb-2 text-sm font-medium">
                        المقاس
                      </label>
                      <Select
                        placeholder="اختر المقاس"
                        value={item.size || undefined}
                        onChange={(value) =>
                          handleSizeItemChange(index, "size", value)
                        }
                        className="w-full"
                      >
                        <Option value="XS">XS</Option>
                        <Option value="S">S</Option>
                        <Option value="M">M</Option>
                        <Option value="L">L</Option>
                        <Option value="XL">XL</Option>
                        <Option value="XXL">XXL</Option>
                        <Option value="XXXL">XXXL</Option>
                      </Select>
                    </div>
                  </Col>

                  <Col xs={24} md={8}>
                    <div className="inputS1">
                      <label className="block mb-2 text-sm font-medium">
                        SKU
                      </label>
                      <Input
                        placeholder="مثال: JERSEY-BLK-M"
                        value={item.sku}
                        onChange={(e) =>
                          handleSizeItemChange(index, "sku", e.target.value)
                        }
                      />
                    </div>
                  </Col>

                  <Col xs={24} md={8}>
                    <div className="inputS1">
                      <label className="block mb-2 text-sm font-medium">
                        الكمية المتوفرة
                      </label>
                      <Input
                        type="number"
                        placeholder="الكمية"
                        min={0}
                        value={item.stock}
                        onChange={(e) =>
                          handleSizeItemChange(
                            index,
                            "stock",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Col>

        {/* Publish Section */}
        <Col xs={24} md={8}>
          <div className="mb-8 bg-white border border-[#DCE3E5] rounded-xl p-6">
            <h4 className="p-6 pt-0 ps-0 mb-6 border-b border-[#DCE3E5] font-bold">
              صور المنتج
            </h4>
            <UploadImage
              onUploaded={(urls) =>
                setUploadedImages((prev) => [...prev, ...urls])
              }
            />
            {uploadedImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {uploadedImages.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative w-16 h-16 rounded overflow-hidden group"
                  >
                    <Image
                      src={url}
                      alt={`Uploaded ${idx + 1}`}
                      fill
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setUploadedImages((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="absolute inset-0 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-[#DCE3E5] rounded-xl p-6">
            <h4 className="p-6 pt-0 ps-0 mb-6 border-b border-[#DCE3E5] font-bold">
              النشر
            </h4>
            <div className="selectS1">
              <Form.Item label="حالة المنتج" name="isActive">
                <Select placeholder="حالة المنتج" defaultValue="active">
                  <Option value="true">نشط</Option>
                  <Option value="false">غير نشط</Option>
                </Select>
              </Form.Item>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              loading={addEditPostLoading}
              className="w-full"
            >
              {productId ? "تعديل المنتج" : " نشر المنتج"}
            </Button>
            <Button
              type="default"
              className="w-full mt-2"
              onClick={() => router.push("/admin/products")}
            >
              إلغاء
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
