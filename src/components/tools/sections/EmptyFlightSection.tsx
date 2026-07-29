"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { LuPlane } from "react-icons/lu";

export const EmptyFlightSection = () => {
  const router = useRouter();
  return (
    <div className="bg-[#111620] rounded-2xl px-8 py-14 my-24 flex flex-col items-center justify-center text-center gap-4 w-full md:w-[80%] mx-auto">
      <LuPlane size={64} className="text-primary" />

      <h3 className="text-white font-bold text-2xl">
        Can't find what you're looking for?
      </h3>

      <p className="text-third text-base">
        Request a custom charter flight tailored to your needs
      </p>

      <Button
        type="primary"
        onClick={() => router.push("/private-jet")}
        className="!mt-2 !px-10 !py-4"
      >
        Request Private Charter
      </Button>
    </div>
  );
};
