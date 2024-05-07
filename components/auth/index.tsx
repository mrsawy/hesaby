"use client";

import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import useStore from "@/store/authStore";

function SignedOut({ children, className }: { children: React.ReactNode; className?: string }) {
  let { isLoading, isError } = useStore((state) => ({
    isLoading: state.isLoading,
    isError: state.isError,
  }));

  return (
    <div className={cn(className)}>
      {isError && <div>{children}</div>}
      {isLoading && <></>}
    </div>
  );
}
function SignedIn({ children, className }: { children: React.ReactNode; className?: string }) {
  let { isLoading, isSuccess } = useStore((state) => ({
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
  }));
  return (
    <div className={cn(className)}>
      {isSuccess && <div>{children}</div>}
      {isLoading && <></>}
    </div>
  );
}

export { SignedOut, SignedIn };
