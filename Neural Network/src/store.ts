import { create } from "zustand";

const useStore = create((set) => ({
    inputParams: null,
    inputOptions: null,
  
    hiddenParams: null,
    hiddenOptions: null,
  
    updateInputParams: (newParams) => set({ inputParams: newParams }),
    updateInputOptions: (newOptions) => set({ inputOptions: newOptions }),
  
    updateOutputParams: (newParams) => set({ hiddenParams: newParams }),
    updateOutputOptions: (newOptions) => set({ hiddenOptions: newOptions }),
}));

export default useStore;
