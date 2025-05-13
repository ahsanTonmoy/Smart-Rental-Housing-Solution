"use client";
// import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";

import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { refetchUser } = useUser();
  const { setIsLoading } = useUser();
  // const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁 Password visibility state

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  // const handleReCaptcha = async (value: string | null) => {
  //   try {
  //     const res = await reCaptchaTokenVerification(value!);
  //     if (res?.success) {
  //       setReCaptchaStatus(true);
  //     }
  //   } catch (err: any) {
  //     console.error(err);
  //   }
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        await refetchUser();
        router.push("/");
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto flex-grow max-w-sm w-full p-5">
      <div className="flex items-center flex-col space-x-4 py-2">
        <div>
          <h1 className="text-xl font-semibold text-center">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field with Visibility Toggle */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      value={field.value || ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 right-2 flex items-center"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex mt-3 w-full">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
              onChange={handleReCaptcha}
              className="mx-auto"
            />
          </div> */}

          <Button
            // disabled={!reCaptchaStatus}
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have an account?{" "}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
      <p className="text-sm text-gray-600 text-center my-3">
        Go to{" "}
        <Link href="/" className="text-primary">
          Home
        </Link>
      </p>
    </div>
  );
}
