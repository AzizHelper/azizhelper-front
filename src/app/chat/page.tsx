"use client";
import { useRouter } from "next/navigation";
import ChatInput from "./input";
import { isAuthenticated } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Chat() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const auth = await isAuthenticated();
        if (!auth) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (typeof window !== "undefined") {
      checkAuthentication();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grow">
      <div className="flex flex-col items-start gap-4 pb-10 min-h-[75vh] sm:w-[95%]">
        <div className="text-xl font-medium dark:text-sky-200 text-sky-700">
          مرحبا, أنا الشات بوت عزيز, أستطيع الرد على الأسئلة المتعلقة بالشؤون
          الأكاديمية والطلابية في جامعة الملك عبدالعزيز. أرجو منك كتابة سؤالك
          بطريقة صحيحة ومحددة وبصيغة واضحة
        </div>
        <div className="dark:text-slate-300 text-slate-900">
          يرجى عدم الإعتماد على البيانات كمصدر, لأن عزيز تحت التطوير وقد يُخطئ.
        </div>
      </div>
      <div className="mt-5 bottom-0 sticky pb-8 pt-1 bg-background">
        <ChatInput />
      </div>
    </div>
  );
}
