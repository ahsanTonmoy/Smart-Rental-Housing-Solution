"use client";

import person1 from "@/assets/images/image/testimonial-1.jpg";
import person2 from "@/assets/images/image/testimonial-2.jpg";
import person3 from "@/assets/images/image/testimonial-3.jpg";
import Image from "next/image";

const testimonials = [
  {
    name: "Shirley Smith",
    title: "Tenant",
    text: "The rental experience was smooth, professional, and stress-free. Highly recommend their services!",
    image: person1,
    textColor: "#0AA5CD",
    bgColor: "#e0f7fa",
    hoverBgColor: "#b2ebf2",
  },
  {
    name: "Ms. Soraiaa Ahmed",
    title: "Landlord",
    text: "Great platform to list my rental property. Found a responsible tenant quickly with minimal effort.",
    image: person2,
    textColor: "#E91E63",
    bgColor: "#fce4ec",
    hoverBgColor: "#f8bbd0",
  },
  {
    name: "Shinny Smith",
    title: "Agent",
    text: "This is one of the best services for rental management. Customer support is top-notch!",
    image: person3,
    textColor: "#4CAF50",
    bgColor: "#e8f5e9",
    hoverBgColor: "#c8e6c9",
  },
];

const TestimonialSection = () => {
  return (
    <section className=" py-20 px-4 container mx-auto">
      <div className="text-center mb-12 mt-20">
        <p className="text-sm uppercase tracking-widest text-[#0AA5CD]">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold text-gray-800">What They Say</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl shadow-md text-center flex flex-col items-center group transition-all duration-300"
            style={{
              backgroundColor: item.bgColor,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor =
                item.hoverBgColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor =
                item.bgColor;
            }}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <Image
                src={item.image}
                alt={item.name}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-gray-600 mb-4 text-sm">{item.text}</p>
            <h3
              className="font-bold transition-colors duration-300"
              style={{ color: item.textColor }}
            >
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
