import Image from "next/image";

export const LoaderS1 = () => {
  return (
    <div className="fixed inset-0 z-[9999]">
      <Image
        src="/images/starter-image.png"
        alt="Sand Studio Logo"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
};
