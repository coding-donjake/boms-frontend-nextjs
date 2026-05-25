"use client";

import { ReactNode, useEffect } from "react";
import authApis from "./auth-api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type AccountAuthProviderProps = {
  children: ReactNode;
  route: string;
  formStore: any;
  router: AppRouterInstance;
  sessionExpireLogout: (formStore: any, router: AppRouterInstance) => void;
};

const AccountAuthProvider = ({
  children,
  route,
  formStore,
  router,
  sessionExpireLogout,
}: AccountAuthProviderProps) => {
  const refreshToken = async () => {
    try {
      if (!localStorage.getItem("token")) return;

      const response = await authApis.post({
        route,
        config: {
          withCredentials: true,
        },
      });

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log("error caught", error);
      localStorage.removeItem("token");
      sessionExpireLogout(formStore, router);
    }
  };

  useEffect(() => {
    refreshToken();

    const interval = setInterval(() => {
      refreshToken();
    }, Number(process.env.NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL) || 1200000);

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
};

export default AccountAuthProvider;
