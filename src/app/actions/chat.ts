"use client"
import { generateObjectId, getCookie } from "@/lib/utils";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/utils";
import axios from "axios";

export type Message = {
  message: string;
  chatId?: string;
};

export async function sendMessage(params: Message) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return redirect("/login");
  }
    const chatId = params.chatId || generateObjectId();
    const responseMessage = axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/sendMessage`,
      {
        chatId: chatId,
        userMessage: params.message,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return {chatId: chatId, responseMessage: await responseMessage};
}
