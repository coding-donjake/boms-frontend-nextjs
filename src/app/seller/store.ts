import { signal } from "@preact/signals-react";

export const sellerLoginForm = signal({
  username: "",
  password: "",
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
