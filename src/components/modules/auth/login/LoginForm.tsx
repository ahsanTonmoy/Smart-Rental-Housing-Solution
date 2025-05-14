"use client";

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

  const { refetchUser, setIsLoading } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/"; // ✅ fallback to home

  const router = useRouter();
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);

      if (res?.success) {
        await refetchUser();
        toast.success(res?.message || "Login successful");

        router.push(redirect); // ✅ Single redirect based on URL param
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during login.");
    } finally {
      setIsLoading(false);
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
          {/* Email */}
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

          {/* Password */}
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

          {/* Submit */}
          <Button type="submit" className="mt-5 w-full">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-gray-600 text-center my-3">
        Don’t have an account?{" "}
        <Link href="/register" className="text-primary font-medium">
          Register
        </Link>
      </p>
      <p className="text-sm text-gray-600 text-center my-3">
        Back to{" "}
        <Link href="/" className="text-primary font-medium">
          Home
        </Link>
      </p>
    </div>
  );
}
