import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, Bell } from "lucide-react";
import Image from "next/image";

interface navItem {
  title: string;
}

const navItems: navItem[] = [
  {
    title: "Dashboard",
  },
  {
    title: "Products",
  },
  {
    title: "Events"
  },
  {
    title: "Team",
  },
  {
    title: "About Us",
  }
];

const Navbar = () => {
  return (
    <nav className="bg-transparent font-spaceGrotesk z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">
                <Image
                  src="/assets/icons/hg_logo_1.png"
                  className="h-10"
                  alt="hg_logo.png"
                  width={100}
                  height={100}
                />
              </span>
            </div>

            <div className="hidden w-fit md:block ml-10 z-30">
              <div className="flex items-center space-x-4">
                {navItems.map((navItem: navItem, index) => (
                  <Button
                    key={index}
                    className="uppercase relative text-white bg-[none] border-none shadow-none hover:bg-[none] text-sm after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:left-0 hover:after:w-full"
                  >
                    &#60;{navItem.title}&#47;&#62;
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 z-30">
            <Button className="bg-[none] border-none shadow-none" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button className="bg-[none] border-none shadow-none" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="bg-[none] border-none shadow-none"
                  size="icon"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem>Home</DropdownMenuItem>
                <DropdownMenuItem>Events</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>About Us</DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
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
