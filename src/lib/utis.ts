export const updateState = <T extends object>(state: { value: T }, value: Partial<T>) => {
  state.value = {
    ...state.value,
    ...value,
  };
};
