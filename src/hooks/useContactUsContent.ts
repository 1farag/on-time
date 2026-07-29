"use client";

import { getContactUsContent } from "@/apiCalls/appContent/getContactUsContent";
import { useQuery } from "@tanstack/react-query";

export const useContactUsContent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["app-content", "contact-us"],
    queryFn: getContactUsContent,
  });

  return { data, isLoading, error };
};
