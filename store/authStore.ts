import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface AuthState {
  user: any;
  error: any;
  isLogged: boolean;
  token: string | undefined;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  errorMsg: string;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isLogged: false,
  token: getCookie(`hesaby-user-token`)?.toString(),
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: "",
};

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
    }),

    { name: "auth-store" }
  )
);

export default useAuthStore;

export const testAuth = async () => {
  try {
    useAuthStore.setState({ isLoading: true });
    let response = await fetch(`/api/auth/check-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: useAuthStore.getState().token }),
    });
    let { user, error } = await response.json();
    if (!response.ok) throw new Error();
    useAuthStore.setState({
      isLoading: false,
      user,
      isSuccess: true,
      isError: false,
      isLogged: true,
    });
  } catch (error) {
    console.log(error);
    useAuthStore.setState({
      isLoading: false,
      error,
      isSuccess: false,
      isError: true,
      isLogged: false,
    });
  }
};

export const setLogin = (user: any) => {
  useAuthStore.setState({
    isLoading: false,
    user,
    isSuccess: true,
    isError: false,
    isLogged: true,
    token: getCookie(`hesaby-user-token`)?.toString(),
  });
};

export const setLogout = () => {
  getCookie(`hesaby-user-token`) && deleteCookie(`hesaby-user-token`);
  useAuthStore.setState({
    isLoading: false,
    error: { error: true },
    isSuccess: false,
    isError: true,
    isLogged: false,
    token: undefined,
    user: null,
  });
};
