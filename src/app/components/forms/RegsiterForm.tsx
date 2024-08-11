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

const RegisterSchema = z.object({
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح",
  }),
  name: z.string().min(1, {
    message: "الاسم مطلوب",
  }),
  password: z.string().min(8, {
    message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
  }),
});

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    setSuccessMessage("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        data
      );
      if (response.status === 201) {
        setSuccessMessage("تم إنشاء الحساب بنجاح.");
        // Optionally, redirect after a delay
        setTimeout(() => {
          router.push("/chat");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || "فشل في التسجيل.");
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
        label="إنشاء حساب"
        title="تسجيل"
        backButtonHref="/login"
        backButtonLabel="تسجيل دخول"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right block">الاسم</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="عزيز محمد"
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
                      الرقم السري
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="الرقم السري"
                        className="text-right w-full"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {successMessage && (
              <div className="text-green-500 text-center">{successMessage}</div>
            )}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "جاري التحميل..." : "تســجــيــل"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default RegisterForm;
