"use client";

import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSignals } from "@preact/signals-react/runtime";
import accountApis from "@/components/seller/api";
import { updateState } from "@/lib/utils";
import { resetSellerLoginForm, sellerLoginForm } from "../store";
import { useEffect } from "react";

const SellerLoginForm = () => {
  useSignals();

  const router = useRouter();

  const login = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateState(sellerLoginForm, {
      formState: { ...sellerLoginForm.value.formState, loading: true }
    })

    try {
      const result = await accountApis.post({
        route: "login",
        payload: { data: sellerLoginForm.value.data },
        config: { withCredentials: true },
      });

      localStorage.setItem("token", result.data.token);
      router.push("/seller/dashboard");
    } catch (error: any) {
      const data = error.response.data;

      updateState(sellerLoginForm, {
        formState: {
          ...sellerLoginForm.value.formState,
          formAlert: {
            variant: "error",
            text: data.message,
            isOpen: true,
          }
        }
      });
    }
  }

  useEffect(() => {
    resetSellerLoginForm();
  }, []);

  return (
    <form className="bg-white flex flex-col gap-4 w-md p-4 rounded-md shadow-sm" onSubmit={(e) => login(e)}>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl text-center">SELLER PORTAL</div>
        <div className={sellerLoginForm.value.formState.formAlert.isOpen ? "block" : "hidden"}>
          <Alert
            variant="outlined"
            severity={sellerLoginForm.value.formState.formAlert.variant}
            >
            {sellerLoginForm.value.formState.formAlert.text}
          </Alert>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <TextField
          label="Username"
          value={sellerLoginForm.value.data.username}
          required
          slotProps={{
            input: {
              readOnly: sellerLoginForm.value.formState.loading,
            },
          }}
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
          required
          slotProps={{
            input: {
              readOnly: sellerLoginForm.value.formState.loading,
            },
          }}
          onChange={(e) => {
            updateState(sellerLoginForm, {
              data: { ...sellerLoginForm.value.data, password: e.target.value }
            })
          }}
        />
      </div>
      <div className="flex flex-row-reverse gap-2">
        {sellerLoginForm.value.formState.loading ? (
          <div className="flex-1 flex flex-row justify-center items-center">
            <CircularProgress enableTrackSlot size="30px" aria-label="Loading…" />
          </div>
        ) : (
          <Button
            className="flex-1"
            type="submit"
            size="large"
            variant="contained"
            color="success"
            disabled={sellerLoginForm.value.formState.loading}
          >
            Log-In
          </Button>
        )}
        <Button
          className="flex-1"
          size="large"
          variant="contained"
          color="info"
          disabled={sellerLoginForm.value.formState.loading}
          onClick={() => router.push("/seller/register")}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default SellerLoginForm;
