import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { LuTicket } from "react-icons/lu";

export const EmptyLegsComingSoonComponent = () => {
  return (
    <main
      className="relative min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center px-5 py-16 md:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, #050810 0%, #0a1428 42%, #0a2143 72%, #050810 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 30%, #f0d484 0%, transparent 42%), radial-gradient(circle at 85% 55%, #f0d484 0%, transparent 38%)",
        }}
        aria-hidden
      />

      <div className="relative z-[1] w-full max-w-[668px]">
        <div
          className="rounded-2xl p-8 sm:p-10 md:p-11 border shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          style={{
            borderColor: "rgba(45, 52, 67, 0.6)",
            background: "rgba(21, 28, 40, 0.88)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="flex flex-col items-start text-left">
            <div
              className="grid place-items-center shrink-0 rounded-lg text-2xl"
              style={{
                width: 48,
                height: 48,
                background: "#f0d484",
                color: "#0a2143",
              }}
              aria-hidden
            >
              <LuTicket size={26} strokeWidth={2} />
            </div>

            <h1
              className="mt-6 text-3xl sm:text-4xl md:text-[36px] font-bold leading-[1.15]"
              style={{ color: "#f5f3f0" }}
            >
              Empty legs
            </h1>

            <p className="mt-2 text-lg sm:text-xl font-bold text-primary tracking-tight">
              Get in touch with our team
            </p>

            <p
              className="mt-5 text-base leading-relaxed max-w-xl"
              style={{ color: "#7b879d" }}
            >
              You can contact us about discounted positioning flights and empty
              leg availability that fits your route and dates.{" "}
              <span className="font-bold" style={{ color: "#f5f3f0" }}>
                Use the Contact us page to send your request
              </span>{" "}
              and we will get back to you. You can also explore seat sharing
              while you plan your trip.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 w-full sm:w-auto">
              <Link
                href="/"
                className="inline-flex flex-1 sm:flex-initial min-h-[56px] items-center justify-center gap-2 px-7 rounded-[10px] font-bold text-base transition-colors border border-[#2d3443] text-[#f5f3f0] hover:bg-white/[0.06]"
              >
                <FiArrowLeft className="text-lg" aria-hidden />
                Back to home
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex flex-1 sm:flex-initial min-h-[56px] items-center justify-center gap-2 px-7 rounded-[10px] font-bold text-base bg-primary text-secondary hover:opacity-90 transition-opacity"
              >
                Contact us
              </Link>
              <Link
                href="/seat-sharing"
                className="inline-flex flex-1 sm:flex-initial min-h-[56px] items-center justify-center gap-2 px-7 rounded-[10px] font-bold text-base transition-colors border border-[#2d3443] text-[#f5f3f0] hover:bg-white/[0.06]"
              >
                Browse seat sharing
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: "#5c6678" }}>
          On Time · Premium travel, refined.
        </p>
      </div>
    </main>
  );
};
