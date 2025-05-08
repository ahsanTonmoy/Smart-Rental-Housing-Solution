"use client";
import image2 from "@/assets/images/image/home-10.jpg";
import image3 from "@/assets/images/image/home-11.jpg";
import image1 from "@/assets/images/image/home-5.jpg";
import Image from "next/image";

const PopularLocations = () => {
  const locations = [
    {
      name: "Dhaka",
      properties: 3,
      image: image1,
    },
    {
      name: "Sylhet",
      properties: 2,
      image: image2,
    },
    {
      name: "Chittagong",
      properties: 1,
      image: image3,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 ">
      <p className="text-sm uppercase tracking-widest text-center text-[#0AA5CD]">
        People Love the Most
      </p>
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Popular Locations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mr-16 ">
        <div className="md:row-span-2 relative aspect-[3/4] overflow-hidden rounded-lg">
          <Image
            src={locations[0].image}
            alt={locations[0].name}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            {locations[0].properties} Properties
          </div>
          <div className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow-lg">
            {locations[0].name}
          </div>
        </div>

        {locations.slice(1).map((location, index) => (
          <div
            key={index}
            className="relative aspect-video h-full rounded-lg overflow-hidden"
          >
            <Image
              src={location.image}
              alt={location.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {location.properties} Properties
            </div>
            <div className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow-lg">
              {location.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularLocations;
