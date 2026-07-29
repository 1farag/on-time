import axiosInstance from "@/lib/axios";

export interface ContactUsContent {
  slug: string;
  title: string;
  phoneCountryCode: string;
  phoneNumber: string;
  email: string;
  addressAr: string;
  addressEn: string;
  published: boolean;
  updatedAt: string;
}

export const formatContactPhone = (
  countryCode: string,
  phoneNumber: string,
): string => {
  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.length === 9) {
    return `${countryCode} ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }

  return `${countryCode} ${phoneNumber}`.trim();
};

export const getContactUsContent = async (): Promise<ContactUsContent | null> => {
  try {
    const response = await axiosInstance.get<ContactUsContent>(
      "/app-content/contact-us",
    );
    return response.data;
  } catch {
    return null;
  }
};
