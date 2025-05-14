import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Regiter - BasaFinder | Smart Rental & Housing Solution ",
  description: "Smart Rental & Housing Solution",
};
const RegisterPage = () => {
  return (
    <div className="">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
