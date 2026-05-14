import { signal } from "@preact/signals-react";

type SellerLoginFormAlertType = {
  severity: "error" | "info" | "success" | "warning";
  text: string;
  isOpen: boolean;
}

export const sellerLoginForm = signal({
  username: "",
  password: "",
});

export const sellerLoginFormAlert = signal<SellerLoginFormAlertType>({
  severity: "info",
  text: "",
  isOpen: false,
});


export const updateSellerLoginForm = (
  field: keyof typeof sellerLoginForm.value,
  value: string,
) => {
  sellerLoginForm.value = {
    ...sellerLoginForm.value,
    [field]: value,
  };
};

export const updateSellerLoginFormAlert = (
  field: keyof typeof sellerLoginFormAlert.value,
  value: string | boolean | number,
) => {
  sellerLoginFormAlert.value = {
    ...sellerLoginFormAlert.value,
    [field]: value,
  };
};
