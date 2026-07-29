"use client";
import { useParams } from "next/navigation";
import { AdminAddEditSliderForm } from "./forms/AdminAddEditSliderForm";

export const AdminAddEditSliderComponent = () => {
    const { sliderId } = useParams();

    return (
        <main>
            <h1 className="mb-8 font-bold text-2xl">
                {sliderId ? "تعديل البانر" : "إضافة بانر جديد"}
            </h1>

            <AdminAddEditSliderForm />
        </main>
    );
};
