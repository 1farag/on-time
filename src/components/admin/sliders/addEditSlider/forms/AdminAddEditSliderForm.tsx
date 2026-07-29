"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Row, Col, Typography } from "antd";
import { useParams, useRouter } from "next/navigation";
import { UploadImage } from "@/components/tools/uploads/UploadImage";
import Image from "next/image";
import {
  useCreateAdminSlider,
  useGetAdminSlider,
  useUpdateAdminSlider,
} from "../../hooks/useAdminSliders";
import { handleFormErrors } from "@/utils/handleFormError";

const { Option } = Select;
const { Title } = Typography;

export const AdminAddEditSliderForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { sliderId } = useParams();
  const isEditMode = !!sliderId;

  const { data: sliderDataResp, isLoading: isLoadingSlider } =
    useGetAdminSlider(sliderId as string);
  const { mutateAsync: createSlider, isPending: isCreating } =
    useCreateAdminSlider();
  const { mutateAsync: updateSlider, isPending: isUpdating } =
    useUpdateAdminSlider();

  // Images state
  const [images, setImages] = useState({
    mobile: { en: "", ar: "" },
    desktop: { en: "", ar: "" },
  });

  useEffect(() => {
    if (isEditMode && sliderDataResp?.data) {
      const slider = sliderDataResp.data;
      form.setFieldsValue({
        title: slider.title,
        actionType: slider.action?.type,
        referenceId: slider.action?.referenceId,
        ctaText: slider.ctaText,
        ctaTextAr: slider.ctaTextAr,
      });

      if (slider.images) {
        setImages({
          mobile: {
            en: slider.images.mobile?.en || "",
            ar: slider.images.mobile?.ar || "",
          },
          desktop: {
            en: slider.images.desktop?.en || "",
            ar: slider.images.desktop?.ar || "",
          },
        });
      }
    }
  }, [isEditMode, sliderDataResp, form]);

  const handleFinish = async (values: any) => {
    // Validate images selection
    if (
      !images.mobile.en ||
      !images.mobile.ar ||
      !images.desktop.en ||
      !images.desktop.ar
    ) {
      return; // Or show a toast error prompting the user to upload all 4 images
    }

    const payload = {
      title: values.title,
      images: {
        mobile: {
          en: images.mobile.en,
          ar: images.mobile.ar,
        },
        desktop: {
          en: images.desktop.en,
          ar: images.desktop.ar,
        },
      },
      action: {
        type: values.actionType,
        referenceId: values.referenceId,
      },
      ctaText: values.ctaText,
      ctaTextAr: values.ctaTextAr,
    };

    try {
      if (isEditMode) {
        await updateSlider({ id: sliderId as string, data: payload });
      } else {
        await createSlider(payload);
      }
      router.push("/admin/sliders");
    } catch (errors: any) {
      handleFormErrors(form, errors);
    }
  };

  const handleImageUploaded = (
    platform: "mobile" | "desktop",
    lang: "en" | "ar",
    urls: string[]
  ) => {
    if (urls && urls.length > 0) {
      setImages((prev) => ({
        ...prev,
        [platform]: {
          ...prev[platform],
          [lang]: urls[0], // taking the first uploaded image
        },
      }));
    }
  };

  const handleRemoveImage = (
    platform: "mobile" | "desktop",
    lang: "en" | "ar"
  ) => {
    setImages((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [lang]: "",
      },
    }));
  };

  const ImageUploaderBox = ({
    platform,
    lang,
    label,
  }: {
    platform: "mobile" | "desktop";
    lang: "en" | "ar";
    label: string;
  }) => {
    const imageUrl = images[platform][lang];
    return (
      <div className="bg-white border border-[#DCE3E5] rounded-xl p-4 mb-4">
        <h4 className="mb-4 font-bold">{label}</h4>
        {!imageUrl ? (
          <UploadImage
            onUploaded={(urls) => handleImageUploaded(platform, lang, urls)}
          />
        ) : (
          <div className="relative w-full h-32 rounded overflow-hidden group">
            <Image src={imageUrl} alt={label} fill className="object-cover" />
            <button
              type="button"
              onClick={() => handleRemoveImage(platform, lang)}
              className="absolute inset-0 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
            >
              حذف الصورة
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
      disabled={isLoadingSlider}
    >
      <Row gutter={[32, 32]}>
        <Col xs={24} md={24}>
          <div className="bg-white border border-[#DCE3E5] rounded-xl p-6">
            <h4 className="p-6 pt-0 ps-0 mb-6 border-b border-[#DCE3E5] font-bold">
              بيانات البانر
            </h4>
            <Row gutter={[16, 16]}>
              {/* <Col xs={24}>
                <div className="inputS1">
                  <Form.Item
                    label="العنوان"
                    name="title"
                    rules={[
                      { required: true, message: "يرجى إدخال عنوان البانر" },
                    ]}
                  >
                    <Input placeholder="مثال: Ramadan Sale Banner" />
                  </Form.Item>
                </div>
              </Col> */}

              {/* <Col xs={24} md={12}>
                <div className="inputS1">
                  <Form.Item
                    label="نص الزر (انجليزي)"
                    name="ctaText"
                    rules={[
                      {
                        required: true,
                        message: "يرجى إدخال نص الزر بالانجليزية",
                      },
                    ]}
                  >
                    <Input placeholder="Shop Now" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="inputS1">
                  <Form.Item
                    label="نص الزر (عربي)"
                    name="ctaTextAr"
                    rules={[
                      {
                        required: true,
                        message: "يرجى إدخال نص الزر بالعربية",
                      },
                    ]}
                  >
                    <Input placeholder="تسوق الان" />
                  </Form.Item>
                </div>
              </Col> */}

              <Col xs={24} md={12}>
                <div className="selectS1">
                  <Form.Item
                    label="نوع الإجراء (Action Type)"
                    name="actionType"
                    rules={[
                      { required: true, message: "يرجى اختيار نوع الإجراء" },
                    ]}
                  >
                    <Select placeholder="اختر النوع">
                      <Option value="PRODUCT">PRODUCT</Option>
                      <Option value="MEMBERSHIP">MEMBERSHIP</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div className="inputS1">
                  <Form.Item
                    label="المعرف المرجعي (Reference ID)"
                    name="referenceId"
                  >
                    <Input placeholder="مثال: 1234422 أو رابط URL" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col xs={24} md={24}>
          <Title level={5} className="mb-4">
            صور البانر
          </Title>
          <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} md={12}>
              <ImageUploaderBox
                platform="desktop"
                lang="ar"
                label="صورة الديسكتوب (عربي)"
              />
            </Col>
            <Col xs={24} md={12}>
              <ImageUploaderBox
                platform="desktop"
                lang="en"
                label="صورة الديسكتوب (انجليزي)"
              />
            </Col>
            <Col xs={24} md={12}>
              <ImageUploaderBox
                platform="mobile"
                lang="ar"
                label="صورة الموبايل (عربي)"
              />
            </Col>
            <Col xs={24} md={12}>
              <ImageUploaderBox
                platform="mobile"
                lang="en"
                label="صورة الموبايل (انجليزي)"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="flex items-center justify-end  mt-4 gap-3">
        <Button
          type="primary"
          htmlType="submit"
          loading={isCreating || isUpdating}
          className="w-fit"
        >
          {isEditMode ? "تعديل البانر" : "إضافة البانر"}
        </Button>
        <Button
          type="default"
          className="w-fit"
          onClick={() => router.push("/admin/sliders")}
        >
          إلغاء
        </Button>
      </div>
    </Form>
  );
};
