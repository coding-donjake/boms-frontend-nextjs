"use client";

import { TextField, Button, Alert, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useSignals } from "@preact/signals-react/runtime";
import { useState } from "react";
import accountApis from "@/components/seller/api";
import { useRouter } from "next/navigation";
import { updateState } from "@/lib/utis";
import { sellerFormAlert, sellerRegisterForm } from "../store";

const SellerRegisterForm = () => {
  useSignals();

  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const validateStep1 = async () => {
    const result = await accountApis.get({ route: `check-username-availability/${sellerRegisterForm.value.data.username}` });

    if (!result.data.isUsernameAvailable) {
      updateState(sellerFormAlert, { text: "Username not available." });
      updateState(sellerFormAlert, { severity: "error" });
      updateState(sellerFormAlert, { isOpen: true });
      return;
    }

    updateState(sellerFormAlert, { isOpen: false });
    setCurrentStep(2);
  }

  const register = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (sellerRegisterForm.value.data.password.length < 6) {
      updateState(sellerFormAlert, { text: "Password must be atleast 6 characters." });
      updateState(sellerFormAlert, { severity: "error" });
      updateState(sellerFormAlert, { isOpen: true });
      return;
    }

    if (sellerRegisterForm.value.data.password != sellerRegisterForm.value.data.cPassword) {
      updateState(sellerFormAlert, { text: "Password didn't match." });
      updateState(sellerFormAlert, { severity: "error" });
      updateState(sellerFormAlert, { isOpen: true });
      return;
    }

    try {
      const result = await accountApis.post({
        route: "register",
        payload: { data: (({ cPassword, ...rest }) => rest)(sellerRegisterForm.value.data) },
      });

      updateState(sellerFormAlert, { text: "Account registration success." });
      updateState(sellerFormAlert, { severity: "success" });
      updateState(sellerFormAlert, { isOpen: true });
      router.push("/seller");
    } catch (error: any) {
      if (error.response?.status === 500) {
        updateState(sellerFormAlert, { text: "Internal server error." });
        updateState(sellerFormAlert, { severity: "error" });
        updateState(sellerFormAlert, { isOpen: true });
        return;
      }

      if (error.response?.status === 400) {
        updateState(sellerFormAlert, { text: "Invalid details for registration." });
        updateState(sellerFormAlert, { severity: "error" });
        updateState(sellerFormAlert, { isOpen: true });
        return;
      }
    }
  };

  return (
    <form className="bg-white flex flex-col gap-4 w-md p-4 rounded-md shadow-sm" onSubmit={(e) => register(e)}>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl text-center">
          REGISTER AS SELLER
        </div>
        <div className={sellerFormAlert.value.isOpen ? "block" : "hidden"}>
          <Alert
            variant="outlined"
            severity={sellerFormAlert.value.severity}
            >
            {sellerFormAlert.value.text}
          </Alert>
        </div>
      </div>
      {currentStep === 1 ? (
        <>
          <div className="flex flex-col gap-2">
            <TextField
              label="Create username"
              value={sellerRegisterForm.value.data.username}
              required
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, username: e.target.value },
                });
              }}
            />
          </div>
          <div className="flex flex-row-reverse gap-2">
            <Button
              className="flex-1"
              size="large"
              variant="contained"
              color="success"
              onClick={() => validateStep1()}
            >
              Next Step
            </Button>
            <Button
              className="flex-1"
              type="submit"
              size="large"
              variant="contained"
              color="info"
              onClick={() => router.push("/seller")}
            >
              Log-In Instead
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <TextField
              label="Username"
              value={sellerRegisterForm.value.data.username}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              label="Create password"
              type="password"
              value={sellerRegisterForm.value.data.password}
              required
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, password: e.target.value },
                });
              }}
            />
            <TextField
              label="Confirm password"
              type="password"
              value={sellerRegisterForm.value.data.cPassword}
              required
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, cPassword: e.target.value },
                });
              }}
            />
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            <TextField
              label="Last Name"
              value={sellerRegisterForm.value.data.lastName}
              required
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, lastName: e.target.value },
                });
              }}
            />
            <TextField
              label="First Name"
              value={sellerRegisterForm.value.data.firstName}
              required
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, firstName: e.target.value },
                });
              }}
            />
            <TextField
              label="Middle Name (optional)"
              value={sellerRegisterForm.value.data.middleName}
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, middleName: e.target.value },
                });
              }}
            />
            <TextField
              label="Suffix (optional)"
              value={sellerRegisterForm.value.data.suffix}
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, suffix: e.target.value },
                });
              }}
            />
            <FormControl>
              <InputLabel id="gender-label">Gender *</InputLabel>
              <Select
                labelId="gender-label"
                value={sellerRegisterForm.value.data.gender}
                label="Gender"
                required
                onChange={(e) => {
                  updateState(sellerRegisterForm, {
                    data: { ...sellerRegisterForm.value.data, gender: e.target.value },
                  });
                }}
                >
                <MenuItem value={"MALE"}>Male</MenuItem>
                <MenuItem value={"FEMAIL"}>Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Birth Date"
              type="date"
              value={sellerRegisterForm.value.data.birthDate}
              required
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, birthDate: e.target.value },
                });
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
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
              Create Account
            </Button>
            <Button
              className="flex-1"
              type="submit"
              size="large"
              variant="contained"
              color="info"
              onClick={() => router.push("/seller")}
            >
              Log-In Instead
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default SellerRegisterForm;
