import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, Bell } from "lucide-react";
import { navItems } from "@/utils/constants";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "@/store/userAtom";
import axios from "@/api/axios";
import { UserRole } from "@/utils/enums";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 font-spaceGrotesk z-30 w-full transition-all duration-300 ${
        scrolled ? "bg-black/40 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">
                <img
                  src="/assets/icons/hg_logo_1.png"
                  className="h-10"
                  alt="hg_logo.png"
                />
              </span>
            </div>

            <div className="hidden w-fit lg:block ml-20 z-30">
              <div className="flex items-center space-x-10">
                {navItems.map((navItem, index) => {
                  return (user.role === "student" || !user.isAuthenticated) &&
                    navItem.title === "LevelUp Requests" ? (
                    <></>
                  ) : (
                    <Link href={navItem.link} key={index}>
                      <Button
                        className={`uppercase relative text-white bg-[none] border-none shadow-none hover:bg-[none] text-sm after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:left-0 hover:after:w-full ${
                          scrolled ? "hover:text-gray-200" : ""
                        }`}
                      >
                        &#60; {navItem.title} &#47;&#62;
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-10 z-30">
            <Link href={`/profile/${user.username}`}>
              <Button
                className="bg-[none] border-none shadow-none text-white hover:text-gray-200"
                size="icon"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <div className="text-white">{user.role}</div>
            {!user.isAuthenticated && (
              <Link href="/auth/login">
                <button className="border-2 border-white font-spaceGrotesk px-4 py-1 text-white hover:bg-white hover:text-purple-500 transition-all">
                  Login
                </button>
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="bg-[none] border-none shadow-none text-white hover:text-gray-200"
                  size="icon"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52 bg-white/10 backdrop-blur-md"
              >
                {navItems.map((navItem, index) => {
                  return (user.role === "student" || !user.isAuthenticated) &&
                    navItem.title === "LevelUp Requests" ? (
                    <></>
                  ) : (
                    <Link href={navItem.link} key={index}>
                      <DropdownMenuItem className="text-white hover:bg-white/20">
                        {navItem.title}
                      </DropdownMenuItem>
                    </Link>
                  );
                })}
                <DropdownMenuItem className="text-white hover:bg-white/20">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
