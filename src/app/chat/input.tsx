"use client";

import Submit from "@/app/components/submit";
import { Input } from "@/app/components/ui/input";
import { sendMessage } from "@/app/actions/chat";
import { useToast } from "@/app/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/utils";

export default function ChatInput() {
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(formData: FormData) {
    const message = formData.get("message") as string;
    if (!message) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const { message: err } = await sendMessage({ message });
    if (err) {
      toast({
        title: err,
      });
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-row items-center gap-2 sm:pr-5"
    >
      <Input
        autoComplete="off"
        name="message"
        placeholder="إسألني..."
        className="h-12"
      />
      <Submit />
    </form>
  );
}
