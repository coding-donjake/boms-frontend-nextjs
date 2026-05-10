"use client";

import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  
  return (
    <div className="bg-white flex flex-col gap-4 w-96 p-4 rounded-md shadow-sm">
      <div className="flex flex-col items-center">
        <div className="font-bold text-3xl">SELLER PORTAL</div>
      </div>
      <div className="flex flex-col gap-2">
        <TextField size="small" label="Username" />
        <TextField size="small" type="password" label="Password" />
      </div>
      <div className="flex flex-row gap-2">
        <Button className="flex-1" variant="contained" color="info">
          Log In
        </Button>
        <Button className="flex-1" variant="contained" color="success" onClick={() => router.push("/register")}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
