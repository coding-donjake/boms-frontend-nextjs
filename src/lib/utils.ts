export type FormAlertType = {
  variant: "error" | "info" | "success" | "warning";
  text: string;
  isOpen: boolean;
}

export type FormState = {
  loading: boolean;
  formAlert: FormAlertType;
}

export const defaultFormState: FormState = {
  loading: false,
  formAlert: {
    variant: "info",
    text: "",
    isOpen: false,
  }
}

export const updateState = <T extends object>(state: { value: T }, value: Partial<T>) => {
  state.value = {
    ...state.value,
    ...value,
  };
};
