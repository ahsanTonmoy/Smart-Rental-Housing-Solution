"use client";

import ListingCard from "@/components/ui/core/ListingCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getAllListings } from "@/services/Listings";
import { TRentalListing } from "@/types/listings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Link from "next/link";

type ListingWithId = TRentalListing & { _id: string };

interface FilteringProps {
  initialListings: ListingWithId[];
}

const Filtering: React.FC<FilteringProps> = ({ initialListings }) => {
  // State for search filters
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [bedrooms, setBedrooms] = useState("any");
  const [filteredListings, setFilteredListings] =
    useState<ListingWithId[]>(initialListings);

  // Update filtered listings when initial listings change
  useEffect(() => {
    setFilteredListings(initialListings);
  }, [initialListings]);

  // Handle search filter changes
  const handleSearch = () => {
    const filtered = initialListings.filter((listing: ListingWithId) => {
      // Filter by location (case insensitive)
      const locationMatch =
        location === "" ||
        listing.location.toLowerCase().includes(location.toLowerCase());

      // Filter by price range
      const priceMatch =
        listing.rentAmount >= priceRange[0] &&
        listing.rentAmount <= priceRange[1];

      // Filter by bedrooms
      const bedroomsMatch =
        bedrooms === "any" || listing.bedrooms.toString() === bedrooms;

      return locationMatch && priceMatch && bedroomsMatch;
    });

    setFilteredListings(filtered);
  };

  // Reset all filters
  const [open, setOpen] = useState(false);
  return (
    <NMContainer className=" p-0">
      {/* Search Section */}
      <div className="lg:p-6 p-3 bg-white/20 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-2">
          <div className="bg-white rounded-md">
            <Input
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-full"
            />
          </div>

          <div className="bg-white rounded-md">
            <div className="p-4 flex gap-4 justify-center items-center">
              <span>৳{priceRange[0].toLocaleString()}</span>
              <Slider
                defaultValue={[0, 50000]}
                min={0}
                max={50000}
                step={1000}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                className=" bg-[#0AA5CD] rounded-3xl text-xs"
              />
              <span>৳{priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white rounded-md">
            <Select
              value={bedrooms}
              onValueChange={(value) => setBedrooms(value)}
            >
              <SelectTrigger className="w-full h-full">
                <SelectValue placeholder="Bedromes" />
              </SelectTrigger>
              <SelectContent className="bg-gray-50">
                <SelectItem
                  className="hover:bg-[#0AA5CD] hover:text-white"
                  value="any"
                >
                  Bedrooms
                </SelectItem>
                <SelectItem
                  className="hover:bg-[#0AA5CD] hover:text-white"
                  value="1"
                >
                  1 Bedrooms
                </SelectItem>
                <SelectItem
                  className="hover:bg-[#0AA5CD] hover:text-white"
                  value="2"
                >
                  2 Bedrooms
                </SelectItem>
                <SelectItem
                  className="hover:bg-[#0AA5CD] hover:text-white"
                  value="3"
                >
                  3 Bedrooms
                </SelectItem>
                <SelectItem
                  className="hover:bg-[#0AA5CD] hover:text-white"
                  value="4"
                >
                  4 Bedrooms
                </SelectItem>
                <SelectItem
                  className="hover:bg-[#0AA5CD] hover:text-white"
                  value="5"
                >
                  5+ Bedrooms
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <div className="flex md:flex-row flex-col items-end gap-2"> */}
          <div onClick={() => setOpen(true)} className="w-full ">
            <button
              onClick={handleSearch}
              className="bg-[#0AA5CD] w-full p-4 text-white rounded-md hover:bg-black flex-1 cursor-pointer transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Listings Header */}
      {/* <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">All Listings</h2>
        <Link href="/listings">
          <Button variant="outline" className="rounded-full">
            View All
          </Button>
        </Link>
      </div> */}

      {/* Listings Grid */}
      {open ? (
        <div className=" sticky z-30 bg-gray-100 rounded-2xl shadow-2xl my-10">
          <div className=" relative ">
            <div
              onClick={() => {
                setOpen(false);
              }}
              className="text-xl text-end px-8 py-6 cursor-pointer"
            >
              {" "}
              x
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !lg:p-20 pt-0 px-10 pb-10">
              {filteredListings.length > 0 ? (
                filteredListings
                  .slice(0, 6)
                  .map((listing: ListingWithId, idx: number) => (
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
                  ))
              ) : (
                <div className="col-span-4 text-center py-10">
                  <p className="text-lg text-gray-500">
                    No listings match your search criteria.
                  </p>
                </div>
              )}
            </div>
            {filteredListings.length > 6 && (
              <div className="py-4 ">
                {/* Listings Header */}
                <div className="text-center">
                  <Link href="/listings">
                    <button className="rounded px-4 py-2 text-white font-bold cursor-pointer bg-[#0aa5cd] hover:bg-black transition duration-300">
                      View All
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </NMContainer>
  );
};

// This exports the page component with data fetching
export default function FilteringPage() {
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

  return <Filtering initialListings={initialListings} />;
}
