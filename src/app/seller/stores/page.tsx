"use client";

import SellerNavigation from "@/components/seller/widgets/SellerNavigation";
import SellerStoreList from "@/components/seller/widgets/SellerStoreList";
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
    <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
      <SellerStoreList />
    </div>
  </div>;
};

export default page;
