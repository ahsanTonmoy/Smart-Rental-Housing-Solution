import Image from "next/image";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";
// import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface ListingCardProps {
  listing: {
    id: string;
    location: string;
    rentAmount: number;
    bedrooms: number;
    amenities: string[];
    description: string;
    images: string[];
  };
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <>
      <Link href={`/listings/${listing?.id}`} passHref>
        <div className="bg-white rounded-xl shadow-2xl hover:shadow-lg transition decoration-300 h-[480px]">
          {/* image block */}
          <div className="relative w-full h-56 ">
            <Image
              src={
                listing.images[0].replace("http://", "https://") ||
                "/placeholder.jpg"
              }
              // src="https://res.cloudinary.com/dd3w1s9gq/image/upload/v1741706390/phmc6upqdltab6ncwwiv.jpg"

              alt="Listing Image"
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
            />
            <div className=" absolute left-4 top-4 z-20">
              <Heart className="text-red-600 w-10 h-10" />
            </div>
          </div>
          {/* content block */}
          <div className="p-5">
            {/* description */}
            <div className="grid gap-2">
              {/* tityle */}
              <div className=" text-xl font-bold capitalize">
                <p className="">{listing.description}</p>
              </div>
              {/* price */}
              <div className=" flex justify-between">
                <div className="">
                  {/*  */}
                  <span className=" font-bold">
                    <span className="text-2xl  text-[#0AA5CD]">
                      ৳{listing.rentAmount}
                    </span>
                    {/* <span> /</span>
                    <span className="text-xs text-black">
                      {" "}
                      {listing.bedrooms} Bedrooms
                    </span>{" "} */}
                  </span>
                </div>
                {/* rating */}
                <div className="">
                  <span className=" text-xs mt-3">
                    {listing.bedrooms} Bedrooms
                  </span>
                  {/* <div className="flex gap-1 text-[#0AA5CD]">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div> */}
                </div>
              </div>
            </div>
            {/* tags */}
            <div className="my-6">
              <div className="flex gap-2 text-[10px] flex-wrap">
                {listing.amenities.slice(0, 3).map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-4 py-1 rounded-2xl  "
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            {/* location */}
            <div className=" flex gap-0.5 text-gray-500 font-semibold capitalize">
              <span className="text-[#0AA5CD]">
                <FaLocationDot />
              </span>
              <h3 className="text-sm">{listing.location}, bangladesh</h3>
            </div>

            <div className=""></div>

            {/* <Link href='listingId'> */}
            {/* <Link href={`/listings/${listing?.id}`} passHref>
          <Button className="">View Details</Button>
        </Link> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ListingCard;
