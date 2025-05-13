"use client";

import React from "react";
import FilteringPage from "./filtering/Filtering";

const Bannar = () => {
  return (
    <div>
      {/* add background bannar form style */}
      <div className="wreeper">
        <div className="baseBannar">
          <div className="py-32 w-full lg:px-10 md:px-6">
            <div className="text-[#FFFFFFB3] text-lg">
              Discover Your Perfect Real Estate
            </div>
            <div className="font-medium md:text-7xl text-xl text-left uppercase  text-white py-8 leading-20">
              Looking for a <br></br> Rent House
            </div>
            <div className="">
              <FilteringPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bannar;
