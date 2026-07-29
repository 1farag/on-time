"use client";

import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import {
  FiFileText,
  FiPlus,
  FiSettings,
  FiDownload,
  FiUser,
  FiGift,
  FiCreditCard,
  FiBox,
} from "react-icons/fi";

export default function DashboardActions_section() {
  const router = useRouter();
  const actions = [
    {
      title: "تقرير مبيعات",
      icon: <FiFileText size={22} />,
      color: "bg-[#0DA2E7]",
      text: "text-white",
      onClick: () => {},
    },
    {
      title: "إضافة منتج",
      icon: <FiPlus size={22} />,
      color: "bg-[#385B66]",
      text: "text-white",
      onClick: () => {
        router.push("/admin/products/add");
      },
    },
    {
      title: "الإعدادات",
      icon: <FiSettings size={22} />,
      color: "bg-gray-100",
      text: "text-gray-700",
      onClick: () => {},
    },
    {
      title: "تصدير البيانات",
      icon: <FiDownload size={22} />,
      color: "bg-[#16A34A]",
      text: "text-white",
      onClick: () => {},
    },
  ];

  const activities = [
    {
      title: "مستخدم جديد",
      desc: "أحمد محمد انضم للمنصة",
      time: "منذ 5 دقائق",
      icon: <FiUser />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "طلب جديد",
      desc: "طلب #1234 - 350 ر.س",
      time: "منذ 15 دقيقة",
      icon: <FiBox />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "استبدال مكافأة",
      desc: "نقطة 500 سارة أحمد",
      time: "منذ 30 دقيقة",
      icon: <FiGift />,
      bg: "bg-gray-100",
      color: "text-gray-700",
    },
    {
      title: "عمولة مدفوعة",
      desc: "ر.س 150 تم دفعها",
      time: "منذ ساعة",
      icon: <FiCreditCard />,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "ترقية عضوية",
      desc: "خالد سعيد إلى VIP",
      time: "منذ ساعتين",
      icon: <FiUser />,
      bg: "bg-gray-100",
      color: "text-gray-700",
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        {/* Recent Activity */}
        <div className="bg-white border border-[#DCE3E5] rounded-xl  p-6">
          <h3 className="text-lg font-bold text-right mb-6">النشاط الأخير</h3>

          <div className="space-y-5">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.bg} ${a.color}`}
                >
                  {a.icon}
                </div>

                <div className="flex-1 text-right">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-gray-500">{a.desc}</p>
                </div>

                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div className="bg-white border border-[#DCE3E5] rounded-xl p-6">
          <h3 className="text-lg font-bold text-right mb-6">إجراءات سريعة</h3>

          <div className="grid grid-cols-2 gap-4">
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={a.onClick}
                className={`flex items-center justify-between px-5 py-4 rounded-xl font-medium transition hover:scale-[1.02] ${a.color} ${a.text}`}
              >
                <span>{a.title}</span>
                {a.icon}
              </button>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}
