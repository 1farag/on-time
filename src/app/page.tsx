import { IndexComponent } from "@/components/homePage/IndexComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

const HomePage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <IndexComponent />
    </Suspense>
  );
};

export default HomePage;
