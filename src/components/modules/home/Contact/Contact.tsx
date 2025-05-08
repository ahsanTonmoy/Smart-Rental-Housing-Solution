"use client";

import animationData from "@/assets/lottie.json";
import dynamic from "next/dynamic";
import React, { useState } from "react";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Contact: React.FC = () => {
  const [result, setResult] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "b76ad003-7ff6-4c8b-8430-8f585a965ed1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setResult("Your message was submitted successfully!");
      event.currentTarget.reset();
    } else {
      setResult(data.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="w-full ">
      <div className="container mx-auto">
        <p className="text-sm uppercase tracking-widest text-[#0AA5CD] text-center">
          BASA FINDER
        </p>
        <h2 className="text-3xl lg:text-4xl text-center font-bold text-gray-800 uppercase">
          Contact Me
        </h2>

        <div className="mt-12 p-10 bg-gray-100 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-4 md:px-16">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white p-6 md:p-10 rounded-2xl shadow-2xl">
            <p className="text-xl font-semibold text-center text-gray-700 mb-6">
              Send Me a Message
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-semibold text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-sm font-semibold text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-center mt-10">
                <button
                  type="submit"
                  className="bg-[#0AA5CD] hover:bg-[#000] text-white px-6 py-3 rounded-xl font-semibold transition duration-300 cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
            <p
              className={`mt-4 text-center ${
                result.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {result}
            </p>
          </div>

          {/* Animation Section */}
          <div className="w-full lg:w-1/2 max-w-[500px]">
            <Lottie animationData={animationData} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
