"use client";
import SignInForm from "@/app/components/forms/SignInForm";
import { isAuthenticated } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (typeof window !== "undefined") {
          const authenticated = await isAuthenticated();
          if (authenticated) {
            return router.push("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-80 px-4">
      <div className="w-full min-w-[700px]">
        <SignInForm />
      </div>
    </div>
  );
}