"use client";

import SellerNavigation from "@/components/seller/widgets/SellerNavigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/seller");
    }
  });

  return <div className="h-screen flex flex-row">
    <SellerNavigation />
  </div>;
};

export default page;
