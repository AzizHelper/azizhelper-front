"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import CardWrapper from "./CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

const LoginSchema = z.object({
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح",
  }),
  password: z.string().min(1, {
    message: "كلمة المرور مطلوبة",
  }),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    try {
      console.log(data)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        data,
        { withCredentials: true }
      );
      
      console.log(response);
      if (response.status === 200) {
        alert("تم تسجيل الدخول بنجاح.");
        router.push("/chat");
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || "فشل في تسجيل الدخول.");
      } else {
        alert("حدث خطأ غير متوقع.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <CardWrapper
        label="تسجيل الدخول"
        title="دخول"
        backButtonHref="/register"
        backButtonLabel="إنشاء حساب"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right block">
                      البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="moe@stu.kau.edu.sa"
                        className="text-right w-full"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right block">
                      كلمة المرور
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="كلمة المرور"
                        className="text-right w-full"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "جاري التحميل..." : "دخول"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginForm;
