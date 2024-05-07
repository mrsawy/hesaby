import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface GeneralState {
  generalIsLoading: boolean;
  setGeneralIsLoading: (generalIsLoading: boolean) => void;
}

const useGeneralStore = create<GeneralState>((set) => ({
  generalIsLoading: false,
  setGeneralIsLoading: (generalIsLoading: boolean) => {
    set({ generalIsLoading });
  },
}));

export default useGeneralStore;
