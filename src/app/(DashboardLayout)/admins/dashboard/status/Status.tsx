"use client";

import { useEffect, useState } from "react";

import { TRentalListing } from "@/types";
import { getAllListings } from "@/services/Listings";
// import { Loader2, Lock, Unlock } from "lucide-react";

//
type ListingWithId = TRentalListing & { _id: string };

const Status = () => {
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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        User Management {initialListings.length}
      </h2>

      {/*  */}
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-medium">house</h2>
          <p className="text-2xl font-bold mt-2">{initialListings.length}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-medium">Orders</h2>
          <p className="text-2xl font-bold mt-2">350</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-medium">Customers</h2>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>
      </div>
    </div>
  );
};

export default Status;
