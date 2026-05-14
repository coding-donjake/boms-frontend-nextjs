"use client";

import { TextField, Button, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSignals } from "@preact/signals-react/runtime";
import { sellerLoginForm, sellerLoginFormAlert, updateSellerLoginForm, updateSellerLoginFormAlert } from "../store";
import accountApis from "@/lib/apis/account-api";

const SellerLoginForm = () => {
  useSignals();

  const router = useRouter();

  const login = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await accountApis.post({
        route: "login",
        payload: { data: sellerLoginForm.value },
        config: { withCredentials: true },
      });

      localStorage.setItem("token", result.data.token);
      router.push("dashboard");
    } catch (error: any) {
      if (error.response?.status === 500) {
        updateSellerLoginFormAlert("text", "Internal server error.");
        updateSellerLoginFormAlert("severity", "error");
        updateSellerLoginFormAlert("isOpen", true);
        return;
      }

      if (error.response?.status === 401) {
        console.log('called');
        updateSellerLoginFormAlert("text", "Invalid username or password.");
        updateSellerLoginFormAlert("severity", "error");
        updateSellerLoginFormAlert("isOpen", true);
        return;
      }
    }
  }

  return (
    <form className="bg-white flex flex-col gap-4 w-96 p-4 rounded-md shadow-sm" onSubmit={(e) => login(e)}>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl text-center">SELLER PORTAL</div>
        <div className={sellerLoginFormAlert.value.isOpen ? "block" : "hidden"}>
          <Alert
            variant="outlined"
            severity={sellerLoginFormAlert.value.severity}
            >
            {sellerLoginFormAlert.value.text}
          </Alert>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <TextField
          label="Username"
          value={sellerLoginForm.value.username}
          onChange={(e) => {updateSellerLoginForm("username", e.target.value)}}
        />
        <TextField
          type="password"
          label="Password"
          value={sellerLoginForm.value.password}
          onChange={(e) => {updateSellerLoginForm("password", e.target.value)}}
        />
      </div>
      <div className="flex flex-row-reverse gap-2">
        <Button
          className="flex-1"
          type="submit"
          size="large"
          variant="contained"
          color="success"
        >
          Log-In
        </Button>
        <Button
          className="flex-1"
          size="large"
          variant="contained"
          color="info"
          onClick={() => router.push("/seller/register")}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default SellerLoginForm;
