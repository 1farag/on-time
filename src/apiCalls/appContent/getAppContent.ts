import axiosInstance from "@/lib/axios";

export interface AppContent {
  slug: string;
  title: string;
  contentAr: string;
  contentEn: string;
  published: boolean;
  updatedAt: string;
}

export const getAppContent = async (
  slug: string,
): Promise<AppContent | null> => {
  try {
    const response = await axiosInstance.get<AppContent>(
      `/app-content/${slug}`,
    );
    return response.data;
  } catch {
    return null;
  }
};
