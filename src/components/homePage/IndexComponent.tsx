import { getFeaturedBookings } from "@/apiCalls/bookings/getFeaturedBookings";
import { HeroSection } from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { ClientsSection } from "./sections/ClientsSection";
import { AboutSection } from "./sections/AboutSection";
import style from "./styles/homePage.module.scss";
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
