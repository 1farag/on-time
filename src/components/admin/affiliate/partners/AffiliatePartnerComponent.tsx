"use client";
import { Button, Col, Row } from "antd";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import BlockOrUnblockModal from "@/components/tools/modal/BlockOrUnblockModal";
import { useGetAdminAffiliatePartner } from "./hooks/useGetAdminAffiliatePartners";

interface UserProfileProps {
  user?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    createdAt: string;
    lastLogin: string;
    stats?: {
      totalOrders: number;
      loyaltyPoints: number;
      totalSpent: number;
    };
    recentActivity?: {
      action: string;
      timestamp: string;
      ip: string;
      device: string;
    }[];
  };
}

interface UserActivity {
  action: string;
  timestamp: string;
  ip: string;
  device: string;
}

export const AffiliatePartnerComponent = ({ user }: UserProfileProps) => {
  const router = useRouter();

  const { data, isLoading, error } = useGetAdminAffiliatePartner();

  const info = data?.data;

  //   const { blockOrUnBlockUserMutation, blockOrUnBlockUserLoading } =
  //     useBlockOrUnBlockUser();

  // Mock data - replace with actual user data

  const getInitial = (name: string) => {
    return name?.charAt(0).toUpperCase() || "-";
  };

  console.log(info);
  return (
    <main className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#111113]">
          الملف الشخصي للمستخدم
        </h1>
      </div>

      <Row gutter={[32, 32]}>
        {/* Right Side - User Info Card */}
        <Col xs={24} lg={10}>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-3xl font-semibold mb-4">
                {getInitial(info?.name)}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {info?.name}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{info?.email}</p>
            </div>

            {/* User Details */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">رقم الهاتف</span>
                <span className="text-gray-900 font-medium">{info?.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">اسم البنك</span>
                <span className="text-gray-900 font-medium">
                  {info?.bankName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">الحساب البنكي</span>
                <span className="text-gray-900 font-medium">
                  {info?.bankAccount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">الرقم الضريبي</span>
                <span className="text-gray-900 font-medium">
                  {info?.taxNumber}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">تاريخ الانضمام</span>
                <span className="text-gray-900 font-medium">
                  {new Date(info?.createdAt).toLocaleDateString("ar-EG")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">الحاله</span>
                <span className="text-gray-900 font-medium">
                  {info?.status === "active" ? "نشط" : "غير نشط"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">كود التتبع</span>
                <span className="text-gray-900 font-medium">
                  {info?.trackingCode}
                </span>
              </div>
            </div>

            {/* <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                type="primary"
                size="large"
                className="w-full"
                onClick={() =>
                  router.push(
                    `${locale}/admin/users/${info?.user?._id}/edit`
                  )
                }
              >
                تعديل
              </Button>
             
            </div> */}
          </div>
        </Col>

        {/* Left Side - Stats and Activity */}
        <Col xs={24} lg={14}>
          {/* Quick Stats */}
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              إحصائيات سريعة
            </h3>
            <Row gutter={[16, 16]} className="mb-6">
              <Col xs={24} lg={8}>
                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-blue-600 mb-2">إحاله</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {info?.stats?.totalOrders || 0}
                  </p>
                </div>
              </Col>
              <Col xs={24} lg={8}>
                <div className="bg-green-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-green-600 mb-2">الارباح</p>
                  <p className="text-3xl font-bold text-green-700">
                    {info?.totalSales}
                  </p>
                </div>
              </Col>
              <Col xs={24} lg={8}>
                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-purple-600 mb-2">نسبة العمولات</p>
                  <p className="text-3xl font-bold text-purple-700">
                    {info?.totalCommission} ر.س
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          {/* Recent Activity */}
          {/* <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              سجل النشاط الحديث
            </h3>
            <div className="space-y-3">
              {data?.recentActivity?.map(
                (activity: UserActivity, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.timestamp} • IP: {activity.ip}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div> */}
        </Col>
      </Row>
    </main>
  );
};
