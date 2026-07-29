import { GradientText } from "../tools/GradientText";
import { MembershipTiersGrid } from "./sections/MembershipTiersGrid";

export const MembershipComponent = () => {
  return (
    <main className="mt-14 py-24 px-6">
      <div className="container">
        <div className="text-center mb-24">
          <h1 className="text-primary text-5xl font-bold mb-3">
            <GradientText>Memberships</GradientText>
          </h1>
          <p className="text-third text-lg">
            Unlock exclusive privileges, priority access, dedicated concierge
            support, <br /> and unique luxury experiences through Rich Style
            Memberships.
          </p>
        </div>

        <MembershipTiersGrid rowAlign="stretch" />
      </div>
    </main>
  );
};
