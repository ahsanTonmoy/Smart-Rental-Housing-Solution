import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login - BasaFinder | Smart Rental & Housing Solution ",
  description: "Smart Rental & Housing Solution",
};

import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
