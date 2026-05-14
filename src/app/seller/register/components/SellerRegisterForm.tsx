"use client";

import { TextField, Button, Alert, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { sellerRegisterForm, sellerRegisterFormAlert, updateSellerRegisterForm, updateSellerRegisterFormAlert } from "../store";
import { useSignals } from "@preact/signals-react/runtime";
import { useState } from "react";
import accountApis from "@/lib/apis/account-api";
import { useRouter } from "next/navigation";
import { updateSellerLoginFormAlert } from "../../store";

const SellerRegisterForm = () => {
  useSignals();

  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const validateStep1 = async () => {
    const result = await accountApis.get({ route: `check-username-availability/${sellerRegisterForm.value.username}` });

    if (!result.data.isUsernameAvailable) {
      updateSellerRegisterFormAlert("text", "Username not available.");
      updateSellerRegisterFormAlert("severity", "error");
      updateSellerRegisterFormAlert("isOpen", true);
      return;
    }

    updateSellerRegisterFormAlert("isOpen", false);
    setCurrentStep(2);
  }

  const register = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (sellerRegisterForm.value.password.length < 6) {
      updateSellerRegisterFormAlert("text", "Password must be atleast 6 characters.");
      updateSellerRegisterFormAlert("severity", "error");
      updateSellerRegisterFormAlert("isOpen", true);
      return;
    }

    if (sellerRegisterForm.value.password != sellerRegisterForm.value.cPassword) {
      updateSellerRegisterFormAlert("text", "Password didn't match.");
      updateSellerRegisterFormAlert("severity", "error");
      updateSellerRegisterFormAlert("isOpen", true);
      return;
    }

    try {
      const result = await accountApis.post({
        route: "register",
        payload: { data: (({ cPassword, ...rest }) => rest)(sellerRegisterForm.value) },
      });

      updateSellerLoginFormAlert("text", "Account registration success.");
      updateSellerLoginFormAlert("severity", "success");
      updateSellerLoginFormAlert("isOpen", true);
      router.push("/seller");
    } catch (error: any) {
      if (error.response?.status === 500) {
        updateSellerRegisterFormAlert("text", "Internal server error.");
        updateSellerRegisterFormAlert("severity", "error");
        updateSellerRegisterFormAlert("isOpen", true);
        return;
      }

      if (error.response?.status === 400) {
        updateSellerRegisterFormAlert("text", "Invalid details for registration.");
        updateSellerRegisterFormAlert("severity", "error");
        updateSellerRegisterFormAlert("isOpen", true);
        return;
      }
    }
  }

  return (
    <form className="bg-white flex flex-col gap-4 w-md p-4 rounded-md shadow-sm" onSubmit={(e) => register(e)}>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl text-center">
          REGISTER AS SELLER
        </div>
        <div className={sellerRegisterFormAlert.value.isOpen ? "block" : "hidden"}>
          <Alert
            variant="outlined"
            severity={sellerRegisterFormAlert.value.severity}
            >
            {sellerRegisterFormAlert.value.text}
          </Alert>
        </div>
      </div>
      {currentStep === 1 ? (
        <>
          <div className="flex flex-col gap-2">
            <TextField
              label="Create username"
              value={sellerRegisterForm.value.username}
              required
              onChange={(e) => {
                updateSellerRegisterForm("username", e.target.value);
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
              value={sellerRegisterForm.value.username}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              label="Create password"
              type="password"
              value={sellerRegisterForm.value.password}
              required
              onChange={(e) => {
                updateSellerRegisterForm("password", e.target.value);
              }}
            />
            <TextField
              label="Confirm password"
              type="password"
              value={sellerRegisterForm.value.cPassword}
              required
              onChange={(e) => {
                updateSellerRegisterForm("cPassword", e.target.value);
              }}
            />
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            <TextField
              label="Last Name"
              value={sellerRegisterForm.value.lastName}
              required
              onChange={(e) => {
                updateSellerRegisterForm("lastName", e.target.value);
              }}
            />
            <TextField
              label="First Name"
              value={sellerRegisterForm.value.firstName}
              required
              onChange={(e) => {
                updateSellerRegisterForm("firstName", e.target.value);
              }}
            />
            <TextField
              label="Middle Name (optional)"
              value={sellerRegisterForm.value.middleName}
              onChange={(e) => {
                updateSellerRegisterForm("middleName", e.target.value);
              }}
            />
            <TextField
              label="Suffix (optional)"
              value={sellerRegisterForm.value.suffix}
              onChange={(e) => {
                updateSellerRegisterForm("suffix", e.target.value);
              }}
            />
            <FormControl>
              <InputLabel id="gender-label">Gender *</InputLabel>
              <Select
                labelId="gender-label"
                value={sellerRegisterForm.value.gender}
                label="Gender"
                required
                onChange={(e) => {
                  updateSellerRegisterForm("gender", e.target.value);
                }}
                >
                <MenuItem value={"MALE"}>Male</MenuItem>
                <MenuItem value={"FEMAIL"}>Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Birth Date"
              type="date"
              value={sellerRegisterForm.value.birthDate}
              required
              onChange={(e) => {
                updateSellerRegisterForm("birthDate", e.target.value);
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
