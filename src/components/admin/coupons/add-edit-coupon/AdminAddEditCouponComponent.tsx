"use client";

import { useParams } from "next/navigation";
import { AddEditCouponForm } from "./forms/AddEditCouponForm";

export const AdminAddEditCouponComponent = () => {
    const { id } = useParams();
    return (
        <main>
            <h1 className="mb-8 font-bold text-2xl">
                {id ? "تعديل الكوبون" : "اضافة كوبون جديد"}
            </h1>

            <AddEditCouponForm />
        </main>
    );
};
