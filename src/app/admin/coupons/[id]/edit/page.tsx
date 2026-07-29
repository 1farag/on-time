import { AdminAddEditCouponComponent } from "@/components/admin/coupons/add-edit-coupon/AdminAddEditCouponComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "تعديل الكوبون",
};

const EditCouponPage = () => {
    return <AdminAddEditCouponComponent />;
};

export default EditCouponPage;
