"use client"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/app/components/ui/sheet";
import { PanelLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import axios from "axios";
import { getCookie } from "@/lib/utils";

export default function LeftPanel() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-row items-center gap-2">
          <PanelLeftIcon className="w-5 h-5 mt-1" />
          <span className="mt-1 sm:hidden flex">Menu</span>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="min-w-[390px] px-0">
        <div>
          <h3 className="px-7 text-xl font-semibold">Conversations</h3>
          <Suspense
            fallback={
              <p className={buttonVariants({ variant: "link" })}>Loading...</p>
            }
          >
            <ConversationList />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ConversationList() {
  const [chats, setChats] = useState<Chats[]>([]);

  useEffect(() => {
    async function fetchChats() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/getChats`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        if (res.status === 200) {
          setChats(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    }

    fetchChats();
  }, []);

  return (
    <ScrollArea className="flex flex-col mt-7 items-start overflow-y-auto h-[90vh] pb-5">
      {chats.map((chat: Chats) => (
        <SheetClose asChild key={chat.chatId}>
          <Link
            href={`/chat/${chat.chatId}`}
            className="w-full my-3 px-8 hover:underline underline-offset-2"
          >
            {chat.chatName.length > 35 ? chat.chatName.slice(0, 35) + "..." : chat.chatName}
          </Link>
        </SheetClose>
      ))}
    </ScrollArea>
  );
}