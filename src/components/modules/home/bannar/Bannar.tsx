"use client";

import React from "react";
import FilteringPage from "./filtering/Filtering";

const Bannar = () => {
  return (
    <div>
      {/* add background bannar form style */}
      <div className="wreeper">
        <div className="baseBannar">
          <div className="py-[20%] w-full lg:px-20 md:px-6">
            <div className="font-black md:text-3xl text-xl text-center uppercase text-white px-5">
              Find Your Perfect Rental House Today!
            </div>
            <div className="py-9">
              <FilteringPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bannar;