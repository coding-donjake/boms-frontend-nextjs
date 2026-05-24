"use client";

import { TextField, Button, Alert, Select, MenuItem, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { useSignals } from "@preact/signals-react/runtime";
import { useEffect, useState } from "react";
import accountApis from "@/components/seller/account-api";
import { useRouter } from "next/navigation";
import { updateState } from "@/lib/utils";
import { resetSellerRegisterForm, sellerRegisterForm } from "../store";

const SellerRegisterForm = () => {
  useSignals();

  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const validateStep1 = async () => {
    try {
      if (sellerRegisterForm.value.data.username.length < 6) {
        updateState(sellerRegisterForm, {
          formState: {
            ...sellerRegisterForm.value.formState,
            formAlert: {
              variant: "error",
              text: "Username must be atleast 6 characters.",
              isOpen: true,
            }
          }
        });

        return;
      }

      const result = await accountApis.get({ route: `check-username-availability/${sellerRegisterForm.value.data.username}` });

      if (!result.data.isUsernameAvailable) {
        updateState(sellerRegisterForm, {
          formState: {
            ...sellerRegisterForm.value.formState,
            formAlert: {
              variant: "error",
              text: "Username not available.",
              isOpen: true,
            }
          }
        });

        return;
      }

      updateState(sellerRegisterForm, {
        formState: {
          ...sellerRegisterForm.value.formState,
          formAlert: {
            variant: "info",
            text: "",
            isOpen: false,
          }
        }
      });
      setCurrentStep(2);
    } catch (error: any) {
      const data = error.response.data;

      updateState(sellerRegisterForm, {
        formState: {
          ...sellerRegisterForm.value.formState,
          formAlert: {
            variant: "error",
            text: data.message,
            isOpen: true,
          }
        }
      });
    }
  }

  const register = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (sellerRegisterForm.value.data.password.length < 6) {
      updateState(sellerRegisterForm, {
        formState: {
          ...sellerRegisterForm.value.formState,
          formAlert: {
            variant: "error",
            text: "Password must be atleast 6 characters.",
            isOpen: true,
          }
        }
      });

      return;
    }

    if (sellerRegisterForm.value.data.password != sellerRegisterForm.value.data.cPassword) {
      updateState(sellerRegisterForm, {
        formState: {
          ...sellerRegisterForm.value.formState,
          formAlert: {
            variant: "error",
            text: "Password didn't match.",
            isOpen: true,
          }
        }
      });

      return;
    }

    try {
      const result = await accountApis.post({
        route: "register",
        payload: { data: (({ cPassword, ...rest }) => rest)(sellerRegisterForm.value.data) },
      });

      updateState(sellerRegisterForm, {
        formState: {
          ...sellerRegisterForm.value.formState,
          formAlert: {
            variant: "success",
            text: "Account registration success.",
            isOpen: true,
          }
        }
      });

      setCurrentStep(0);
    } catch (error: any) {
      const data = error.response.data;

      updateState(sellerRegisterForm, {
        formState: {
          ...sellerRegisterForm.value.formState,
          formAlert: {
            variant: "error",
            text: data.message,
            isOpen: true,
          }
        }
      });
    }
  };

  useEffect(() => {
    resetSellerRegisterForm();
  }, []);

  return (
    <form className="bg-white flex flex-col gap-4 w-md p-4 rounded-md shadow-sm" onSubmit={(e) => register(e)}>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl text-center">
          REGISTER AS SELLER
        </div>
        <div className={sellerRegisterForm.value.formState.formAlert.isOpen ? "block" : "hidden"}>
          <Alert
            variant="outlined"
            severity={sellerRegisterForm.value.formState.formAlert.variant}
            >
            {sellerRegisterForm.value.formState.formAlert.text}
          </Alert>
        </div>
      </div>
      {currentStep === 0 ? (
        <>
          <div className="flex flex-row-reverse gap-2">
            <Button
              className="flex-1"
              size="large"
              variant="contained"
              color="info"
              onClick={() => router.push("/seller")}
            >
              Log-In
            </Button>
          </div>
        </>
      ) : null}
      {currentStep === 1 ? (
        <>
          <div className="flex flex-col gap-2">
            <TextField
              label="Create username"
              value={sellerRegisterForm.value.data.username}
              required
              slotProps={{
                input: {
                  readOnly: sellerRegisterForm.value.formState.loading,
                },
              }}
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
              size="large"
              variant="contained"
              color="info"
              onClick={() => router.push("/seller")}
            >
              Log-In Instead
            </Button>
          </div>
        </>
      ) : null}
      {currentStep === 2 ? (
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
              slotProps={{
                input: {
                  readOnly: sellerRegisterForm.value.formState.loading,
                },
              }}
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
              slotProps={{
                input: {
                  readOnly: sellerRegisterForm.value.formState.loading,
                },
              }}
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
              slotProps={{
                input: {
                  readOnly: sellerRegisterForm.value.formState.loading,
                },
              }}
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
              slotProps={{
                input: {
                  readOnly: sellerRegisterForm.value.formState.loading,
                },
              }}
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, firstName: e.target.value },
                });
              }}
            />
            <TextField
              label="Middle Name (optional)"
              value={sellerRegisterForm.value.data.middleName}
              slotProps={{
                input: {
                  readOnly: sellerRegisterForm.value.formState.loading,
                },
              }}
              onChange={(e) => {
                updateState(sellerRegisterForm, {
                  data: { ...sellerRegisterForm.value.data, middleName: e.target.value },
                });
              }}
            />
            <TextField
              label="Suffix (optional)"
              value={sellerRegisterForm.value.data.suffix}
              slotProps={{
                input: {
                  readOnly: sellerRegisterForm.value.formState.loading,
                },
              }}
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
                slotProps={{
                  input: {
                    readOnly: sellerRegisterForm.value.formState.loading,
                  },
                }}
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
                input: {
                  readOnly: sellerRegisterForm.value.formState.loading,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </div>
          <div className="flex flex-row-reverse gap-2">
            {sellerRegisterForm.value.formState.loading ? (
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
                disabled={sellerRegisterForm.value.formState.loading}
              >
                Create Account
              </Button>
            )}
            <Button
              className="flex-1"
              size="large"
              variant="contained"
              color="info"
              disabled={sellerRegisterForm.value.formState.loading}
              onClick={() => router.push("/seller")}
            >
              Log-In Instead
            </Button>
          </div>
        </>
      ) : null}
    </form>
  );
};

export default SellerRegisterForm;
