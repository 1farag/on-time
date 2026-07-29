import { SectionHeader } from "@/components/tools/SectionHeader";

type ExperienceItem = {
  title: string;
  image: string;
};

const experiences: ExperienceItem[] = [
  { title: "Luxury Cars", image: "/photos/1.png" },
  { title: "Luxury Hotels", image: "/photos/2.png" },
  { title: "Yacht Experiences", image: "/photos/3.png" },
  { title: "Private Jet", image: "/photos/4.png" },
  { title: "Fine Dining", image: "/photos/5.png" },
];

const CardOverlay = ({ title }: { title: string }) => (
  <>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <p className="absolute bottom-4 left-4 text-white text-base">{title}</p>
  </>
);

export const ExperiencesSection = () => {
  return (
    <section className="py-20 bg-[#050505]">
      <div className="container">
        <SectionHeader
          badge="Premium Experiences"
          titleStart="Beyond Services ."
          titleGradient="A Lifestyle."
          description="A handpicked collection of experiences reserved for our members."
        />

        <div className="mt-14 grid grid-cols-2 gap-4">
          {/* الكارت الكبير */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={experiences[0].image}
              alt={experiences[0].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ aspectRatio: "3/4" }}
            />
            <CardOverlay title={experiences[0].title} />
          </div>

          {/* 4 كروت صغيرة */}
          <div className="grid grid-cols-2 gap-4">
            {experiences.slice(1).map((exp, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <CardOverlay title={exp.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
