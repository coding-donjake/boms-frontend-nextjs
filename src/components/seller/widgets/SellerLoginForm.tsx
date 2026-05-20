"use client";

import { TextField, Button, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSignals } from "@preact/signals-react/runtime";
import accountApis from "@/components/seller/api";
import { updateState } from "@/lib/utis";
import { sellerFormAlert, sellerLoginForm } from "../store";

const SellerLoginForm = () => {
  useSignals();

  const router = useRouter();

  const login = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await accountApis.post({
        route: "login",
        payload: { data: sellerLoginForm.value.data },
        config: { withCredentials: true },
      });

      localStorage.setItem("token", result.data.token);
      router.push("dashboard");
    } catch (error: any) {
      if (error.response?.status === 500) {
        updateState(sellerFormAlert, { text: "Internal server error." });
        updateState(sellerFormAlert, { severity: "error" });
        updateState(sellerFormAlert, { isOpen: true });
        return;
      }

      if (error.response?.status === 401) {
        console.log('called');
        updateState(sellerFormAlert, { text: "Invalid username or password." });
        updateState(sellerFormAlert, { severity: "error" });
        updateState(sellerFormAlert, { isOpen: true });
        return;
      }
    }
  }

  return (
    <form className="bg-white flex flex-col gap-4 w-96 p-4 rounded-md shadow-sm" onSubmit={(e) => login(e)}>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl text-center">SELLER PORTAL</div>
        <div className={sellerFormAlert.value.isOpen ? "block" : "hidden"}>
          <Alert
            variant="outlined"
            severity={sellerFormAlert.value.severity}
            >
            {sellerFormAlert.value.text}
          </Alert>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <TextField
          label="Username"
          value={sellerLoginForm.value.data.username}
          onChange={(e) => {
            updateState(sellerLoginForm, {
              data: { ...sellerLoginForm.value.data, username: e.target.value }
            })
          }}
        />
        <TextField
          type="password"
          label="Password"
          value={sellerLoginForm.value.data.password}
          onChange={(e) => {
            updateState(sellerLoginForm, {
              data: { ...sellerLoginForm.value.data, password: e.target.value }
            })
          }}
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
