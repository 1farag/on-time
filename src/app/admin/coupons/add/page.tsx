import { AdminAddEditCouponComponent } from "@/components/admin/coupons/add-edit-coupon/AdminAddEditCouponComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "اضافة كوبون جديد",
};

const AddCouponPage = () => {
    return <AdminAddEditCouponComponent />;
};

export default AddCouponPage;
