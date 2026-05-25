"use client";

import AccountAuthProvider from "@/components/AccountAuthProvider";
import { sellerLoginForm } from "../store";
import { accountSessionExpireLogout } from "../utils";
import { useRouter } from "next/navigation";

const SellerAuthWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  return (
    <AccountAuthProvider
      route="account/refresh-token"
      formStore={sellerLoginForm}
      router={router}
      sessionExpireLogout={accountSessionExpireLogout}
    >
      {children}
    </AccountAuthProvider>
  );
};

export default SellerAuthWrapper;
