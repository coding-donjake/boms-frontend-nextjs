"use client";

import { updateState } from "@/lib/utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const accountSessionExpireLogout = (formStore: any, router: AppRouterInstance) => {
  updateState(formStore, {
    formState: {
      ...formStore.value.formState,
      formAlert: {
        variant: "error",
        text: "Session expired. Please log-in again.",
        isOpen: true,
      },
    },
  });

  localStorage.removeItem("token");
  router.push("/seller");
};
