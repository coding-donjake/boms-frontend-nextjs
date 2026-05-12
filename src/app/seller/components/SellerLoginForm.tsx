"use client";

import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSignals } from "@preact/signals-react/runtime";
import { sellerLoginForm, updateSellerLoginForm } from "../store";

const SellerLoginForm = () => {
  useSignals();

  const router = useRouter();
  
  return (
    <div className="bg-white flex flex-col gap-4 w-96 p-4 rounded-md shadow-sm">
      <div className="flex flex-col items-center">
        <div className="font-bold text-3xl">SELLER PORTAL</div>
      </div>
      <div className="flex flex-col gap-2">
        <TextField
          size="small"
          label="Username"
          value={sellerLoginForm.value.username}
          onChange={(e) => {updateSellerLoginForm("username", e.target.value)}}
        />
        <TextField
          size="small"
          type="password"
          label="Password"
          value={sellerLoginForm.value.password}
          onChange={(e) => {updateSellerLoginForm("password", e.target.value)}}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Button className="flex-1" variant="contained" color="info">
          Log In
        </Button>
        <Button className="flex-1" variant="contained" color="success" onClick={() => router.push("/seller/register")}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default SellerLoginForm;
