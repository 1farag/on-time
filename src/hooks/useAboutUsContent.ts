"use client";

import { getAboutUsContent } from "@/apiCalls/appContent/getAboutUsContent";
import { useQuery } from "@tanstack/react-query";

export const useAboutUsContent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["app-content", "about-us"],
    queryFn: getAboutUsContent,
  });

  return { data, isLoading, error };
};
