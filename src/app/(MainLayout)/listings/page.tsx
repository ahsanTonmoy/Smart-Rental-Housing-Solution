"use client";

import { Button } from "@/components/ui/button";
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
import React, { useEffect, useState } from "react";

// import Link from "next/link";

type ListingWithId = TRentalListing & { _id: string };

interface RentalListingsProps {
  initialListings: ListingWithId[];
}

const RentalListings: React.FC<RentalListingsProps> = ({ initialListings }) => {
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
  const handleReset = () => {
    setLocation("");
    setPriceRange([0, 50000]);
    setBedrooms("any");
    setFilteredListings(initialListings);
  };

  return (
    <NMContainer className="my-20 px-4 md:px-16">
      {/* Search Section */}
      <div className="bg-white p-6 rounded-xl mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Search Rental Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Price Range
            </label>
            <div className="px-2 ">
              <Slider
                defaultValue={[0, 50000]}
                min={0}
                max={50000}
                step={1000}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                className="mt-2 bg-[#0AA5CD]"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>৳{priceRange[0].toLocaleString()}</span>
                <span>৳{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bedrooms</label>
            <Select
              value={bedrooms}
              onValueChange={(value) => setBedrooms(value)}
            >
              <SelectTrigger className="w-full">
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
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSearch}
              className="bg-[#0AA5CD] text-white hover:bg-black flex-1"
            >
              Search
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-blue-300 text-blue-600"
            >
              Reset
            </Button>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 px-10 py-8">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing: ListingWithId, idx: number) => (
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
    </NMContainer>
  );
};

// This exports the page component with data fetching
export default function RentalListingsPage() {
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

  return <RentalListings initialListings={initialListings} />;
}
