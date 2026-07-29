"use client";

import { getFaqContent } from "@/apiCalls/appContent/getFaqContent";
import { useQuery } from "@tanstack/react-query";

export const useFaqContent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["app-content", "faq"],
    queryFn: getFaqContent,
  });

  return { data, isLoading, error };
};
