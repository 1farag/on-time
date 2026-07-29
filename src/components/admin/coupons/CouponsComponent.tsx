"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import CouponsTable from "./tables/CouponsTable";
import CouponStatsModal from "./modals/CouponStatsModal";
import { useGetAllCoupons } from "./hooks/useCoupons";
import { useSearchParams } from "next/navigation";

const CouponsComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";

    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

    const { data, isLoading } = useGetAllCoupons({
        page,
        search,
    });

    const handleViewStats = (coupon: any) => {
        setSelectedCoupon(coupon);
        setIsStatsModalOpen(true);
    };

    return (
        <main>
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="mb-5 text-3xl font-bold text-[#111113]">إدارة الكوبونات</h1>
                    <p className="text-lg text-primary">إنشاء وتعديل كوبونات الخصم والعروض الترويجية</p>
                </div>
                <Button
                    type="primary"
                    onClick={() => router.push("/admin/coupons/add")}
                    className="h-10 px-6 font-bold"
                >
                    <FiPlus />
                    إضافة كوبون جديد
                </Button>
            </div>

            <CouponsTable
                coupons={data?.coupons || []}
                isLoading={isLoading}
                onViewStats={handleViewStats}
                totalItems={data?.pagination?.total}
            />

            <CouponStatsModal
                isOpen={isStatsModalOpen}
                onClose={() => setIsStatsModalOpen(false)}
                couponId={selectedCoupon?._id}
                couponCode={selectedCoupon?.code}
            />
        </main>
    );
};

export default CouponsComponent;
