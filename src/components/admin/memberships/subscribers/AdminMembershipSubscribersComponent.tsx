import { MembershipSubscribers_table } from "./tables/MembershipSubscribers_table";

export const AdminMembershipSubscribersComponent = () => {
  return (
    <main>
      <div className="mb-12">
        <h1 className="mb-5 text-3xl font-bold text-[#111113]">
          إدارة المشتركين{" "}
        </h1>
        <p className="text-lg text-primary">ادارة المشتركين </p>
      </div>

      <MembershipSubscribers_table />
      {/* <MembershipPlansCards /> */}
    </main>
  );
};
