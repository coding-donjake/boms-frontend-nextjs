import api, { ApiOptions, buildRoute } from "./axios";

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

export const filesBaseRoute = "/files";

export const filesApis = {
  upload: ({ route, payload, config }: ApiOptions = {}) =>
    api.post(buildRoute(filesBaseRoute, route), payload, config),

  view: (filePath: string) => {
    return buildRoute(filesBaseRoute, filePath);
  },
};

export const uploadFiles = async (files: FileList, signalState: any) => {
  try {
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const result = await filesApis.upload({
      route: "",
      payload: formData,
      config: {
        headers: { "Content-Type": "multipart/form-data" },
      },
    });

    return result.data;
  } catch (error: any) {
    const data = error.response.data;

    updateState(signalState, {
      formState: {
        ...signalState.value.formState,
        formAlert: {
          variant: "error",
          text: data.message,
          isOpen: true,
        }
      }
    });
  }
}
