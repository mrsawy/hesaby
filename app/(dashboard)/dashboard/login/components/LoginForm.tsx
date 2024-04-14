"use client";

import { Button } from "@/components/ui/button";
import { Input as LightInput } from "@/components/ui/input-light";
import { adminLogin } from "@/actions/admin";
import { useFormState, useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const adminLoginAction = (state: void | null, formData: FormData) => adminLogin(formData);
  //
  const [state, dispatchAction] = useFormState(adminLoginAction, null);
  const [loading, setLoading] = useState(false);
  //
  const { pending, data, method, action } = useFormStatus();
  //

  return (
    <form
      action={dispatchAction}
      onSubmit={(e) => {
        setLoading(true);
      }}
    >
      <div className="pb-4">
        <h6 className="text-sm pb-1 pt-3">Your email</h6>
        <LightInput id="email" type="email" name="email" placeholder="Email" />
      </div>
      <h6 className="text-sm pb-2 pt-3">Password</h6>
      <LightInput id="password" type="password" name="password" placeholder="password" />

      <Button
        disabled={state || pending || loading}
        className=" w-full mt-12 bg-blue-600 hover:bg-blue-900  dark:bg-white  dark:hover:bg-gray-300"
      >
        {state || pending || loading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          `Sign In`
        )}
      </Button>
    </form>
  );
}
