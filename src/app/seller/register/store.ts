import { signal } from "@preact/signals-react";

type SellerRegisterFormAlertType = {
  severity: "error" | "info" | "success" | "warning";
  text: string;
  isOpen: boolean;
}

export const sellerRegisterForm = signal({
  username: "",
  password: "",
  cPassword: "",
  lastName: "",
  firstName: "",
  middleName: "",
  suffix: "",
  gender: "",
  birthDate: "",
});

export const sellerRegisterFormAlert = signal<SellerRegisterFormAlertType>({
  severity: "info",
  text: "",
  isOpen: false,
});

export const updateSellerRegisterForm = (
  field: keyof typeof sellerRegisterForm.value,
  value: string | boolean | number,
) => {
  sellerRegisterForm.value = {
    ...sellerRegisterForm.value,
    [field]: value,
  };
};

export const updateSellerRegisterFormAlert = (
  field: keyof typeof sellerRegisterFormAlert.value,
  value: string | boolean | number,
) => {
  sellerRegisterFormAlert.value = {
    ...sellerRegisterFormAlert.value,
    [field]: value,
  };
};
