import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import useIsUserLoggedClient from "@/hooks/useIsUserLoggedClient";
import { cn } from "@/lib/utils";

function SignedOut({
  children,
  className,
}: {
  children: React.ReactNode;

  className?: string;
}) {
  let { isLoading, isSuccess, isError, user } = useIsUserLoggedClient();
  return (
    <div className={cn(className)}>
      {isError && <div>{children}</div>}
      {isLoading && (
        <div>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  );
}
function SignedIn({ children, className }: { children: React.ReactNode; className?: string }) {
  let { isLoading, isSuccess, isError, user } = useIsUserLoggedClient();
  return (
    <div className={cn(className)}>
      {isSuccess && <div>{children}</div>}
      {isLoading && (
        <div>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  );
}

export { SignedOut, SignedIn };
