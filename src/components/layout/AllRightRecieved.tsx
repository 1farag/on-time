import { Fa0, FaApplePay } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";

export const AllRightRecieved = () => {
  const paymentMethods = [<FaApplePay />, <RiVisaLine />];
  return (
    <div className="bg-[#081021] text-third  py-8 border-t-2 border-[#252B37]">
      <div className="container flex items-center justify-center">
        <p>All rights reserved.Rich Style . ©{new Date().getFullYear()} </p>
      </div>
    </div>
  );
};
