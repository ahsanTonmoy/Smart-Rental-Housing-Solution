"use client";

import bedroom from "@/assets/images/image/bedroom-9.jpg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="grid md:grid-cols-2 items-center gap-10">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="w-full h-80 sm:h-96 md:h-[400px] relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={bedroom}
              alt="Rental House"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-800 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            <span className="text-[#0AA5CD]">Find</span> Your Perfect Rental
            Home Today!
          </h1>
          <p className="text-sm sm:text-base my-10 sm:my-8 max-w-xl mx-auto md:mx-0">
            BasaFinder connects tenants with the perfect homes and helps
            landlords reach the right people — securely, smartly, and easily.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-5">
            <Link href="/landlords/listings">
              <button className="bg-[#0AA5CD] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#000] transition duration-300">
                Post a Rental
              </button>
            </Link>
            <Link href="/listings">
              <button className="px-6 py-3 rounded-lg border-2 border-[#0AA5CD] text-[#0AA5CD] font-semibold hover:bg-[#0AA5CD] hover:text-white transition duration-300">
                Browse Listings
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
