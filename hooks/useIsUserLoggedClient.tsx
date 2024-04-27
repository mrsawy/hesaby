import { useState, useEffect, useReducer } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

let GLOBAL_AUTH_STATE: any = null;

const reducer = (state: any, action: { type: string; payload?: any }) => {
  let result: any;
  switch (action.type) {
    case "LOADING":
      result = { ...state, isLoading: true };
      GLOBAL_AUTH_STATE = result;
      return result;
    case "SUCCESS":
      result = {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        user: action.payload.user,
      };
      GLOBAL_AUTH_STATE = result;
      return result;
    case "LOGIN":
      result = {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        user: action?.payload?.user ?? state.user,
      };
      GLOBAL_AUTH_STATE = result;
      return result;

    case "ERROR":
      result = {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        user: null,
        error: action.payload.error,
      };
      GLOBAL_AUTH_STATE = result;
      return result;

    case "LOGOUT":
      deleteCookie(`hesaby-user-token`);
      result = {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        user: null,
        error: action?.payload?.error ?? `not logged`,
      };
      GLOBAL_AUTH_STATE = result;
      return result;
    case `GLOBAL_AUTH_STATE`:
      return GLOBAL_AUTH_STATE;
    default:
      return state;
  }
};

const initialState = {
  user: null,
  error: null,
  isLogged: false,
  token: getCookie(`hesaby-user-token`)?.toString(),
  isSuccess: false,
  isError: false,
  isLoading: false,
};

let numbersOfCheckRequests = 0;

export default function useIsUserLoggedClient() {
  const [auth, dispatch] = useReducer(reducer, initialState);
  // Check if the user is already logged
  useEffect(() => {
    (async () => {
      try {
        console.log(`before request`, numbersOfCheckRequests);
        if (!GLOBAL_AUTH_STATE && numbersOfCheckRequests < 32) {
          console.log(`after request`, numbersOfCheckRequests);
          numbersOfCheckRequests = numbersOfCheckRequests + 1;

          dispatch({ type: "LOADING" });
          let response = await fetch(`/api/auth/check-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: auth.token }),
          });
          let { user, error } = await response.json();

          if (user) {
            dispatch({ type: "SUCCESS", payload: { user } });
          } else {
            dispatch({ type: "ERROR", payload: { error } });
          }
        } else {
          dispatch({ type: `GLOBAL_AUTH_STATE` });
        }
      } catch (error) {
        dispatch({ type: "ERROR", payload: { error } });
      }
    })();
  }, []);
  return { ...auth, authDispatch: dispatch };
}
