"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    moreByLacy?: () => void;
  }
}

/** Footer slot for the "Also by Lacy Morrow" line (script loaded in layout.tsx). */
export function MoreByLacy({ className }: { className?: string }) {
  useEffect(() => {
    window.moreByLacy?.();
  }, []);
  return <div data-more-by-lacy className={className} />;
}
