import React from "react";
import { SubscriptionDetailsComponent } from "./sections/SubscriptionDetails_section";

export const AdminMembershipSubscriberDetailsComponent = () => {
  return (
    <main>
      <div className="mb-12">
        <h1 className="mb-5 text-3xl font-bold text-[#111113]">
          تفاصيل الاشتراك{" "}
        </h1>
      </div>

      <SubscriptionDetailsComponent />
    </main>
  );
};
