"use server";

import { generateObjectId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/utils";
import axios from "axios";

export type Message = {
  message: string;
};

export type NewMessage = Omit<Message, "conversationId">;

export async function sendMessage(params: NewMessage) {
  const authenticated = await isAuthenticated();
  if (!authenticated){
    redirect("/login");
  }
  let id: string | undefined;
  let error: undefined | { message: string };
  try {
    const newConversationId = generateObjectId();
    const responseMessage = axios.post(`${process.env.NEXT_FRONT_BACKEND_URL}/chat/newMessage`, {
      chatId: newConversationId,
      message: params.message,
    })
    id = newConversationId;
  } catch (err) {
    if (err instanceof Error) error = { message: err.message };
  }
  console.log(error);
  if (error) return error;
  redirect(`/chat/${id}`);
}
