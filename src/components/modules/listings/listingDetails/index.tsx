"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TRentalListing } from "@/types/listings";
import {
  Star,
  MapPin,
  BedDouble,
  DollarSign,
  CalendarDays,
  Clock,
  FileText,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useUser } from "@/context/UserContext";
import { useRentalRequest } from "@/context/RentalRequestContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const ListingDetails = ({ listing }: { listing: TRentalListing }) => {
  const { user } = useUser();
  const { setListing } = useRentalRequest();
  const router = useRouter();
  const pathname = usePathname();

  const [modalOpen, setModalOpen] = useState(false);
  const [moveInDate, setMoveInDate] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  // ✅ Handle request button click
  const handleRequestRent = () => {
    setModalOpen(true);
  };

  // ✅ Handle form submission
  const handleSubmitRequest = () => {
    if (!moveInDate || !rentalDuration) {
      toast.error("Please provide move-in date and rental duration.");
      return;
    }

    // Store data in context and navigate
    setListing({
      ...listing, // Keep existing listing properties
      moveInDate,
      rentalDuration,
      specialRequirements,
    } as TRentalListing & {
      moveInDate?: string;
      rentalDuration?: string;
      specialRequirements?: string;
    });

    setModalOpen(false);
    router.push("/tenants/create");
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white grid gap-8 min-h-screen cursor-pointer">
      {/* title */}
      <div className=" md:flex justify-between">
        <div className="">
          <h1 className="text-3xl font-bold w-2/3 text-gray-800">
            {listing.description}
          </h1>
          <div className="flex items-center gap-4 py-4 text-gray-600">
            <MapPin className="w-5 h-5 text-[#0AA5CD]" />
            <span>{listing.location}</span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4  font-bold text-3xl text-gray-600">
            <span>৳{listing.rentAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <CardContent className="">
        {/* content */}
        <div className="grid md:grid-cols-2 gap-9">
          {/* Swiper for Listing Images */}
          <div className="">
            <Carousel>
              {listing.images.map((image, idx) => (
                <div key={idx} className="relative w-full h-80">
                  <Image
                    src={
                      image.replace("http://", "https://") || "/placeholder.jpg"
                    }
                    alt={`Listing Image ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          {/* content */}
          <div className="py-6 ">
            {/*  */}
            <h1 className="text-base text-gray-600 font-bold">
              {listing.description}
            </h1>
            {/*  */}
            <div className="flex items-center gap-4 py-4 text-gray-600 ">
              <BedDouble className="w-5 h-5 text-primary" />
              <span>{listing.bedrooms} Bedrooms</span>
            </div>
            {/*  */}
            <div className="flex items-center gap-4 text-gray-600">
              <MapPin className="w-5 h-5 text-[#0AA5CD]" />
              <span>{listing.location}</span>
            </div>
            {/*  */}
            <div className="flex items-center gap-4 py-4 text-gray-600">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="grid">
                Amenities: {listing.amenities.join(", ")}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-6 py-6 w-full transtion ">
              {user ? (
                <div className="">
                  <Button className="px-6 py-2" onClick={handleRequestRent}>
                    Request Rental
                  </Button>
                  {/* {user?.role && (
                <Button
                  className="px-6 py-2"
                  onClick={handleRequestRent}
                >
                  Request Rental
                </Button>
              )} */}
                </div>
              ) : (
                <div className="">
                  <Link
                    href={`/login?redirect=${encodeURIComponent(pathname)}`}
                  >
                    <Button className="px-6 py-2">Request Rental</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Rental Request Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="md:text-lg text-center text-blue-500">
              Request Rental
            </DialogTitle>
          </DialogHeader>

          {/* Move-In Date */}
          <div className="flex items-center gap-2">
            <CalendarDays className="text-gray-500 w-5 h-5" />
            <p className="sm:text-xs md:text-lg text-gray-600 ml-2">
              Move in Date
            </p>
            <Input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              // className="w-full"
              className="w-40"
            />
          </div>

          {/* Rental Duration */}
          <div className="flex items-center gap-2">
            <Clock className="text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter rental duration (e.g., 6 months)"
              value={rentalDuration}
              onChange={(e) => setRentalDuration(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Special Requirements */}
          <div className="flex items-center gap-2">
            <FileText className="text-gray-500 w-5 h-5" />
            <Textarea
              placeholder="Special requirements (optional)"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              className="w-full"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListingDetails;
