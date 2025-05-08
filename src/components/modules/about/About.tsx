"use client";

import rebekaImg from "@/assets/images/image/avater.jpg";
import mizanImg from "@/assets/images/image/mizan.jpg";
import tonmoyImg from "@/assets/images/image/tonmoy.jpg";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Mail, Phone, Target, Twitter } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Md.Mizanur Rahman",
    role: "Founder & CEO",
    image: mizanImg,
    bio: "Real estate visionary with 10+ years of experience in property management and tech innovation.",
  },
  {
    name: "Mst. Rebeka Sultana",
    role: "Chief Exicutive Officer",
    image: rebekaImg,
    bio: "Tech expert specializing in creating user-friendly real estate platforms and innovative solutions.",
  },
  {
    name: "Tanzil Islam",
    role: "Head of Customer Success",
    image: tonmoyImg,
    bio: "Passionate about connecting people with their ideal living spaces and exceptional customer experiences.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full p-y ">
      {/* Mission Section */}
      <section className="bg-white shadow px-4 md:px-20">
        <div className="container mx-auto px-4 py-16 text-center flex justify-center items-center flex-col ">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Target className="text-[#0AA5CD] w-12 h-12 md:w-16 md:h-16" />
          </motion.div>

          <motion.h1
            className="text-2xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Our Mission at BasaFinder
          </motion.h1>
          <motion.p
            className="text-base md:text-md text-gray-600 leading-relaxed w-3/4 flex "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            BasaFinder is revolutionizing the rental experience in Bangladesh by
            bridging the gap between landlords and tenants. We simplify property
            discovery, streamline rental processes, and foster trustworthy
            connections.
          </motion.p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 px-4 md:px-20">
        <div className="container mx-auto px-4">
          <motion.p
            className="text-base md:text-lsm text-[#0AA5CD]  text-center leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            BasaFinder
          </motion.p>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Meet Our Team
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="rounded-xl bg-white shadow-md p-6 text-center hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-[#011b21] font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className=" text-white py-16 px-4 md:px-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-12">
            Contact Us
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl text-center text-black shadow">
              <Mail className="w-10 h-10 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold text-lg mb-1">Email</h3>
              <p>help@basafinder.com</p>
              <p>support@basafinder.com</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center text-black shadow">
              <Phone className="w-10 h-10 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold text-lg mb-1">Phone</h3>
              <p>+880 1914-163150</p>
              <p>+880 1829-662328</p>
              <p>+880 1994-361085</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center text-black shadow">
              <div className="flex justify-center space-x-4 mb-4 text-blue-600">
                <Facebook className="w-6 h-6 hover:text-[#0AA5CD]" />
                <Linkedin className="w-6 h-6 hover:text-[#0AA5CD]" />
                <Twitter className="w-6 h-6 hover:text-[#0AA5CD]" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Follow Us</h3>
              <p>basainder@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
