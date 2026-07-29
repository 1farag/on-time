import { getFeaturedBookings } from "@/apiCalls/bookings/getFeaturedBookings";
import { FlyTermsSection } from "./sections/FlyTermsSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorkSection, ServicesSection } from "./sections/ServicesSection";
import { JourneyBannerSection } from "./sections/JourneyBannerSection";
import { ClientsSection, MembershipSection } from "./sections/ClientsSection";
import { SafetyFirstSection } from "./sections/SafetyFirstSection";
import { SeatSharingTripsSection } from "./sections/SeatSharingTripsSection";
import { AboutSection } from "./sections/AboutSection";
import style from "./styles/homePage.module.scss";
import { ExperiencesSection } from "../membership/sections/Experiences_section";
import { CorporateSection } from "../membership/sections/Corporate_section";
import { FaqSection } from "../membership/sections/Faqـsection";
import { ProjectsSection } from "./sections/ProjectsSection";

const HOME_FEATURED_TRIPS_LIMIT = 6;

export const IndexComponent: React.FC = async () => {
  const featuredHome = await getFeaturedBookings({
    page: 1,
    limit: HOME_FEATURED_TRIPS_LIMIT,
  });
  return (
    <main className={style.homePage}>
      <HeroSection />

      <AboutSection />

      <ServicesSection />
      <ClientsSection />
      <ProjectsSection />
    </main>
  );
};
