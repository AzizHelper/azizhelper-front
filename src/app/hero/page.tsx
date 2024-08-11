import { buttonVariants } from "@/app/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-5 justify-center h-[70vh]">
      <h3 className="text-4xl font-bold text-center" dir="rtl">
        أهلاً بك في عزيز، المساعد الذكي!
      </h3>
      <p
        className="sm:w-[75%] mx-auto text-center text-muted-foreground"
        dir="rtl"
      >
        أنا هُنا في خدمتك للإجابة على الاستفسارات الخاصة بجامعة الملك عبدالعزيز.
      </p>
      <Link href="/chat" className={buttonVariants({ size: "lg" })}>
        محادثة جديدة
      </Link>
    </div>
  );
}
