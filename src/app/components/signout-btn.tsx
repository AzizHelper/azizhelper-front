"use client";

import { Button } from "@/app/components/ui/button";
import { deleteCookie } from "@/lib/utils";

export default function SignOutButton() {
  return (
    <Button
      className="w-24"
      variant="destructive"
      onClick={() => {
        deleteCookie("token");
      }}
    >
      Signout
    </Button>
  );
}
