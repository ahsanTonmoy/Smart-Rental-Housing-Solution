import Contact from "@/components/modules/home/Contact/Contact";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact - BasaFinder | Smart Rental & Housing Solution ",
  description: "Smart Rental & Housing Solution",
};
const ContactUs = () => {
  return (
    <div>
      {/* add or create contact page info & content static content add from demo figma */}
      <div className="">
        <Contact />
      </div>
    </div>
  );
};

export default ContactUs;
