import AboutUs from "@/components/modules/about/About";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About - BasaFinder | Smart Rental & Housing Solution ",
  description: "Smart Rental & Housing Solution",
};
const page = () => {
  return (
    <div>
      {/* add or create all about page info & content static content add from demo figma */}
      <AboutUs />
    </div>
  );
};

export default page;
