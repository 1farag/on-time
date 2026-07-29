import axiosInstance from "@/lib/axios";

export interface AboutUsSection {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
}

export interface AboutUsContent {
  slug: string;
  title: string;
  vision: AboutUsSection;
  mission: AboutUsSection;
  statistics: {
    monthlyTrips: number;
    airplaneNumber: number;
  };
  published: boolean;
  updatedAt: string;
}

export const getAboutUsContent = async (): Promise<AboutUsContent | null> => {
  try {
    const response = await axiosInstance.get<AboutUsContent>(
      "/app-content/about-us",
    );
    return response.data;
  } catch {
    return null;
  }
};
