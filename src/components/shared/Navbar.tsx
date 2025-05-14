"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import brand from "@/assets/images/brand/basa-finder-logo-3.png";

import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut, User, LayoutDashboardIcon, Menu } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { user, refetchUser } = useUser(); // ✅ Properly accessed

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout handler
  const handleLogOut = async () => {
    logout(); // clear auth token
    await refetchUser(); // ✅ update context
    router.refresh();
    if (pathname.startsWith("/dashboard")) {
      router.push("/");
    }
  };

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About-Us", href: "/about" },
    { name: "All-Rentals", href: "/listings" },
    { name: "Contact", href: "/contact" },
    ...(user ? [{ name: "Dashboard", href: `/${user.role}s/dashboard` }] : []),
  ];

  return (
    <div>
      <header
        className={`w-full p-4  font-bold uppercase ${
          scrolled
            ? "bg-white shadow-2xs fixed top-0 z-50 left-0 transition duration-700 ease-in"
            : "bg-white transition duration-700 ease-in"
        }`}
      >
        <div className="container flex items-center justify-between mx-auto px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src={brand} width={200} alt="BasaFinder Logo" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm lg:text-base ${
                  pathname === link.href
                    ? "text-[#0AA5CD]"
                    : "hover:text-[#0AA5CD]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section (user + menu) */}
          <div className="flex gap-4 md:gap-8">
            {/* Auth Area */}
            <div className="px-6">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="rounded-full p-0 h-9 w-9"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://i.postimg.cc/QC0n0Jw6/user.jpg" />
                        <AvatarFallback>
                          {user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="hover:bg-[#0aa5cd] hover:text-white"
                      asChild
                    >
                      <Link href="/profile" className="flex w-full">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-[#0aa5cd] hover:text-white"
                      asChild
                    >
                      <Link
                        href={`/${user.role}s/dashboard`}
                        className="flex w-full"
                      >
                        <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="text-red-600 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <button className="text-[#0AA5CD]">
                    <FaRegCircleUser className="text-2xl" />
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80%] sm:w-[300px]">
                  <div className="sr-only">
                    <DialogTitle>Mobile Navigation Menu</DialogTitle>
                  </div>
                  <div className="flex items-center justify-between mb-6 pt-2">
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image src={brand} alt="BasaFinder Logo" />
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`text-sm lg:text-base ${
                          pathname === link.href ? "text-[#0AA5CD]" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
