import CreateShopForm from "@/components/modules/shop/create-shop/CreateShopForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create listing - BasaFinder | Smart Rental & Housing Solution ",
  description: "Smart Rental & Housing Solution",
};
const CreateShopPage = () => {
  return (
    <div className="flex justify-center items-center">
      <CreateShopForm />
    </div>
  );
};

export default CreateShopPage;
