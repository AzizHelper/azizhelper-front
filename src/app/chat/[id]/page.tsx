import { notFound } from "next/navigation";
import Chat from "./chat";
import axios from "axios";
import { isAuthenticated } from "@/lib/utils";

type PageParams = {
  params: {
    id: string;
  };
};

export default async function ChatSpecificPage({ params: { id } }: PageParams) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/getChat`,
      {
        chatId: id,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    if (!res) return notFound();
    return <Chat id={id} messages={res.data} />;
  } catch (err) {
    console.log(err);
  }
}
