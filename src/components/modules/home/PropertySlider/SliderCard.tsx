"use client";

import ListingCard from "@/components/ui/core/ListingCard";
import NMContainer from "@/components/ui/core/NMContainer";

import { getAllListings } from "@/services/Listings";
import { TRentalListing } from "@/types/listings";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
type ListingWithId = TRentalListing & { _id: string };

interface SliderCardProps {
  initialListings: ListingWithId[];
}

const SliderCard: React.FC<SliderCardProps> = ({ initialListings }) => {
  // State for search filters

  const [filteredListings, setFilteredListings] =
    useState<ListingWithId[]>(initialListings);

  // Update filtered listings when initial listings change
  useEffect(() => {
    setFilteredListings(initialListings);
  }, [initialListings]);

  return (
    <NMContainer className=" p-0">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={34}
        slidesPerView={3}
        slidesPerGroup={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="px-20"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {filteredListings.map((listing: ListingWithId, idx: number) => (
          <SwiperSlide className="my-20" key={listing._id}>
            <ListingCard
              key={idx}
              listing={{
                id: listing._id,
                location: listing.location,
                rentAmount: listing.rentAmount,
                bedrooms: listing.bedrooms,
                amenities: listing.amenities,
                description: listing.description,
                images: listing.images,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </NMContainer>
  );
};

// This exports the page component with data fetching
export default function SliderCardPage() {
  const [initialListings, setInitialListings] = useState<ListingWithId[]>([]);

  // Use useEffect to fetch data on the client side
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getAllListings();
        setInitialListings(data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setInitialListings([]);
      }
    }

    fetchData();
  }, []);

  return <SliderCard initialListings={initialListings} />;
}
