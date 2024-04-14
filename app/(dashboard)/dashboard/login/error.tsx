"use client";

import LoginCard from "./components/LoginCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GlobeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

function Error({ error, reset }: { error: Error; reset: Function }) {
  console.log(error);
  return (
    <div className="h-screen  w-full flex justify-center items-center">
      {/* error alert */}
      <div className="max-w-[600px]">
        <Alert>
          <GlobeIcon className="h-4 w-4" />
          <AlertTitle>Wrong Credentials !</AlertTitle>
          <div className="flex gap-12 justify-between items-center">
            <AlertDescription>{`${error}`}</AlertDescription>
            <Button onClick={() => reset()}>Try Again</Button>
          </div>
        </Alert>
      </div>
    </div>
  );
}

export default Error;
