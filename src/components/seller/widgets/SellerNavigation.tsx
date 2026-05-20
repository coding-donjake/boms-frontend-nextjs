"use client";

import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const SellerNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="bg-gray-300 flex flex-col gap-2 w-60 h-full p-4">
      <Button
        size="large"
        variant="contained"
        color={pathname === "/seller/dashboard" ? "success" : "info"}
        onClick={() => router.push("/seller/dashboard")}
      >
        Dashboard
      </Button>
      <Button
        size="large"
        variant="contained"
        color={pathname === "/seller/stores" ? "success" : "info"}
        onClick={() => router.push("/seller/stores")}
      >
        Stores
      </Button>
    </div>
  );
};

export default SellerNavigation;
