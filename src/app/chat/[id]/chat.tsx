"use client";

import { sendMessage } from "@/app/actions/chat";
import Submit from "@/app/components/submit";
import { Input } from "@/app/components/ui/input";
import { useToast } from "@/app/components/ui/use-toast";
import { generateObjectId, isAuthenticated } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";

type ChatProps = {
  messages: JSONMessage[];
  id: string;
};

export default function Chat({ messages, id }: ChatProps) {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [optimisticMessages, setOptimisticMessages] = useState(messages);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [optimisticMessages]);

  const addMessage = (newMessage: JSONMessage) => {
    setOptimisticMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="grow">
      <div className="flex flex-col items-start gap-12 pb-10 min-h-[75vh] sm:w-[95%]">
        {optimisticMessages?.map((message) => (
          <div className="flex flex-col items-start gap-4" key={message._id}>
            <h4
              className={`text-xl font-medium ${
                message.role === "user"
                  ? "dark:text-sky-200 text-sky-700"
                  : "dark:text-green-200 text-green-700"
              }`}
            >
              {message.role === "user" ? "You" : "Assistant"}
            </h4>
            <p className="dark:text-slate-300 text-slate-900 whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        ))}
      </div>
      <div ref={scrollRef}></div>
      <div className="mt-5 bottom-0 sticky pb-8 pt-1 bg-background">
        <ChatInput id={id} addMessage={addMessage} />
      </div>
    </div>
  );
}

type ConversationComponent = {
  id: string;
  addMessage: (msg: JSONMessage) => void;
};

function ChatInput({ addMessage, id }: ConversationComponent) {
  const inputRef = useRef<ElementRef<"input">>(null);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(formData: FormData) {
    const message = formData.get("message") as string;
    if (!message) return;

    const authenticated = await isAuthenticated();
    if (!authenticated) {
      router.push("/login");
      return;
    }

    const userMessage = {
      role: "user",
      content: message,
      _id: generateObjectId(),
      timestamp: new Date(),
    };

    addMessage(userMessage);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    try {
      const resMessage = await sendMessage({ message, chatId: id });

      if (resMessage.responseMessage.status !== 200) {
        throw new Error("Failed to send message");
      }

      const assistantMessage = {
        role: "assistant",
        content: resMessage.responseMessage.data.assistantMessage,
        _id: generateObjectId(),
        timestamp: new Date(),
      };

      addMessage(assistantMessage);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Unable to send message, please try again.",
      });
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-row items-center gap-2 sm:pr-5"
    >
      <Input
        ref={inputRef}
        autoComplete="off"
        name="message"
        placeholder="Ask me something..."
        className="h-12"
      />
      <Submit />
    </form>
  );
}
