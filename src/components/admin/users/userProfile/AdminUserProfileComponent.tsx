"use client";
import { Button, Col, Row } from "antd";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useGetAdminUser } from "../hooks/useGetUsers";
import { useBlockOrUnBlockUser } from "../hooks/useDeleteUser";
import BlockOrUnblockModal from "@/components/tools/modal/BlockOrUnblockModal";

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

export const AdminUserProfileComponent = ({ user }: UserProfileProps) => {
  const router = useRouter();

  const { userData, isLoading, error } = useGetAdminUser();

  const { blockOrUnBlockUserMutation, blockOrUnBlockUserLoading } =
    useBlockOrUnBlockUser();

  // Mock data - replace with actual user data

  const getInitial = (name: string) => {
    return name?.charAt(0).toUpperCase() || "U";
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      ADMIN: "bg-cyan-100 text-cyan-600",
      USER: "bg-gray-100 text-gray-600",
      MODERATOR: "bg-blue-100 text-blue-600",
      MANAGER: "bg-green-100 text-green-600",
    };
    return colors[role] || "bg-gray-100 text-gray-600";
  };

  return (
    <main className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#111113]">
          الملف الشخصي للمستخدم
        </h1>

        <Button
          type="primary"
          size="large"
          className="flex items-center gap-2"
          onClick={() => router.push(`/admin/users/${userData?._id}/edit`)}
        >
          <FiEdit />
          تعديل الحساب
        </Button>
      </div>

      <Row gutter={[32, 32]}>
        {/* Right Side - User Info Card */}
        <Col xs={24} lg={10}>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-3xl font-semibold mb-4">
                {getInitial(userData?.user?.firstName)}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {userData?.user?.firstName} {userData?.lastName}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {userData?.user?.email}
              </p>
              <span
                className={`px-3 py-1 text-xs rounded-full ${getRoleBadgeColor(userData?.user?.role)}`}
              >
                {userData?.user?.role}
              </span>
            </div>

            {/* User Details */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">رقم الهاتف</span>
                <span className="text-gray-900 font-medium">
                  {userData?.user?.phone}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">تاريخ الانضمام</span>
                <span className="text-gray-900 font-medium">
                  {new Date(userData?.user?.createdAt).toLocaleDateString(
                    "ar-EG"
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">آخر دخول</span>
                <span className="text-gray-900 font-medium">
                  {userData?.user?.lastLogin}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Role ID</span>
                <span className="text-gray-900 font-medium">
                  #{userData?.user?.role}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                type="primary"
                size="large"
                className="w-full"
                onClick={() =>
                  router.push(`/admin/users/${userData?.user?._id}/edit`)
                }
              >
                تعديل
              </Button>
              <BlockOrUnblockModal
                description="هل أنت متأكد ؟ لن يتمكن من تسجيل الدخول أو إجراء أي عمليات حتى يتم رفع الحظر عنه."
                blockLoading={blockOrUnBlockUserLoading}
                handleBlock={async () => {
                  await blockOrUnBlockUserMutation({
                    block: !userData?.user.isBlocked,
                  });
                }}
                heading={""}
              >
                <Button size="large" danger className="w-full">
                  {userData?.user.isBlocked ? "رفع الحظر" : "حظر الحساب"}
                </Button>
              </BlockOrUnblockModal>
            </div>
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
                  <p className="text-sm text-blue-600 mb-2">إجمالي الطلبات</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {userData?.stats?.totalOrders}
                  </p>
                </div>
              </Col>
              <Col xs={24} lg={8}>
                <div className="bg-green-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-green-600 mb-2">نقاط الولاء</p>
                  <p className="text-3xl font-bold text-green-700">
                    {userData?.stats?.loyaltyPoints}
                  </p>
                </div>
              </Col>
              <Col xs={24} lg={8}>
                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-purple-600 mb-2">قيمة المشتريات</p>
                  <p className="text-3xl font-bold text-purple-700">
                    {userData?.stats?.totalPurchaseValue} ر.س
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              سجل النشاط الحديث
            </h3>
            <div className="space-y-3">
              {userData?.recentActivity?.map(
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
          </div>
        </Col>
      </Row>
    </main>
  );
};
