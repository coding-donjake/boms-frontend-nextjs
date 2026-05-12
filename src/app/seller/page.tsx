import { Button, TextField } from "@mui/material";
import Link from "next/link";
import SellerLoginForm from "./components/SellerLoginForm";

const page = () => {
  return (
    <div className="flex flex-col flex-1 p-6 items-center justify-center">
      <SellerLoginForm />
    </div>
  );
};

export default page;
