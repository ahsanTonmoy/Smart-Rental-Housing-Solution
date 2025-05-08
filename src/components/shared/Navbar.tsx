"use client";
import React, { useEffect, useState } from "react";
import brand from "@/assets/images/brand/basaFinder-md.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useAppSelector } from "@/redux/hooks";
// import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { useUser } from "@/context/UserContext";
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
import {
  LogOut,
  User,
  LayoutDashboardIcon,
  // ShoppingCart,
  Menu,
} from "lucide-react";
import { logout } from "@/services/AuthService";
import { DialogTitle } from "@radix-ui/react-dialog";

import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  //
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  // const products = useAppSelector(orderedProductsSelector);
  const [isOpen, setIsOpen] = useState(false);

  // Add scroll event listener to apply shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //
  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (pathname.startsWith("/dashboard")) {
      router.push("/");
    }
  };

  // add menu list
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About-Us", href: "/about" },
    { name: "All-Rentals", href: "/listings" },
    { name: "Contact", href: "/contact" },

    // add more menu if work onther routes

    // ...(user ? [{ name: "Dashboard", href: `/${user.role}s/dashboard` }] : []),
    ...(user ? [{ name: "Dashboard", href: `/${user.role}s/dashboard` }] : []),
  ];

  return (
    <div>
      {/* navbar content */}
      <header
        className={
          scrolled
            ? " bg-white fixed top-0 z-50 left-0 w-full shadow-2xs"
            : `${
                pathname === "/"
                  ? "bg-transparent fixed text-white font-bold top-0 left-0 w-full shadow-2xs"
                  : " bg-white text-black shadow-2xs font-bold"
              }`
        }
      >
        <div className="container flex items-center justify-between mx-auto  px-4">
          {/* Logo - Responsive sizing */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image src={brand} alt="BasaFinder Logo" />
              {/* <span className="text-lg sm:text-xl md:text-2xl font-bold">
              BasaFinder
            </span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="">
            <nav className="hidden lg:flex items-center space-x-3 lg:space-x-6">
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
          </div>

          {/*  */}
          <div className="flex  gap-4 md:gap-8">
            {/* User Authentication - Desktop */}
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
                      className="hover:bg-[#0aa5cd] hover:text-white transition decoration-300"
                      asChild
                    >
                      <Link
                        href="/profile"
                        className="flex w-full cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-[#0aa5cd] hover:text-white transition decoration-300"
                      asChild
                    >
                      <Link
                        href={`/${user.role}s/dashboard`}
                        className="flex w-full cursor-pointer"
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
                  <button className="text-[#0AA5CD] cursor-pointer">
                    <FaRegCircleUser className=" text-2xl " />
                  </button>
                </Link>
              )}
            </div>
            {/* Mobile Navigation Controls */}
            <div className="flex items-center space-x-3 lg:hidden">
              {/* Mobile Menu Hamburger */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80%] sm:w-[300px]">
                  {/* Accessibility - Visually Hidden Title */}
                  <div className="sr-only">
                    <DialogTitle>Mobile Navigation Menu</DialogTitle>
                  </div>

                  {/* Mobile Menu Header with Close Button */}
                  <div className="flex items-center justify-between mb-6 pt-2 ">
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image src={brand} alt="BasaFinder Logo" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setIsOpen(false)}
                    >
                      {/* <X className="w-5 h-5" /> */}
                    </Button>
                  </div>

                  {/* Mobile Menu Links */}
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
