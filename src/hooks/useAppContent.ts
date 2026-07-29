"use client";

import { getAppContent } from "@/apiCalls/appContent/getAppContent";
import { useQuery } from "@tanstack/react-query";

export const useAppContent = (slug: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["app-content", slug],
    queryFn: () => getAppContent(slug),
  });

  return { data, isLoading, error };
};
