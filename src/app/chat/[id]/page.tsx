"use client";
import { notFound, redirect } from "next/navigation";
import Chat from "./chat";
import axios from "axios";
import { getCookie, isAuthenticated } from "@/lib/utils";
import { useState, useEffect } from "react";

type PageParams = {
  params: {
    id: string;
  };
};

export default function ChatSpecificPage({ params: { id } }: PageParams) {
  const [messages, setMessages] = useState<JSONMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
          return redirect("/login");
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/getChat`,
          {
            chatId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        if (res.status === 200) {
          setMessages(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (messages.length == 0) {
    return <div>Conversation not found.</div>;
  }

  return <Chat id={id} messages={messages} />;
}