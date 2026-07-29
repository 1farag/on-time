import axiosInstance from "@/lib/axios";

export interface FaqItem {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface FaqContent {
  slug: string;
  title: string;
  items: FaqItem[];
  published: boolean;
  updatedAt: string;
}

export const getFaqContent = async (): Promise<FaqContent | null> => {
  try {
    const response = await axiosInstance.get<FaqContent>("/app-content/faq");
    return response.data;
  } catch {
    return null;
  }
};
