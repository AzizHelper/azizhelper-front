"use client";

import { Button } from "@/app/components/ui/button";

export default function SignOutButton() {
  return (
    <Button
      className="w-24"
      variant="destructive"
      onClick={() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
          method: "POST"
        })
      }}
    >
      Signout
    </Button>
  );
}
