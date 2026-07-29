"use client";

import { useState, useMemo, useEffect, ChangeEvent } from "react";
import { Button, Col, Form, Input, Row, Select, Pagination, Modal } from "antd";
import {
  useGetUserProfile,
  useUpdateUserProfile,
} from "@/hooks/auth/useGetProfile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { MyMembershipComponent } from "../my-membership/MyMembershipComponent";
import { useGetUserOrders } from "@/hooks/orders/useGetUserOrders";
import dayjs from "dayjs";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";
import { useGetUserCoupons } from "@/hooks/coupons/useUserCoupons";
import { FiGift, FiCopy } from "react-icons/fi";

const { Option } = Select;

export const UserProfileComponent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "info" | "membership" | "password" | "orders" | "coupons"
  >("info");
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { user } = useGetUserProfile();
  const [ordersPage, setOrdersPage] = useState(1);
  const ordersPageSize = 10;
  const {
    orders,
    pagination: ordersPagination,
    isLoading: ordersLoading,
  } = useGetUserOrders(ordersPage, ordersPageSize);
  const { data: userCoupons, isLoading: couponsLoading } = useGetUserCoupons();
  const { mutate: updateProfile, isPending: isSaving } = useUpdateUserProfile();

  const fullName = useMemo(
    () =>
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      user?.name ||
      "",
    [user]
  );

  const initialValues = useMemo(
    () => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      address: user?.address || "",
      mobile: user?.mobile ? user.mobile.replace(/^(\+?966)/, "") : "",
      gender: user?.profile?.gender || undefined,
    }),
    [user]
  );

  useEffect(() => {
    if (user) {
      form.setFieldsValue(initialValues);
    }
  }, [user, form, initialValues]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          ...values,
          mobile: values.mobile
            ? `966${String(values.mobile).replace(/^(\+?966)?/, "")}`
            : undefined,
        };
        updateProfile(payload);
      })
      .catch(() => { });
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("الملف يجب أن يكون صورة");
      return;
    }

    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      toast.error("حجم الصورة يجب أن يكون أقل من 4 ميجابايت");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setIsUploadingAvatar(true);
      const { data } = await axiosInstance.patch("/users/me/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl =
        (data as { profile?: { avatarUrl?: string } })?.profile?.avatarUrl ??
        (data as { data?: { profileImage?: string; avatarUrl?: string } })?.data
          ?.profileImage ??
        (data as { data?: { profileImage?: string; avatarUrl?: string } })?.data
          ?.avatarUrl ??
        (data as { profileImage?: string })?.profileImage ??
        (data as { avatarUrl?: string })?.avatarUrl;
      if (!imageUrl) {
        toast.error("فشل رفع الصورة، حاول مرة أخرى");
        return;
      }

      updateProfile({ avatar: imageUrl });
      toast.success("تم تحديث الصورة الشخصية بنجاح");
    } catch {
      toast.error("فشل رفع الصورة، حاول مرة أخرى");
    } finally {
      setIsUploadingAvatar(false);
      e.target.value = "";
    }
  };

  const handleChangePassword = async () => {
    try {
      const values = await passwordForm.validateFields();
      if (values.newPassword !== values.confirmPassword) {
        passwordForm.setFields([
          {
            name: "confirmPassword",
            errors: ["كلمتا السر غير متطابقتين"],
          },
        ]);
        return;
      }

      setIsChangingPassword(true);
      await axiosInstance.post("/auth/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      toast.success("تم تغيير كلمة السر بنجاح");
      passwordForm.resetFields();
    } catch (error: any) {
      if (error?.errorFields) {
        return;
      }

      toast.error(
        error?.response?.data?.message ||
        "حدث خطأ أثناء تغيير كلمة السر، حاول مرة أخرى"
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  const renderTabs = () => (
    <div className="flex flex-wrap gap-2 mb-6 bg-[#F5F5F7] rounded-full p-1 w-full max-w-2xl mx-auto">
      <button
        type="button"
        onClick={() => setActiveTab("info")}
        className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "info"
            ? "bg-secondary text-white shadow-sm"
            : "text-gray-500 hover:text-black"
          }`}
      >
        المعلومات الشخصية
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("membership")}
        className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "membership"
            ? "bg-secondary text-white shadow-sm"
            : "text-gray-500 hover:text-black"
          }`}
      >
        عضويتي
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("orders")}
        className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "orders"
            ? "bg-secondary text-white shadow-sm"
            : "text-gray-500 hover:text-black"
          }`}
      >
        طلباتي
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("coupons")}
        className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "coupons"
            ? "bg-secondary text-white shadow-sm"
            : "text-gray-500 hover:text-black"
          }`}
      >
        كوبوناتي
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("password")}
        className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "password"
            ? "bg-secondary text-white shadow-sm"
            : "text-gray-500 hover:text-black"
          }`}
      >
        تغيير كلمة السر
      </button>
    </div>
  );

  const renderInfoForm = () => (
    <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div className="inputS1">
            <Form.Item
              name="firstName"
              label="الاسم الأول"
              rules={[{ required: true, message: "الرجاء إدخال الاسم الأول" }]}
            >
              <Input placeholder="الاسم الأول" />
            </Form.Item>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="inputS1">
            <Form.Item
              name="lastName"
              label="الاسم الآخر"
              rules={[{ required: true, message: "الرجاء إدخال الاسم الآخر" }]}
            >
              <Input placeholder="الاسم الآخر" />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className="inputS1">
            <Form.Item
              name="email"
              label="البريد الإلكتروني"
              rules={[
                { required: true, message: "الرجاء إدخال البريد الإلكتروني" },
                { type: "email", message: "الرجاء إدخال بريد إلكتروني صحيح" },
              ]}
            >
              <Input placeholder="example@example.com" />
            </Form.Item>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="inputS1 ">
            <Form.Item
              name="mobile"
              label="رقم الجوال"
              rules={[
                { required: true, message: "ادخل رقم الجوال من فضلك" },
                {
                  pattern: /^5\d{8}$/,
                  message:
                    "رقم الجوال السعودي يجب أن يبدأ بـ 5 ويتكون من 9 أرقام",
                },
              ]}
            >
              <Input
                placeholder="رقم الجوال"
                dir="rtl"
                type="number"
                addonAfter={
                  <div className="flex items-center justify-center gap-1 px-2">
                    <span className="font-medium" dir="ltr">
                      +966
                    </span>

                    <Image
                      width={40}
                      height={30}
                      src="/flags/sa.svg"
                      alt="Saudi Arabia"
                      className="w-5 h-5"
                    />
                  </div>
                }
              />
            </Form.Item>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="selectS1">
            <Form.Item name="gender" label="الجنس">
              <Select placeholder="اختر الجنس">
                <Option value="male">ذكر</Option>
                <Option value="female">أنثى</Option>
              </Select>
            </Form.Item>
          </div>
        </Col>
      </Row>

      <div className="mt-4 flex justify-end">
        <Button
          type="primary"
          size="large"
          onClick={handleSave}
          loading={isSaving}
        >
          حفظ التغييرات
        </Button>
      </div>
    </div>
  );

  const renderMembership = () => (
    <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
      {user?.membershipName && <MyMembershipComponent />}
      {user?.membershipName === null && (
        <div className="text-center py-10">
          <h3 className="text-lg font-bold mb-2">ليس لديك عضوية حالياً</h3>
          <p className="text-gray-500 mb-4">
            انضم إلى عضويتنا الآن واستمتع بخصومات حصرية ومزايا رائعة!
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/membership")}
          >
            استعرض العضويات
          </Button>
        </div>
      )}
    </div>
  );

  const renderPassword = () => (
    <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-1">تغيير كلمة السر</h3>
        <p className="text-gray-500 text-sm">
          قم بتحديث بياناتك الشخصية ومعلومات الاتصال الخاصة بك.
        </p>
      </div>

      <Form
        form={passwordForm}
        layout="vertical"
        onFinish={handleChangePassword}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                name="currentPassword"
                label="كلمة السر الحالية"
                rules={[
                  { required: true, message: "الرجاء إدخال كلمة السر الحالية" },
                ]}
              >
                <Input.Password placeholder="كلمة السر الحالية" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                name="newPassword"
                label="كلمة السر الجديدة"
                rules={[
                  { required: true, message: "الرجاء إدخال كلمة السر الجديدة" },
                  {
                    min: 8,
                    message: "كلمة السر يجب أن تكون 8 أحرف على الأقل",
                  },
                ]}
              >
                <Input.Password placeholder="كلمة السر الجديدة" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                name="confirmPassword"
                label="تأكيد كلمة السر الجديدة"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "الرجاء تأكيد كلمة السر الجديدة",
                  },
                ]}
              >
                <Input.Password placeholder="تأكيد كلمة السر الجديدة" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="mt-2 flex justify-end">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isChangingPassword}
              >
                حفظ التغييرات
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "مدفوع";
      case "pending":
        return "قيد المعالجة";
      case "cancelled":
        return "ملغي";
      case "shipped":
        return "تم الشحن";
      case "delivered":
        return "تم التوصيل";
      default:
        return status;
    }
  };

  const renderCoupons = () => (
    <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-1">كوبونات الخصم</h3>
        <p className="text-gray-500 text-sm">
          استعرض الكوبونات المتاحة لك واستخدمها عند الدفع.
        </p>
      </div>

      {couponsLoading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        </div>
      ) : !userCoupons || userCoupons.length === 0 ? (
        <div className="text-center py-10 opacity-60">
          <FiGift size={48} className="mx-auto mb-4 text-gray-300" />
          <p>لا توجد كوبونات متاحة حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userCoupons.map((coupon: any) => (
            <div
              key={coupon._id}
              className="relative overflow-hidden border border-dashed border-secondary/30 rounded-2xl p-4 bg-secondary/5 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-lg text-secondary">
                    {coupon.code}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {coupon.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(coupon.code);
                    toast.success("تم نسخ الكود بنجاح");
                  }}
                  className="p-2 hover:bg-secondary/10 rounded-lg transition-colors text-secondary"
                  title="نسخ الكود"
                >
                  <FiCopy size={16} />
                </button>
              </div>

              <div className="space-y-1 mt-3 pt-3 border-t border-secondary/10">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">نوع الخصم:</span>
                  <span className="font-medium">
                    {coupon.type === "percentage"
                      ? `${coupon.amount}% خصم`
                      : coupon.type === "fixed"
                        ? `${coupon.amount} ر.س خصم`
                        : "شحن مجاني"}
                  </span>
                </div>
                {coupon.minOrderAmount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">الحد الأدنى للطلب:</span>
                    <span className="font-medium">
                      {coupon.minOrderAmount} ر.س
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">ينتهي في:</span>
                  <span className="font-medium">
                    {dayjs(coupon.endDate).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>

              {/* Decorative circles for coupon effect */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-dashed border-secondary/30 border-r-0" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-dashed border-secondary/30 border-l-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOrders = () => {
    const currentOrders = orders;
    const totalOrders = ordersPagination?.total || orders.length;
    const selectedOrder = currentOrders.find(
      (order) => order._id === selectedOrderId
    );

    return (
      <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
        <h3 className="text-lg font-bold mb-4">طلباتي</h3>

        {ordersLoading ? (
          <p className="text-gray-500">جاري تحميل الطلبات...</p>
        ) : currentOrders.length === 0 ? (
          <p className="text-gray-500">لا يوجد طلبات حتى الآن.</p>
        ) : (
          <div className="space-y-3">
            {currentOrders.map((order) => {
              const firstItem = order.items[0];
              // const perItemPrice =
              //   order.items.length > 0
              //     ? (order.total / order.items.length).toFixed(2)
              //     : order.total.toFixed(2);

              return (
                <button
                  key={order._id}
                  type="button"
                  onClick={() => setSelectedOrderId(order._id)}
                  className="w-full border border-gray-100 rounded-3xl px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-4 bg-white hover:shadow-sm transition-shadow"
                >
                  {/* Right: product info, image, status */}
                  <div className="flex-1 flex items-center justify-start gap-4">
                    {/* Product image */}
                    {firstItem?.productImage && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                        <Image
                          src={firstItem.productImage}
                          alt={firstItem.productName}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="text-right">
                      <div className="text-sm md:text-base font-semibold text-gray-900">
                        {firstItem?.productName}
                        {firstItem?.size ? ` - ${firstItem.size}` : ""}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        المقاس: {firstItem?.size || "-"}
                      </div>
                      <div className="flex items-center justify-start gap-1 mt-1 text-xs text-gray-500">
                        <span>{getStatusLabel(order.status)}</span>
                        <span className="w-2 h-2 rounded-full bg-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Left: price and per-item like design */}
                  <div className="flex flex-col items-start text-right">
                    <span className="text-sm text-gray-500 mb-1">
                      <CurrencyFormatter
                        amount={order.total.toFixed(2)}
                        currency={order.currency}
                        amountClassName="text-sm font-bold text-gray-700"
                        iconSize={18}
                      />
                    </span>
                    {order.accurateTrackingUrl && (
                      <div className="mt-1 text-xs">
                        <a
                          href={order.accurateTrackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-primary font-bold hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          تتبع الشحنة
                        </a>
                      </div>
                    )}
                    {/* <span className="text-xs text-gray-400">
                      {order.items.length} × ر.س {perItemPrice}
                    </span> */}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {totalOrders > ordersPageSize && (
          <div className="mt-6 flex justify-center">
            <Pagination
              current={ordersPage}
              pageSize={ordersPageSize}
              total={totalOrders}
              onChange={setOrdersPage}
              showSizeChanger={false}
            />
          </div>
        )}

        {/* Single order details modal */}
        <Modal
          open={!!selectedOrder}
          onCancel={() => setSelectedOrderId(null)}
          footer={null}
          centered
          title={
            selectedOrder ? `تفاصيل الطلب ${selectedOrder.orderNumber}` : ""
          }
        >
          {selectedOrder && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>التاريخ</span>
                <span>
                  {dayjs(selectedOrder.createdAt).format("DD/MM/YYYY hh:mm")}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>الحالة</span>
                <span>{getStatusLabel(selectedOrder.status)}</span>
              </div>
              {selectedOrder.accurateTrackingUrl && (
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>تتبع الشحنة</span>
                  <a
                    href={selectedOrder.accurateTrackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary hover:underline"
                  >
                    فتح رابط التتبع
                  </a>
                </div>
              )}
              <div className="border-t pt-3 mt-2">
                <h4 className="text-sm font-semibold mb-2">المنتجات</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm text-gray-700"
                    >
                      <div className="flex-1 text-right">
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-xs text-gray-500">
                          المقاس: {item.size || "-"} | اللون:{" "}
                          {item.color || "-"}
                        </div>
                      </div>
                      <div className="text-left text-xs text-gray-500">
                        <div>
                          {" "}
                          <CurrencyFormatter
                            amount={`${item.quantity} × ${item.unitPrice}`}
                            currency={selectedOrder.currency}
                            amountClassName="text-sm font-bold text-gray-700"
                            iconSize={18}
                          />
                        </div>
                        <div className="font-semibold text-gray-800">
                          <CurrencyFormatter
                            amount={`${item.lineTotal} `}
                            currency={selectedOrder.currency}
                            amountClassName="text-lg font-bold text-gray-700 "
                            iconSize={18}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 mt-2 space-y-1 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span>المجموع الفرعي</span>

                  <div className="font-semibold text-gray-800">
                    <CurrencyFormatter
                      amount={`${selectedOrder.subtotal} `}
                      currency={selectedOrder.currency}
                      amountClassName="text-lg font-bold text-gray-700 "
                      iconSize={18}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>رسوم الشحن</span>

                  <CurrencyFormatter
                    amount={`${selectedOrder.shippingFee} `}
                    currency={selectedOrder.currency}
                    amountClassName="text-lg font-bold text-gray-700 "
                    iconSize={18}
                  />
                </div>
                <div className="flex items-center justify-between font-semibold">
                  <span>الإجمالي</span>

                  <CurrencyFormatter
                    amount={`${selectedOrder.total} `}
                    currency={selectedOrder.currency}
                    amountClassName="text-lg font-bold text-gray-700 "
                    iconSize={18}
                  />
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  };

  return (
    <div className="container py-10">
      {/* Header card */}
      <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-3xl font-semibold text-gray-600 relative">
            {user?.profile?.avatarUrl || user?.profileImage ? (
              <Image
                src={user.profile?.avatarUrl ?? user.profileImage ?? ""}
                alt={fullName || "User avatar"}
                fill
                className="object-cover"
                unoptimized={Boolean(
                  user.profile?.avatarUrl?.startsWith("http") ||
                    user.profileImage?.startsWith("http"),
                )}
              />
            ) : (
              <span>{fullName ? fullName.charAt(0) : "-"}</span>
            )}
          </div>
          <label className="text-xs font-medium text-primary cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={isUploadingAvatar}
            />
            {isUploadingAvatar ? "جاري رفع الصورة..." : "تغيير الصورة"}
          </label>
        </div>
        <div className="flex-1 text-center md:text-right">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              {fullName || "الملف الشخصي"}
            </h2>
            {user?.membershipName && (
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.6962 9.40583C25.4663 9.03856 25.1277 8.75209 24.7274 8.5863C24.3271 8.4205 23.8851 8.38364 23.4629 8.48083L20.4662 9.16916C20.1591 9.23975 19.84 9.23975 19.5329 9.16916L16.5362 8.48083C16.114 8.38364 15.6719 8.4205 15.2716 8.5863C14.8714 8.75209 14.5327 9.03856 14.3029 9.40583L12.6695 12.0125C12.5029 12.2792 12.2779 12.5042 12.0112 12.6725L9.40452 14.3058C9.03788 14.5355 8.75183 14.8736 8.58607 15.2732C8.42032 15.6728 8.38308 16.1141 8.47952 16.5358L9.16785 19.5358C9.23818 19.8424 9.23818 20.1609 9.16785 20.4675L8.47952 23.4658C8.3827 23.8878 8.41976 24.3295 8.58553 24.7294C8.75131 25.1294 9.03756 25.4677 9.40452 25.6975L12.0112 27.3308C12.2779 27.4975 12.5029 27.7225 12.6712 27.9892L14.3045 30.5958C14.7745 31.3475 15.6712 31.7192 16.5362 31.5208L19.5329 30.8325C19.84 30.7619 20.1591 30.7619 20.4662 30.8325L23.4645 31.5208C23.8865 31.6176 24.3282 31.5806 24.7281 31.4148C25.1281 31.249 25.4664 30.9628 25.6962 30.5958L27.3295 27.9892C27.4962 27.7225 27.7212 27.4975 27.9879 27.3308L30.5962 25.6975C30.9632 25.4674 31.2493 25.1287 31.4148 24.7284C31.5803 24.3281 31.6169 23.8862 31.5195 23.4642L30.8329 20.4675C30.7623 20.1604 30.7623 19.8413 30.8329 19.5342L31.5212 16.5358C31.6182 16.114 31.5814 15.6725 31.4159 15.2726C31.2504 14.8726 30.9645 14.5341 30.5979 14.3042L27.9895 12.6708C27.7232 12.5039 27.4982 12.2788 27.3312 12.0125L25.6962 9.40583ZM24.8579 16.2842C24.9609 16.0946 24.9865 15.8725 24.9291 15.6645C24.8717 15.4564 24.7359 15.2788 24.5502 15.1689C24.3645 15.059 24.1435 15.0254 23.9335 15.0752C23.7235 15.125 23.5411 15.2543 23.4245 15.4358L19.0662 22.8125L16.4345 20.2925C16.3564 20.2123 16.263 20.1487 16.1598 20.1054C16.0566 20.0622 15.9458 20.0401 15.8339 20.0406C15.722 20.0411 15.6113 20.0641 15.5085 20.1083C15.4057 20.1525 15.3129 20.2169 15.2355 20.2977C15.1581 20.3786 15.0978 20.4742 15.0582 20.5788C15.0186 20.6835 15.0004 20.795 15.0048 20.9068C15.0093 21.0186 15.0362 21.1284 15.0839 21.2296C15.1317 21.3308 15.1993 21.4213 15.2829 21.4958L18.6729 24.7442C18.7636 24.8309 18.8727 24.8961 18.9922 24.9347C19.1116 24.9734 19.2382 24.9845 19.3626 24.9674C19.4869 24.9502 19.6058 24.9052 19.7103 24.8357C19.8149 24.7661 19.9023 24.6739 19.9662 24.5658L24.8579 16.2842Z"
                  fill="#9D9DA1"
                />
              </svg>
            )}
          </div>
          <p className="text-gray-500 mb-1">{user?.email}</p>
          <p className="text-gray-500">
            نوع العضوية:{" "}
            <span className="font-semibold">
              {user?.membershipName || "غير مشترك"}
            </span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      {renderTabs()}

      {/* Content */}
      {activeTab === "info" && (
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          className="mt-4"
        >
          {renderInfoForm()}
        </Form>
      )}
      {activeTab === "membership" && renderMembership()}
      {activeTab === "password" && renderPassword()}
      {activeTab === "orders" && renderOrders()}
      {activeTab === "coupons" && renderCoupons()}
    </div>
  );
};
