"use client";

import React from "react";
import { IoIosClose } from "react-icons/io";
import { useGetCouponStats } from "../hooks/useCoupons";

interface CouponStatsModalProps {
    isOpen: boolean;
    onClose: () => void;
    couponId: string | null;
    couponCode: string | null;
}

const CouponStatsModal: React.FC<CouponStatsModalProps> = ({
    isOpen,
    onClose,
    couponId,
    couponCode,
}) => {
    const { data: stats, isLoading } = useGetCouponStats(couponId);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-xl">
                <div className="flex items-center justify-between border-b p-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        إحصائيات الكوبون: <span className="text-[#385B66]">{couponCode}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <IoIosClose size={32} />
                    </button>
                </div>

                <div className="p-8">
                    {isLoading ? (
                        <div className="flex justify-center p-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#385B66]"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-gray-50 p-6 rounded-xl border flex flex-col items-center text-center">
                                <span className="text-gray-500 text-sm mb-2">إجمالي مرات الاستخدام</span>
                                <span className="text-4xl font-bold text-[#385B66]">{stats?.usageCount || 0}</span>
                                <span className="text-gray-400 text-xs mt-2">من أصل {stats?.usageLimit || 0} استخدام مسموح</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="border p-4 rounded-xl">
                                    <span className="text-gray-500 text-xs block mb-1">عدد المستخدمين الفريدين</span>
                                    <span className="text-xl font-bold">{stats?.uniqueUsersCount || 0}</span>
                                </div>
                                <div className="border p-4 rounded-xl">
                                    <span className="text-gray-500 text-xs block mb-1">إجمالي الخصم المقدم</span>
                                    <span className="text-xl font-bold text-green-600">{stats?.totalDiscountedAmount || 0} ر.س</span>
                                </div>
                            </div>

                            {stats?.recentOrders && stats.recentOrders.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="font-bold mb-3 text-sm">آخر العمليات المستخدمة:</h3>
                                    <div className="space-y-2">
                                        {stats.recentOrders.map((order: any, idx: number) => (
                                            <div key={idx} className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-lg">
                                                <span>طلب رقم: {order.orderNumber}</span>
                                                <span className="text-gray-500 tracking-tighter">{new Date(order.date).toLocaleDateString("ar-SA")}</span>
                                                <span className="font-bold">-{order.discountAmount} ر.س</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t bg-gray-50 rounded-b-xl flex justify-center">
                    <button
                        onClick={onClose}
                        className="w-full max-w-[200px] bg-gray-200 text-gray-800 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CouponStatsModal;
