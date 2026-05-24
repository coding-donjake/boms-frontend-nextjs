import { defaultFormState, FormState } from "@/lib/utils";
import { signal } from "@preact/signals-react";

export type SellerLoginFormDataType = {
  username: string;
  password: string;
};

export type SellerLoginFormType = {
  formState: FormState;
  data: SellerLoginFormDataType;
};

export const defaultSellerLoginForm: SellerLoginFormType = {
  formState: defaultFormState,
  data: {
    username: "",
    password: "",
  }
};

export const sellerLoginForm = signal<SellerLoginFormType>(
  structuredClone(defaultSellerLoginForm)
);

export const resetSellerLoginForm = () => {
  sellerLoginForm.value = structuredClone(defaultSellerLoginForm);
};

export type SellerRegisterFormDataType = {
  username: string;
  password: string;
  cPassword: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  gender: string;
  birthDate: string;
};

export type SellerRegisterFormType = {
  formState: FormState;
  data: SellerRegisterFormDataType;
};

export const defaultSellerRegisterForm: SellerRegisterFormType = {
  formState: defaultFormState,
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
};

export const sellerRegisterForm = signal<SellerRegisterFormType>(
  structuredClone(defaultSellerRegisterForm)
);

export const resetSellerRegisterForm = () => {
  sellerRegisterForm.value = structuredClone(defaultSellerRegisterForm);
};

export type SellerStoreCrudDataType = {
  id: null;
  name: string;
  description: string;
  profileImage: string | null;
  bannerImage: string | null;
  dateCreated: string | null;
  dateRemoved: string | null;
  organizationId: string | null;
}

export type SellerStoreCrudType = {
  formState: FormState;
  list: SellerStoreCrudDataType[];
  data: SellerStoreCrudDataType;
};

export const defaultSellerStoreCrud: SellerStoreCrudType = {
  formState: defaultFormState,
  list: [],
  data: {
    id: null,
    name: "",
    description: "",
    profileImage: null,
    bannerImage: null,
    dateCreated: null,
    dateRemoved: null,
    organizationId: null,
  }
};

export const sellerStoreCrud = signal(structuredClone(defaultSellerStoreCrud));

export const resetSellerCrud = () => {
  sellerStoreCrud.value = structuredClone(defaultSellerStoreCrud);
};
