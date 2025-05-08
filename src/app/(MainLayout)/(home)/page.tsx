import Bannar from "@/components/modules/home/bannar/Bannar";
import Contact from "@/components/modules/home/Contact/Contact";
import HeroBanner from "@/components/modules/home/Herobanner/HeroBanner";
import RentPropertySlider from "@/components/modules/home/PropertySlider/PropertySlider";
import PopularLocations from "@/components/modules/home/PupolarLocation/PopularLocations";
import RulesSection from "@/components/modules/home/RulesSection/RulesSection";
import TestimonialSection from "@/components/modules/home/TestimonialSection/TestimonialSection";

const page = () => {
  return (
    <div>
      {/* add or create all home page info & content static  */}
      {/* Bannar dynamic */}
      <div className="">
        <Bannar />
      </div>
      <div className="px-4 md:px-16">
        <PopularLocations />
      </div>
      {/* populer items list dynamic */}
      <div className="">
        <RentPropertySlider />
      </div>{" "}
      {/* add why couse us static  */}
      <div className="px-4 md:px-16">
        <HeroBanner />
      </div>
      <div className="">
        <RulesSection />
      </div>
      <div className="px-4 md:px-16">
        <TestimonialSection />
      </div>
      <div className="">
        <Contact />
      </div>
      <div className="px-4 md:px-16"></div>
      {/* listing dynamic */}
      <div className="px-4 md:px-16"></div>
      {/* home page sort slider static upcoming */}
      <div className="px-4 md:px-16"></div>
      {/* clint review dynamic*/}
      <div className="px-4 md:px-16"></div>
      {/* our partners static upcoming */}
    </div>
  );
};

export default page;
