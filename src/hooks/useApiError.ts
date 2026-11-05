"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/lib/api";

// Shows a friendly toast, or sends signed-out users to login
export function useApiError() {
  const router = useRouter();
  const pathname = usePathname();
  return useCallback(
    (err: unknown) => {
      if (err instanceof ApiError && err.status === 401) {
        toast.error("Please log in to continue.");
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    },
    [router, pathname]
  );
}
