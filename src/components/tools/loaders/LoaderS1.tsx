import Image from "next/image";

export const LoaderS1 = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#06111f]">
      {/* Desktop */}
      <div className="hidden md:block relative w-full h-full">
        <Image
          src="/images/starter-image.png"
          alt="Sand Studio"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-center w-full h-full">
        <Image
          src="/images/logo.svg"
          alt="Sand Studio Logo"
          width={180}
          height={80}
          priority
          className="w-40 h-auto"
        />
      </div>
    </div>
  );
};
