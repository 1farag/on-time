import { VerifyComponent } from "@/components/user/verify/VerifyComponent";
import { Suspense } from "react";

function VerifyPageFallback() {
  return (
    <main className="container mx-auto flex min-h-[40vh] items-center justify-center px-4">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyPageFallback />}>
      <main className="container mx-auto px-4">
        <VerifyComponent />
      </main>
    </Suspense>
  );
}
