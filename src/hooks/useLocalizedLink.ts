"use client";

/** In-app paths only (single-language app). */
export const useLocalizedLink = () => {
  return (path: string) => (path.startsWith("/") ? path : `/${path}`);
};
