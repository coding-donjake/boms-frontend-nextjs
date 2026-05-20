import { signal } from "@preact/signals-react";

type SellerFormAlertType = {
  severity: "error" | "info" | "success" | "warning";
  text: string;
  isOpen: boolean;
}

export const sellerFormAlert = signal<SellerFormAlertType>({
  severity: "info",
  text: "",
  isOpen: false,
});

export const sellerLoginForm = signal({
  formState: {

  },
  data: {
    username: "",
    password: "",
  }
});

export const sellerRegisterForm = signal({
  formState: {

  },
  data: {
    username: "",
    password: "",
    cPassword: "",
    lastName: "",
    firstName: "",
    middleName: "",
    suffix: "",
    gender: "",
    birthDate: "",
  }
});
