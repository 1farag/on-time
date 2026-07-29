"use client";

import Link from "next/link";
import { Button } from "antd";
import {
  IoIosInformationCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { LuBadgeCheck } from "react-icons/lu";
import { GoArrowRight } from "react-icons/go";

export function MembershipPaymentFailedComponent() {
  return (
    <main className="mb-24 min-h-[60vh] bg-[#0B0E14]">
      <div className="border-b border-[#1c232e] bg-[#111620] py-14">
        <div className="container text-center">
          <p className="text-third text-sm uppercase tracking-wide">
            Membership checkout
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Payment incomplete
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-third">
            We couldn&apos;t complete your payment. You can pick a plan again
            whenever you&apos;re ready.
          </p>
        </div>
      </div>

      <div className="container mx-auto pt-12 md:w-[80%] lg:w-[60%]">
        <div className="mb-14 flex flex-col items-center text-center">
          <div
            className="mb-8 flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-red-500/80 bg-red-500/10 text-red-400"
            aria-hidden
          >
            <IoMdCloseCircleOutline size={44} />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Couldn&apos;t confirm your membership
          </h2>
          <p className="text-third max-w-xl text-lg">
            Your membership payment wasn&apos;t confirmed. If anything was
            charged, your bank will usually reverse or settle it within a few
            days. Try again or use a different payment method.
          </p>
        </div>

        <div className="cardS1 mb-6 border-[#1c232e]">
          <div className="mb-6 flex items-center gap-4 border-b border-[#252B37] pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-2xl text-secondary">
              <LuBadgeCheck />
            </div>
            <div className="text-start">
              <p className="mb-2 flex flex-wrap items-center gap-2 text-lg text-white">
                <span>On Time </span>
                <GoArrowRight className="text-xl text-primary" />
                <span>Membership</span>
              </p>
              <p className="text-third text-sm">
                Head back to the plans page or your account area to continue.
              </p>
            </div>
          </div>

          <div className="mb-8 flex items-center gap-6 rounded-xl border border-[#252B37] bg-[#12151c] p-6">
            <IoIosInformationCircleOutline
              size={52}
              className="shrink-0 text-primary"
            />
            <p className="text-start text-lg leading-relaxed text-third">
              If your payment gateway showed a reference number, save it before
              you contact support. Check that your card or wallet has funds and
              is enabled for online payments before retrying.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6">
            <Link href="/memberships" className="w-full md:flex-1">
              <Button type="primary" className="!py-4 w-full">
                View membership plans
              </Button>
            </Link>
            <Link href="/user/my-membership" className="w-full md:flex-1">
              <Button type="default" className="w-full border-white/20 !py-4">
                My membership
              </Button>
            </Link>
            <Link href="/" className="w-full md:flex-1">
              <Button type="default" className="w-full border-white/20 !py-4">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
